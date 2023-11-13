import { THEME_ENUM } from '@/utils/constant';
import { proxy, ref, subscribe } from 'valtio';
import { HistoryItem, IHistoryList } from '@/pages/AllHistory/useService';
import { IMessageItem } from '@/components/MessageContent';
import request from '@/utils/request';
import { message } from 'antd';

interface IStore {
  theme: THEME_ENUM;
  historyList: IHistoryList;
  historyListMap: {
    [key: string]: HistoryItem;
  };
  messageList: IMessageItem[];
  scrollRef: any;
  lastMessage: null | IMessageItem;
  sendBtnLoading: boolean;
}

let defaultTheme = THEME_ENUM.LIGHT;

const prefersColor = window?.matchMedia?.('(prefers-color-scheme: dark)');

if (prefersColor) {
  if (prefersColor.matches) {
    defaultTheme = THEME_ENUM.DARK;
  }
}

export const storeRef: any = {};

const store = proxy<IStore>({
  theme: defaultTheme,
  historyList: [],
  historyListMap: {},

  messageList: [],
  scrollRef: ref({}),

  lastMessage: null,

  sendBtnLoading: false,
});

subscribe(store.messageList, () => {
  store.scrollRef.current.scrollTop = 9999999999;
});

prefersColor.addEventListener('change', (event) => {
  store.theme = event.matches ? THEME_ENUM.DARK : THEME_ENUM.LIGHT;
});

export const changeTheme = () => {
  const theme = store.theme === THEME_ENUM.DARK ? THEME_ENUM.LIGHT : THEME_ENUM.DARK;
  store.theme = theme;
};

export const getHistoryList = async () => {
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

export const deleteHistory = async (uid: string) => {
  try {
    const res: any = await request.post('/api/delete-history', {
      uid,
    });
    if (!res.error) {
      message.success('删除成功');
      await getHistoryList();
    }
  } catch (error) {
    console.error(error);
  }
};

export default store;
