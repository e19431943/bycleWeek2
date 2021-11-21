module.exports = {
  publicPath: '/bycleWeek2/dist',
  css: {
    loaderOptions: {
      sass: {
        prependData: "@import '@/assets/scss/globel_public_style.scss';"
      },
      sass: {
        prependData: "@import '@/assets/scss/globel_variable.scss';"
      },
    }
  }
}

