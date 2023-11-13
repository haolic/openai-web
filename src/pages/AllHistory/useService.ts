import { getHistoryList } from '@/store';
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
  useEffect(() => {
    getHistoryList();
  }, []);
};

export default useService;
