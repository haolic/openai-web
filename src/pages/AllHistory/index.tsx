import useService from './useService';
import List from './components/List';
import Content from './components/Content';
import styles from './index.module.less';
import { Input } from 'antd';

const AllHistory = () => {
  const { pass, onChange } = useService();

  return pass ? (
    <div className={styles.wrap}>
      <List />
      <Content />
    </div>
  ) : (
    <div className={styles.inputQrcode}>
      输入faruxue.top的验证码：
      <Input onChange={onChange} placeholder="请输入" />
      去获取/history-qr-code
    </div>
  );
};

export default AllHistory;
