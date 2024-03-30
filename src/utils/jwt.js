/* eslint-disable import/no-extraneous-dependencies */
import { sign } from 'jsonwebtoken';

function generateAccessToken(user) {
  return sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });
}

function generateRefreshToken(user, jti) {
  return sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '8h',
    },
  );
}

function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export default {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
