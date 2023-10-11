import { useEffect } from 'react';
import { message } from 'antd';
import { takeRight } from 'lodash';
import request from '@/utils/request';
import requestEventStream from '@/utils/requestEventStream';
import { v4 as uuid } from 'uuid';
import { ROLEMAP, MESSAGE_UID } from '@/utils/constant';
import { proxy } from 'valtio';
import store, { storeRef } from '@/store';
import { getRandomColor } from '@/utils';

const useService = () => {
  

  useEffect(() => {
    (async () => {
      const messageuid = localStorage.getItem(MESSAGE_UID) || '';
      const res: any = await request({
        url: '/api/history',
        method: 'GET',
        params: {
          messageuid,
        },
      });
      store.messageList = res.map((el: any) => {
        return {
          ...el,
          key: uuid(),
          color: el.role === ROLEMAP.USER ? getRandomColor() : undefined,
        };
      });

      setTimeout(() => {
        store.scrollRef.current?.scrollTo({
          top: store.scrollRef.current.scrollHeight,
          // 平滑
          behavior: 'smooth',
        });
      }, 0);
    })();
  }, []);

  const sendStr = async (value?: string) => {
    if (!value) return;

    store.sendBtnLoading = true;
    const controller = new AbortController();
    storeRef.abortController = controller;

    const msgUid = uuid();
    const userMassage = {
      role: ROLEMAP.USER,
      content: value as string,
    };

    store.messageList.push({ ...userMassage, key: msgUid, color: getRandomColor() });

    const assistantMsg = proxy({
      key: uuid(),
      role: ROLEMAP.ASSISTANT,
      content: '',
      color: getRandomColor(),
    });

    store.lastMessage = assistantMsg;
    setTimeout(() => {
      store.scrollRef.current?.scrollTo({
        top: store.scrollRef.current.scrollHeight,
        // 平滑
        behavior: 'smooth',
      });
    }, 0);

    await new Promise((resolve, reject) => {
      try {
        const messageuid = localStorage.getItem(MESSAGE_UID) || '';
        requestEventStream(
          {
            url: '/api/chat-string',
            method: 'POST',
            headers: {
              messageuid,
            },
            data: {
              message: userMassage,
            },
            abortController: storeRef.abortController,
          },
          (res: string | number) => {
            console.log(123, res);
            if (res === -1) {
              store.sendBtnLoading = false;
              resolve('');

              store.messageList.push(assistantMsg);
              store.lastMessage = null;

              if (store.messageList?.length > 30) {
                store.messageList = takeRight(store.messageList, 30);
              }
              return;
            }

            assistantMsg.role = ROLEMAP.ASSISTANT;
            assistantMsg.key = uuid();
            assistantMsg.content += res;
            if (assistantMsg.content === '请求openai出错') {
              localStorage.removeItem(MESSAGE_UID);
              store.messageList = [];
            }
          },
          (res) => {
            store.sendBtnLoading = false;
            reject(res);
          }
        );
      } catch (e) {
        reject(e);
        message.error('请求出错');
        console.error(e);
        assistantMsg.content = '请求出错';
      }
    });
  };

  return {
    sendStr,
  };
};

export default useService;
