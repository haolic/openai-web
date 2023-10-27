import store from '@/store';
import request from '@/utils/request';
import { useEffect, useState } from 'react';
import { totp } from 'otp-io';
import { hmac } from 'otp-io/crypto';
import { yekretne } from '@/utils';

export type IHistoryList = HistoryItem[];

export interface HistoryItem {
  name: string;
  content: IContent[];
  id: string;
}

interface IContent {
  role: string;
  content: string;
}

const useService = () => {
  const [pass, setPass] = useState(false);

  const getList = async () => {
    try {
      const res: IHistoryList = await request('/api/history-list');

      const map = res.reduce((prev, next) => {
        prev[next.id] = next;
        return prev;
      }, {} as any);

      store.historyList = res;
      store.historyListMap = map;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!pass) return;
    getList();
  }, [pass]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (v) => {
    const code = await totp(hmac, {
      secret: yekretne,
    });

    if (code === v.target.value) {
      setPass(true);
    }
  };

  return { pass, onChange };
};

export default useService;
