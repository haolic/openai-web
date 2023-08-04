import store from '@/store';
import { useSnapshot } from 'valtio';
import MessageItem from '../MessageItem';
import { useEffect } from 'react';

const LastMessage = () => {
  const { lastMessage, scrollRef } = useSnapshot(store);

  useEffect(() => {
    // 如果store.scrollRef.current当前没有在底部，就不滚动
    if (
      scrollRef.current?.scrollTop + scrollRef.current?.clientHeight <
      scrollRef.current?.scrollHeight - 50
    ) {
      return;
    }
    // scrollRef滚动到最底部
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
    });
  }, [lastMessage?.content]);

  return lastMessage ? (
    <MessageItem messageInfo={lastMessage} showTypeBlock />
  ) : (
    <div style={{ textAlign: 'center', color: '#ccc', fontSize: 12, marginTop: 10 }}>
      没有更多了
    </div>
  );
};

export default LastMessage;
