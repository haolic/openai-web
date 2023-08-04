import { theme } from 'antd';

const useThemeToken = () => {
  const token = theme.useToken();
  return token.token;
};

export default useThemeToken;
