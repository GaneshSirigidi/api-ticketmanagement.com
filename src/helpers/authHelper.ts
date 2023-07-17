
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'

export const getUserAuthTokens = function (userData: any) {
  let user = {
    'id': userData._id,
    'email': userData.email,
    'user_type': userData.user_type,
  }

  let tokenSecret
  let refreshTokenSecret

    tokenSecret = process.env.JWT_SECRET + userData.password
    refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET + userData.password

  const token = jwt.sign(user, tokenSecret, {
    expiresIn:604800
  })
  const refreshToken = jwt.sign(user, refreshTokenSecret, {
    expiresIn:604800
  })

  return {
    token,
    refreshToken
  }
}
