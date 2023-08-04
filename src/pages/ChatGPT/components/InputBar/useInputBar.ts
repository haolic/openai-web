import store from '@/store';
import { InputRef } from 'antd';
import { useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

export interface IProps {
  sendStr: (val?: string) => void;
}

function useInputBar(props: IProps) {
  const { sendStr } = props;
  const [value, setValue] = useState<string>();
  const inputRef = useRef<InputRef>(null);
  const { sendBtnLoading } = useSnapshot(store);

  const send = async (value?: string) => {
    setValue(undefined);
    inputRef.current?.focus();
    await sendStr(value || '');
  };

  // 按回车shift换行，按回车发送消息
  const onKeyDown = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey && !sendBtnLoading) {
      e.preventDefault();
      send(value);
    }
  };

  const btnClick = () => {
    send(value);
  };

  return {
    value,
    setValue,
    onKeyDown,
    btnClick,
    inputRef,
  };
}

export default useInputBar;
