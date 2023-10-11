import { message } from 'antd';
import { MESSAGE_UID } from './constant';
import { fetchEventSource } from '@microsoft/fetch-event-source';

interface IOptions {
  url: string;
  method: 'GET' | 'POST';
  data: any;
  headers: any;
  abortController?: AbortController;
}

const requestEventStream = async (
  options: IOptions,
  callback: (val: any, headers?: Headers) => any,
  onError?: (err: any) => any,
) => {
  const { url, method, data, headers, abortController } = options;

  fetchEventSource(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
    signal: abortController?.signal,
    async onopen(res) {
      const messageuid = res.headers.get(MESSAGE_UID);
      console.log(messageuid)
      if (messageuid) {
        localStorage.setItem(MESSAGE_UID, messageuid);
      }
      return;
    },
    onmessage(response: any) {
      const str = response.data;
      if (str === '[DONE]') {
        callback(-1);
        return;
      }
      const obj = JSON.parse(str);
      callback(obj.choices[0].delta.content || '');
    },
    onerror(response: any) {
      console.log('onerror', response);
      callback(-1);
      onError?.('请求出错');
      message.error('请求出错');
      throw new Error('请求出错');
    },
  });
};

export default requestEventStream;
