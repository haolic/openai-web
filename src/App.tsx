import { ConfigProvider } from 'antd';
import { useSnapshot } from 'valtio';
import theme from './theme';
import store from '@/store';
import Version from '@/components/Version';
import Router from '@/router';
import zh from 'antd/lib/locale/zh_CN';

// 这个文件应该导出路由文件<Router />但是现在就一个页面，不需要路由了先

const App = () => {
  const { theme: themeKey } = useSnapshot(store);

  return (
    <ConfigProvider theme={theme(themeKey)} locale={zh}>
      <Router />
      <Version />
    </ConfigProvider>
  );
};

export default App;
