import { enc, DES, mode, pad } from 'crypto-js'

import { SECRET_KEY } from '@/constants'

export function DESEncode(text: string, key = SECRET_KEY): string {
  const KeyHex = enc.Utf8.parse(key)
  const encrypted = DES.encrypt(text, KeyHex, {
    mode: mode.ECB,
    padding: pad.Pkcs7
  })

  return encrypted.toString()
}

export function DESDecode(text: string, key = SECRET_KEY): string {
  const KeyHex = enc.Utf8.parse(key)
  const decrypted = DES.decrypt(text, KeyHex, {
    mode: mode.ECB,
    padding: pad.Pkcs7
  })

  return decrypted.toString(enc.Utf8)
}
