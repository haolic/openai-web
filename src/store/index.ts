import { THEME_ENUM } from '@/utils/constant';
import { proxy, ref, subscribe } from 'valtio';
import { HistoryItem, IHistoryList } from '@/pages/AllHistory/useService';
import { IMessageItem } from '@/components/MessageContent';

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

export default store;
