import jwt from 'jsonwebtoken'
import { config } from '../../../config'

const { secret, secretExpire } = config.jwt

const signToken = (text: string) =>
  jwt.sign({ text }, secret, {
    expiresIn: secretExpire
  })

export default signToken
