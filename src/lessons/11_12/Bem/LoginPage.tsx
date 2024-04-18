import { FC } from 'react';
import './LoginPage.bem.css';

const LoginPage: FC = () => {
  return (
    <div className={'page'}>
      <div className={'form'}>
        <h1 className="form__title">Авторизация</h1>

        <div className="form__login">
          <span className="form__login-title form__login-title--disabled">
            Логин
          </span>
          <input
            disabled
            value="login_hahaha"
            type="text"
            className="form__login-input form__login-input--disabled"
          ></input>
        </div>

        <div className="form__password">
          <span className="form__password-title">Пароль</span>
          <input type="text" className="form__password-input" />
        </div>

        <button className="form__button form__button--disabled">Войти</button>
      </div>
    </div>
  );
};

export default LoginPage;
