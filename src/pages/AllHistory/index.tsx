import useService from './useService';
import List from './components/List';
import Content from './components/Content';
import styles from './index.module.less';

const AllHistory = () => {
  useService();

  return (
    <div className={styles.wrap}>
      <List />
      <Content />
    </div>
  );
};

export default AllHistory;
