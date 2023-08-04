import axios from 'axios';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  // responseType: 'stream', // 试试流式传输
});

request.interceptors.response.use(function (res) {
  if (res.status === 200) {
    return res.data;
  }
});

export default request;
