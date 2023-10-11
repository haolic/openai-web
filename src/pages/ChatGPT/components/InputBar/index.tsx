import { Input, Button, Modal } from 'antd';
import useInputBar, { IProps } from './useInputBar';
import classnames from 'classnames';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import useThemeToken from '@/utils/useThemeToken';
import styles from './index.module.less';
import { useSnapshot } from 'valtio';
import store, { storeRef } from '@/store';
import { MESSAGE_UID } from '@/utils/constant';

const colorMap = new Map([
  ['light', '#fff'],
  ['dark', 'rgb(68, 70, 84)'],
]);

const InputBar = (props: IProps) => {
  const [modal, context] = Modal.useModal();
  const { value, setValue, onKeyDown, btnClick, inputRef } = useInputBar(props);

  const themeToken = useThemeToken();
  const { theme, sendBtnLoading } = useSnapshot(store);

  const newChat = () => {
    if(!store.messageList?.length) return;
    // 用浏览器原生提示用户如果切换对话，当前对话的内容将会丢失
    modal.confirm({
      title: '开始新对话？',
      content: '开始新对话将会丢失当前对话内容，是否继续？',
      onOk: () => {
        storeRef?.abortController?.abort();
        store.sendBtnLoading = false;
        localStorage.removeItem(MESSAGE_UID);
        store.messageList = [];
        store.lastMessage = null;
      },
      // 对话框位置在屏幕中间
      centered: true,
      cancelText: '取消',
      okText: '确定',
      getContainer: () => document.getElementById('root') as HTMLElement,
    });
  };

  return (
    <div
      className={classnames(styles['send-bar'])}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${colorMap.get(
          theme,
        )} 70%)`,
      }}
    >
      <div className={styles.newchat} onClick={newChat}>
        <PlusOutlined />
        新对话
      </div>
      <div className={styles['input-wrap']}>
        <div className={styles.bg} />
        <div className={styles.content}>
          <Input.TextArea
            bordered={false}
            placeholder="你好，有什么可以帮您？"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            size="large"
            className={styles.input}
            autoSize={{ minRows: 1, maxRows: 6 }}
          />
          <Button
            type="link"
            size="large"
            onClick={btnClick}
            loading={sendBtnLoading}
            icon={<SendOutlined style={{ color: themeToken.colorPrimary }} />}
          ></Button>
        </div>
      </div>
      {context}
    </div>
  );
};

export default InputBar;
