import { message } from 'antd';
import { MESSAGE_UID } from './constant';
import { chunkText } from '.';

const decoder = new TextDecoder('utf-8');

const processResult = async ({ res, callback }: { res?: any; callback: any }) => {
  const reader = res.body?.getReader();
  if (!reader) {
    console.error('没有reader');
    return;
  }

  let done = false;
  while (!done) {
    const result = await reader.read();
    if (result.done) {
      done = true;
      callback(-1);
    } else {
      const decodedData = decoder.decode(result.value, { stream: true });
      const str = decodedData.toString();

      const chunk = chunkText(str, 1);
      for (let i = 0; i < chunk.length; i++) {
        callback(chunk[i]);
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    }
  }
};

interface IOptions {
  url: string;
  method: 'GET' | 'POST';
  data: any;
  headers: any;
  abortController?: AbortController;
}

const requestEventStream = async (
  options: IOptions,
  callback: (val: any, headers: Headers) => any,
  onError?: (err: any) => any,
) => {
  const { url, method, data, headers, abortController } = options;
  const res = await fetch(
    new Request(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    }),
    {
      signal: abortController?.signal,
    },
  );
  if (res.status == 200) {
    const messageuid = res.headers.get(MESSAGE_UID);
    if (messageuid) {
      localStorage.setItem(MESSAGE_UID, messageuid);
    }

    processResult({ res, callback });
  } else {
    onError?.(res)
    message.error('请求出错');
  }
};

export default requestEventStream;
