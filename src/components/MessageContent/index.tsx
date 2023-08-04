import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import { ROLEMAP } from '@/utils/constant';
import MessageItem from '@/components/MessageItem';
import store from '@/store';
import styles from './index.module.less';
import LastMessage from './LastMessage';

export interface IMessageItem {
  role: ROLEMAP;
  content?: string;
  key?: string;
  color: string;
}

interface IProps {
  className?: string;
  messageList?: IMessageItem[];
}

const MessageContent = React.memo((props: IProps) => {
  const { className, messageList } = props;

  const snap = useSnapshot(store);

  const cls = styles['msg-list-wrap'];

  return (
    <div className={classnames(cls, className)}>
      {(messageList || snap.messageList).map((el) => {
        return <MessageItem messageInfo={el} key={el.key} />;
      })}

      <LastMessage />
    </div>
  );
});

export default MessageContent;
