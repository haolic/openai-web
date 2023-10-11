
// 随机生成颜色, 返回一个16进制颜色值
export const getRandomColor = () => {
  const color = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${color.padStart(6, '0')}`;
};
