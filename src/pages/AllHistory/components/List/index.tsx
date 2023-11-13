import store, { deleteHistory } from '@/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu, Popconfirm } from 'antd';
import { useSnapshot } from 'valtio';
import styles from './index.module.less';
import { DeleteFilled } from '@ant-design/icons';

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
  }, [id]);

  const onDelete = (uid: string) => {
    deleteHistory(uid);
    if (id === uid) {
      navigate('/history');
    }
  };

  return (
    <Menu
      className={styles.menuWrap}
      // mode="horizontal"
      defaultSelectedKeys={[id || '']}
      items={historyList.map((el) => {
        return {
          key: el.id,
          label: (
            <div className={styles.label}>
              <span className={styles.labelText}>{el.name}</span>
              <Popconfirm
                autoAdjustOverflow={false}
                placement="bottomRight"
                title="确认删除"
                onConfirm={() => onDelete(el.id)}
                getPopupContainer={(r) => r.parentElement?.parentElement as HTMLElement}
              >
                <div className={styles.deleteIcon}>
                  <DeleteFilled />
                </div>
              </Popconfirm>
            </div>
          ),
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
