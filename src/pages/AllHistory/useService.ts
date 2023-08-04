import store from '@/store';
import request from '@/utils/request';
import { useEffect } from 'react';

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
    getList();
  }, []);
};

export default useService;
