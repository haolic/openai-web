import { totp, generateKey, getKeyUri } from 'otp-io';
import { hmac, randomBytes } from "otp-io/crypto";
import useService from './useService';
import List from './components/List';
import Content from './components/Content';
import styles from './index.module.less';

const key = generateKey(randomBytes, /* bytes: */ 20);

const url = getKeyUri({
  type: "totp",
  secret: key,
  name: "faruxue",
  issuer: "gpt"
});

// todo: 接入生成二维码
console.log(url);

const AllHistory = () => {
  useService();

  return (
    <div className={styles.wrap}>
      <List />
      <Content />
    </div>
  );
};

export default AllHistory;
