import { defineNuxtPlugin } from '#app'
import ApiCore from './core/ApiCore'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$apiCore = ApiCore
  return {
    provide: {
      ApiCore: ApiCore
    }
  }
})
