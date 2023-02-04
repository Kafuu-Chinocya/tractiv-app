<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'

import useUser from '@/stores/user'

const routerMethods = [
  'navigateTo',
  'redirectTo',
  'reLaunch',
  'switchTab',
  'navigateBack'
]
const user = useUser()
const loginPage = '/pages/login-page/login-page'
const homePage = '/pages/main/main'
const whiteList = [
  '/pages/start-page/start-page',
  '/pages/login-page/login-page'
]

function interruptRouterMethod(args: { url: string }) {
  const { url } = args

  if (user.userInfo && url === loginPage) {
    uni.redirectTo({
      url: homePage
    })

    return false
  }

  return true
}

routerMethods.forEach((name) => {
  uni.addInterceptor(name, {
    invoke: interruptRouterMethod
  })
})

onLaunch(() => {
  plus.screen.lockOrientation('portrait-primary')

  if (user.userInfo) {
    uni.reLaunch({
      url: homePage
    })
  }
})
</script>
