import store from '@/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu } from 'antd';
import { useSnapshot } from 'valtio';
import styles from './index.module.less';

const List = () => {
  const { historyList } = useSnapshot(store);
  const navigate = useNavigate();
  const { id } = useParams();
  const onClick = ({ key }: { key: string }) => {
    navigate(`/history/${key}`);
  };
  useEffect(() => {
    if (id) {
      const dom = document.getElementById(id);
      if (dom) {
        dom.scrollIntoView();
      }
    }
  }, []);

  return (
    <Menu
      className={styles.menuWrap}
      // mode="horizontal"
      defaultSelectedKeys={[id || '']}
      items={historyList.map((el) => {
        return {
          key: el.id,
          // icon: ,
          label: <span className={styles.label}>{el.name}</span>,
          title: el.name,
          width: 280,
          id: el.id,
        };
      })}
      onClick={onClick}
    />
  );
};

export default List;
