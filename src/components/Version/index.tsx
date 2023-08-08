import useThemeToken from '@/utils/useThemeToken';
import styles from './index.module.less';

const Version = () => {
  const themeToken = useThemeToken();

  return (
    <div className={styles.version} style={{ color: themeToken.colorText }}>
      V2.3.0
    </div>
  );
};

export default Version;
