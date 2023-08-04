import useThemeToken from '@/utils/useThemeToken';
import classnames from 'classnames';
import React from 'react';
import styles from './index.module.less';
import store, { changeTheme } from '@/store';
import { Switch } from 'antd';
import { Outlet } from 'react-router-dom';
import { useSnapshot } from 'valtio';

const BaseLayout = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { style = {}, className = '', ...rest } = props;
  const { theme } = useSnapshot(store);

  return (
    <div
      {...rest}
      style={{ ...style }}
      className={classnames(className, styles.wrap, styles[theme])}
    >
      <Outlet />
      <Switch
        checkedChildren="🌞"
        unCheckedChildren="🌚"
        defaultChecked
        className={styles.changeTheme}
        onChange={() => {
          changeTheme();
        }}
      />
    </div>
  );
};

export default BaseLayout;
