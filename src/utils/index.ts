// 文字按特定长度分割, 返回一个数组, 换行符也算一个字符
export const chunkText = (text: string, length: number) => {
  if (!text) return [];
  if (!length) return [text];

  const result = [];
  let i = 0;
  while (i < text.length) {
    result.push(text.slice(i, i + length));
    i += length;
  }
  return result;
};

// 随机生成颜色, 返回一个16进制颜色值
export const getRandomColor = () => {
  const color = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${color.padStart(6, '0')}`;
};
