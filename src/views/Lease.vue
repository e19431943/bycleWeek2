<template>
  <div class="lease-container">
    <div id="leaseMap" class="lease-map"></div>
    <div class="lease-control">
      <button
        class="lease-control-item lease-button"
        data-value="lease" @click="chooseButton"
        :class = "defaultFlag? 'default-focus' : ''"
      >租車</button>
      <button
        class="lease-control-item return-button"
        data-value="return"
        @click="chooseButton"
      >還車</button>
    </div>
  </div>
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
  &:focus {
    background-color: $primary;
    color: $secondary;
    outline: $secondary solid 5px;
  }
}
.lease-button {
  border-radius: 10px 0 0 10px;
}
.return-button {
  border-radius: 0px 10px 10px 0px;
}
.default-focus {
  background-color: $primary;
  color: $secondary;
  outline: $secondary solid 5px;
}
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
      locationLog: '',
      locationLat: '',
      defaultFlag: true,
      markerGroup: {},
      leaseData: [],
      leaseMarkar: {
        iconUrl: leaseUrl,
        iconSize: [58, 56],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      },
      returnMarkar: {
        iconUrl: returnUrl,
        iconSize: [58, 56],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      },
    };
  },
  watch: {
    leaseData(data) {
      /* data更新後觸發，可以寫作reset */
      console.log(123);
      data.forEach((item) => {
        this.markerGroup.addLayer(
          L.marker(
            [item.StationPosition.PositionLat, item.StationPosition.PositionLon],
            { icon: L.icon(this.leaseMarkar) },
          ),
        ).addTo(this.mapObject);
      });
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
      this.defaultFlag = false;
      const chooseValue = e.target.dataset.value;
      if (chooseValue === 'lease') {
        this.markarProcess(this.leaseMarkar);
      } else {
        this.markarProcess(this.returnMarkar);
      }
    },
    markarProcess(icon) {
      this.leaseData.forEach((item) => {
        this.markerGroup.addLayer(
          L.marker(
            [item.StationPosition.PositionLat, item.StationPosition.PositionLon],
            { icon: L.icon(icon) },
          ).bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup(),
        ).addTo(this.mapObject);
      });
    },
  },
  mounted() {
    this.createMap();
    this.getLocation();
  },
};
</script>
