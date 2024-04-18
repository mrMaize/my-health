import { FC } from 'react';

import styles from './LoginPage.module.css';

const LoginPage: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Авторизация</h1>
        <div className={styles.login}>
          <span>Логин</span>
          <input type={'text'} />
        </div>

        <div className={styles.password}>
          <span>Пароль</span>
          <input type={'password'} />
        </div>

        <button className={styles.loginButton}>Войти</button>
      </div>
    </div>
  );
};

export default LoginPage;
