<template>
  <div class="lease-container">
    <div id="leaseMap" class="lease-map"></div>
    <div class="lease-control">
      <button
        class="lease-control-item lease-button"
        data-value="lease" @click="chooseButton"
        :class = "defaultFlag? 'choosed-button' : ''"
      >租車</button>
      <button
        class="lease-control-item return-button"
        data-value="return"
        @click="chooseButton"
        :class = "!defaultFlag? 'choosed-button' : ''"
      >還車</button>
    </div>
  </div>
  <div class="my-popup"></div>
</template>

<style lang="scss" scoped>
.lease-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.lease-control {
  position: absolute;
  top: 36px;
  left: calc(50% - 76px);
  width: 134px;
  height: 42px;
  z-index: 2;
  &-item {
    height: 100%;
    width: 50%;
    border: none;
  }
}
.lease-map {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.lease-control-item {
  background-color: $secondary;
  color: $light;
  &:hover {
    outline: $primary solid 5px;
  }
}
.lease-button {
  border-radius: 10px 0 0 10px;
}
.return-button {
  border-radius: 0px 10px 10px 0px;
}
.choosed-button {
  background-color: $primary;
  color: $secondary;
  outline: $secondary solid 5px;
}

// .my-div-icon {
// }

// .icon-image {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   z-index: 1;
// }
// .icon-text {
//   position: absolute;
//   z-index: 2;
//   font-size: 16px ;
// }

</style>

<script>
import L from 'leaflet';
import { getLocationData } from '../assets/js/apiDataProcess';

const leaseUrl = require('@/assets/images/svg/blue_kuma_markar.svg');
const returnUrl = require('@/assets/images/svg/black_kuma_markar.svg');

export default {
  data() {
    return {
      mapObject: {},
      mapLayer: {},
      mapContainer: {},
      locationLog: '',
      locationLat: '',
      defaultFlag: true,
      markerGroup: {},
      leaseData: [],
      iconDetail: {},
      bikeState: {
        0: '停止營運',
        1: '正常營運',
        2: '暫停營運',
      },
      popup: {},
    };
  },
  watch: {
    leaseData() {
      this.iconDetail = {
        url: leaseUrl,
        type: 'lease',
      };
      /* data更新後觸發，可以寫作reset */
      console.log(123);
      this.markarProcess(this.iconDetail);
    },
  },
  methods: {
    createMap() {
      this.mapObject = L.map('leaseMap', {
        center: [22.6561314, 120.2984205],
        zoom: 14,
      });
      this.mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.mapObject);
      this.markerGroup = L.layerGroup();
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            this.locationLog = longitude;
            this.locationLat = latitude;
            // const longitude = position.coords.longitude; // 經度
            // const latitude = position.coords.latitude; // 緯度
            // console.log(this.locationLog);
            console.log('fwr', latitude);
            // 重新設定 view 的位置
            this.setMap(this.locationLog, this.locationLat);
            this.getLocationDate(this.locationLog, this.locationLat);
            // mymap.setView([latitude, longitude], 13);
            // 將經緯度當作參數傳給 getData 執行
            // getStationData(longitude, latitude);
          },
          (error) => {
            /* 錯誤訊息 */
            const { code, message } = error;
            // const msg = e.code;
            // const dd = e.message;
            console.error(code);
            console.error(message);
          },
        );
      }
    },
    setMap(log, lat) {
      console.log('dd', log, lat);
      this.mapObject.setView([lat, log], 16);
    },
    async getLocationDate(long, lat) {
      this.leaseData = await getLocationData(lat, long);
    },
    chooseButton(e) {
      const chooseValue = e.target.dataset.value;
      const tempObject = {};
      this.defaultFlag = !this.defaultFlag;
      tempObject.type = chooseValue;
      if (chooseValue === 'lease') {
        tempObject.url = leaseUrl;
      } else {
        tempObject.url = returnUrl;
      }
      this.iconDetail = tempObject;
      this.popup.innerHTML = '';
      this.popup.classList.remove('popup-show');
      this.markarProcess();
    },
    markarProcess() {
      this.markerGroup.clearLayers();
      this.leaseData.forEach((item) => {
        this.markerGroup.addLayer(
          L.marker(
            [item.StationPosition.PositionLat, item.StationPosition.PositionLon],
            { icon: this.createIcon(this.iconDetail, item) },
          ),
        ).addTo(this.mapObject);
      });
      this.addMarkarEvent();
    },
    addMarkarEvent() {
      const markar = document.querySelectorAll('.icon-container');
      markar.forEach((item) => {
        item.addEventListener('click', this.popupPrecess);
      });
    },
    createIcon(icon, item) {
      // console.log(icon);
      let iconText;
      let textColor;
      if (icon.type === 'lease') {
        iconText = item.state.AvailableRentBikes;
        textColor = 'lease-text';
      } else {
        iconText = item.state.AvailableReturnBikes;
        textColor = 'return-text';
      }
      const res = L.divIcon(
        {
          className: 'my-div-icon',
          html: `
            <div class="icon-container" data-id="${item.StationUID}" data-lat="${item.StationPosition.PositionLat}" data-long="${item.StationPosition.PositionLon}">
              <img class="icon-image" src="${icon.url}"></img>
              <span class="icon-text ${textColor}">${iconText}</span>
            </div>
          `,
        },
      );
      return res;
    },
    popupPrecess(e) {
      // this.resetPopup();
      console.log('popupEvent', e.currentTarget);
      const markarId = e.currentTarget.dataset.id;
      // const popup = e.currentTarget.lastElementChild;
      this.popup = document.querySelector('.my-popup');
      for (let i = 0; i < this.leaseData.length; i += 1) {
        // console.log('this', this.leaseData[i].StationUID, 'check:', markarId);
        if (this.leaseData[i].StationUID === markarId) {
          console.log('success');
          this.popup.innerHTML = this.getDetailCard(this.leaseData[i]);
          this.popup.classList.add('popup-show');
          this.clearPopupEvent();
          break;
        }
      }
    },
    clearPopupEvent() {
      this.mapContainer = document.querySelector('#leaseMap');
      this.mapContainer.addEventListener('click', this.clearPopupProcess);
    },
    clearPopupProcess(e) {
      if (e.target === this.mapContainer) {
        this.popup.innerHTML = '';
        this.popup.classList.remove('popup-show');
        this.mapContainer.removeEventListener('click', this.clearPopupProcess);
      }
    },
    getDetailCard(data) {
      let leaseColor;
      let returnColor;
      if (this.iconDetail.type === 'lease') {
        leaseColor = 'popup-choose-color';
        returnColor = 'popup-default-color';
      } else {
        leaseColor = 'popup-default-color';
        returnColor = 'popup-choose-color';
      }
      const stateText = this.bikeState[data.state.ServiceStatus];
      let str = '';
      str += `
        <div class="popup-state mb-12">
          <span></span>
          <p>${stateText}</p>
        </div>
        <div class="popup-title mb-12">
          <h3>${data.StationName.Zh_tw}</h3>  
          <p>${data.StationName.En}</p>
        </div>
        <div class="popup-address mb-16">
          <p class="address-chinese">${data.StationAddress.Zh_tw}</p>
          <p class="address-english">${data.StationAddress.En}</p>
        </div>
        <p class="popup-update-time mb-19">${data.SrcUpdateTime}</p>
        <div class="popup-content">
          <div class="popup-content-item ${leaseColor}">
            <p class="popup-content-title">可借車輛</p>
            <p class="popup-content-value">${data.state.AvailableRentBikes}</p>
          </div>
          <div class="popup-content-item ${returnColor}">
            <p class="popup-content-title">可停車位</p>
            <p class="popup-content-value">${data.state.AvailableReturnBikes}</p>
          </div>
        </div>
      `;
      return str;
    },
  },
  mounted() {
    this.createMap();
    this.getLocation();
  },
};
</script>
