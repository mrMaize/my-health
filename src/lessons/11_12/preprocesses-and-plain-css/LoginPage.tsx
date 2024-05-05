import { FC } from 'react';
import './PreProcessed/LoginPage.scss';
// import './PreProcessed/LoginPage.sass';
// import './PreProcessed/LoginPage.less';
// import './PlainCss/LoginPage.css';

const LoginPage: FC = () => {
  return (
    <div className="page">
      <div className="wrapper">
        <h1 className="header">Авторизация</h1>
        <div className="login">
          <span>Логин</span>
          <input type="text" />
        </div>

        <div className="password">
          <span>Пароль</span>
          <input type="password" />
        </div>

        <button className="login-button">Войти</button>
      </div>
    </div>
  );
};

export default LoginPage;
