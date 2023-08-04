import React from 'react';
import MessageContent, { IMessageItem } from '@/components/MessageContent';
import { useSnapshot } from 'valtio';
import store from '@/store';
import { useParams } from 'react-router-dom';
import { Result } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import useThemeToken from '@/utils/useThemeToken';

const Content = () => {
  const { historyListMap } = useSnapshot(store);
  const themeToken = useThemeToken();
  const { id } = useParams();

  return historyListMap[id as string]?.content ? (
    <div style={{ overflow: 'auto', flex: 1 }}>
      <MessageContent
        messageList={historyListMap[id as string]?.content as IMessageItem[]}
        className={styles.wrap}
      />
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
