<template>
  <div class="lease-container">
    <div id="leaseMap" class="lease-map"></div>
    <div class="lease-control">
      <button class="lease-control-item lease-button">租車</button>
      <button class="lease-control-item return-button">還車</button>
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
.lease-button {
  background-color: $primary;
  color: $secondary;
  border-radius: 10px 0 0 10px;
  &:hover {
    outline: $secondary solid 5px;
  }
  &:focus {
    outline: $secondary solid 5px;
  }
}
.return-button {
  background-color: $secondary;
  color: $light;
  border-radius: 0px 10px 10px 0px;
  &:hover {
    outline: $primary solid 5px;
  }
  &:focus {
    outline: $primary solid 5px;
  }
}
</style>

<script>
import L from 'leaflet';

export default {
  data() {
    return {
      mapObject: {},
      mapLayer: {},
    };
  },
  mounted() {
    this.mapObject = L.map('leaseMap', {
      center: [22.6561314, 120.2984205],
      zoom: 14,
    });
    this.mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.mapObject);
  },
};
</script>
