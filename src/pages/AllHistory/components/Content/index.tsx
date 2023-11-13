import MessageContent, { IMessageItem } from '@/components/MessageContent';
import { useSnapshot } from 'valtio';
import store from '@/store';
import { useParams } from 'react-router-dom';
import { Result } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import useThemeToken from '@/utils/useThemeToken';
import { getRandomColor } from '@/utils';
import { v4 as uuid } from 'uuid';

const Content = () => {
  const { historyListMap } = useSnapshot(store);
  const themeToken = useThemeToken();
  const { id } = useParams();

  const list = historyListMap[id as string]?.content?.map((el) => {
    return {
      ...el,
      color: getRandomColor(),
      key: uuid(),
    };
  });

  return list?.length ? (
    <div style={{ overflow: 'auto', flex: 1 }}>
      <MessageContent messageList={list as IMessageItem[]} className={styles.wrap} />
    </div>
  ) : (
    <div className={styles.empty}>
      <Result
        icon={<CommentOutlined style={{ color: themeToken.colorText }} />}
        title="请选择一条历史记录进行浏览!"
      />
    </div>
  );
};

export default Content;
