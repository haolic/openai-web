import { theme } from 'antd';

export default (themeKey: string) => {
  return {
    algorithm: themeKey === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: {
      colorPrimary: '#982369',
      paddingLG: 8,
    },
  };
};
