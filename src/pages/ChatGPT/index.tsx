import useService from './useService';
import MessageContent from '@/components/MessageContent';
import styles from './index.module.less';
import InputBar from './components/InputBar';
import store from '@/store';

const ChatGPT = () => {
  const { sendStr } = useService();

  return (
    <div className={styles.wrap} ref={(r) => (store.scrollRef.current = r)}>
      <MessageContent />
      <InputBar sendStr={sendStr} />
    </div>
  );
};

ChatGPT.title = 'GhatGPT';

export default ChatGPT;
