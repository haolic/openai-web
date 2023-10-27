import { generateKey } from 'otp-io';

// 随机生成颜色, 返回一个16进制颜色值
export const getRandomColor = () => {
  const color = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${color.padStart(6, '0')}`;
};

export const yekretne = generateKey(() => {
  const bytes = new Uint8Array(60);
  for (let i = 0; i < 60; i++) {
    bytes[i] = Math.floor((i + 2) * 256);
  }
  return bytes;
}, 60);
