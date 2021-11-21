<template>
  <div class="default-container">
    <div id="defaultMap"></div>
    <div class="enter-area">
      <div class="enter-image mt-180">
        <img alt="Enter Picture" src="../assets/images/svg/enter.svg">
          <p>LET’SGO CYCLING!</p>
      </div>
      <div class="enter-post mt-75">
        <p class="mb-36">身邊很多朋友都在有在騎自行車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，
          常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，
          常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，
          常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車！</p>
        <p class="mb-36">身邊很多朋友都在有在騎自行車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，
          常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，
          常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車，
          常常看到他們一起出去騎車，常常看到他們一起出去騎車，常常看到他們一起出去騎車！</p>
        <p class="mb-36">今天的你不管是要騎車去旅遊、上班、買菜甚至就單純想騎車，都希望你旅途平安，整天都開心：）</p>
        <p class="mb-36">遇到任何問題都可以到    找我們，歡迎有任何建議也都可以告訴我們！</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/globel_variable.scss';
@import '@/assets/scss/globel_public_style.scss';
  .default-container {
    width: 100%;
    height: 100vh;
    background-color: #bbb;
  }
  .enter-area {
    box-sizing: border-box;
    height: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 75px;
  }
  .enter-image {
    width: min-content;
    height: min-content;
    position: relative;
    p {
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: justify;
      width: 121px;
      color: $light;
      font-size: 24px;
      line-height: 35px;
      letter-spacing: 1px;
    }
    &:hover > p {
      color: $yellow;
    }
  }
  .enter-post {
    display: none;
    width: 670px;
    background-color: $light;
    padding: 100px 50px 50px;
    p {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 5px;
    }
  }
</style>

<script>
// @ is an alias to /src

export default {
};
</script>
