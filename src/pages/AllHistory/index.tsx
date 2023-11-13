import useService from './useService';
import List from './components/List';
import Content from './components/Content';
import styles from './index.module.less';
import { useEffect, useState } from 'react';

const AllHistory = () => {
  useService();
  const [pass, setPass] = useState(false);

  useEffect(() => {
    let idx = 0;
    // ascii码
    const code = [76, 105, 117, 120, 105, 110, 103, 77, 105, 109, 97, 49, 53, 57];

    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        return;
      }
      if (idx === code.length - 1) {
        setPass(true);
      }

      if (e.key.charCodeAt(0) === code[idx]) {
        idx += 1;
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, []);

  return pass ? (
    <div className={styles.wrap}>
      <List />
      <Content />
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: 32,
      }}
    >
      <div>请输入验证码L</div>
    </div>
  );
};

export default AllHistory;
