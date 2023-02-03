<template>
  <uni-forms
    ref="formInstance"
    class="log-in"
    v-model="formData"
    :rules="rules"
  >
    <uni-forms-item name="username">
      <uni-easyinput
        class="log-in__input"
        v-model="formData.username"
        placeholder="EMAIL OR PHONE NUMBER"
      />
    </uni-forms-item>

    <uni-forms-item name="password">
      <uni-easyinput
        class="log-in__input"
        v-model="formData.password"
        type="password"
        placeholder="PASSWORD"
      />
    </uni-forms-item>

    <CapsuleButton class="log-in__button" @click="submit">LOG IN</CapsuleButton>

    <uni-popup ref="popup" type="message">
      <uni-popup-message class="log-in__message" v-bind="popupProps" />
    </uni-popup>
  </uni-forms>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

import useUser from '@/stores/user'

import CapsuleButton from '@/components/capsule-button'

const user = useUser()
const formInstance = ref<null | anyObj>(null)
const popup = ref<null | anyObj>(null)
const username = 'test@test.com'
const password = '123456'
const formData = reactive({
  username: username,
  password: password
})
const popupProps = reactive({
  message: 'success',
  type: 'success',
  duration: 2000
})

const rules = {
  username: [
    {
      required: true,
      errorMessage: 'Please type email or phone number'
    }
  ],
  password: [
    {
      required: true,
      errorMessage: 'Please type password'
    }
  ]
}

async function openDialog(state: boolean, message?: string) {
  if (!popup.value) return

  const type = state ? 'success' : 'error'
  Object.assign(popupProps, {
    message: message ?? type,
    type: type
  })
  popup.value.open()
}

async function submit() {
  if (!formInstance.value) return

  try {
    const result = await formInstance.value!.validate()

    if (!result) {
      return openDialog(false)
    }

    if (!(username === formData.username && password === formData.password)) {
      return openDialog(
        false,
        'Login failure, Please check that your account name or password matches'
      )
    }

    user.setUserInfo({
      token: 'testToken',
      id: 'testId',
      username: 'test account'
    })
    openDialog(true, 'Login successfully')

    const isFirstUse = { user }
    // user.setIsFirstUse(false)
    uni.redirectTo({
      url: isFirstUse ? '/pages/app-tutorial-page/app-tutorial-page' : ''
    })
  } catch (err) {
    openDialog(false)
  }
}
</script>

<style lang="scss" scoped>
.log-in {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: to-rpx(25);
  padding: 0 to-rpx(30);

  &__input {
    border-radius: 100px;
    background-color: var(--color-snow);
  }

  &__button {
    width: 100%;
  }

  &__message {
    padding-top: var(--status-bar-height);
  }
}
</style>
