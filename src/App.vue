<template>
  <div class="wrep">
    <div class="nav">
      <h1 class="logo nav-item">
        <div>
          <img src="@/assets/images/svg/logo.svg" alt="logo">
        </div>
      </h1>
      <router-link to="/" class="nav-item">
        <div>
          <img src="@/assets/images/svg/search.svg" alt="單車租借 ICON">
        </div>
      </router-link>
      <router-link to="/" class="nav-item">
        <div>
          <img src="@/assets/images/svg/position.svg" alt="關鍵字搜尋 ICON">
        </div>
      </router-link>
      <router-link to="/" class="nav-item">
        <div>
          <img src="@/assets/images/svg/bycle.svg" alt="自行車路線搜尋 ICON">
        </div>
      </router-link>
      <router-link to="/" class="nav-item nav-last">
        <div>
          <img src="@/assets/images/svg/info.svg" alt="幫助中心 ICON">
        </div>
      </router-link>
    </div>
    <router-view class="main"/>
  </div>
</template>

<style lang="scss">
@import 'reset-css';
@import '@/assets/scss/globel_variable.scss';

.wrep {
  width: 1440px;
  height: 100vh;
  margin: 0 auto;
  background-color: $grey;
  display: flex;
}
.nav {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: $light;
  box-shadow:
    1px 1px 10px 1px $light,
    1px -1px 10px -1px #000
  ;
}
.nav-item {
  position: relative;
  overflow: hidden;
  width: 76px;
  height: 76px;
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0px;
  }
  img {
    display: inline-block;
  }
  &:hover {
    background-color: $secondary;
    div {
       left: -76px;
      filter: drop-shadow($primary 76px 0);
    }
  }
}
.nav-last {
  position: absolute;
  bottom: 0;
}

</style>
