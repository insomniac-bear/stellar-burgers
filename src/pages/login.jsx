import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AdditionalActions from '../components/additional-actions/additional-actions';
import Modal from '../components/modal/modal';
import Preloader from '../components/preloader/preloader';
import Title from '../components/title/title';
import {
  loginUser,
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
} from '../services/actions/user';
import { regEmail, RequestStatus } from '../utils/const';

const additionalItems = [
  {
    text: 'Вы — новый пользователь?',
    link: '/register',
    linkText: 'Зарегистрироваться'
  },
  {
    text: 'Забыли пароль?',
    link: '/forgot-password',
    linkText: 'Восстановить пароль'
  }
];

export const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.state?.from.pathname || '/';

  const [ isEmail, setIsEmail ] = useState(true);
  const { email, password } = useSelector(state => state.user.input);
  const { loginRequest, message } = useSelector(state => state.user);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleInputChange = (evt) => {
    dispatch({
      type: USER_FORM_SET_VALUE,
      field: evt.target.name,
      value: evt.target.value
    })
  };

  const onCloseErrorPopup = () => {
    dispatch({
      type: CLEAR_REQUESTS_MESSAGE,
    });
}

  const checkEmailCorrect = () => {
    if (email !== '') {
      setIsEmail(regEmail.test(email));
    }
  }

  useEffect(() => {
    if (loginRequest === RequestStatus.success) {
      history.replace({ pathname });
    }
  }, [ loginRequest, history, pathname ]);

  return (
    <main className='page'>
      <form
        className='form'
        noValidate
        onSubmit={onFormSubmit}
      >
        <Title tag={'h2'}>Вход</Title>
        <Input
          placeholder='E-mail'
          value={email}
          name='email'
          onChange={handleInputChange}
          onBlur={checkEmailCorrect}
          error={!isEmail}
          errorText='Введите корректный email'
        />
        <PasswordInput
          name='password'
          value={password}
          onChange={handleInputChange}
          placeholder='Пароль'
        />
        {
          loginRequest !== 'pending' && <Button
            type='primary'
            size='medium'
            disabled={!email || !password}
            htmlType='submit'
          >
            Войти
          </Button>
        }
        {
          loginRequest === RequestStatus.pending && <Preloader />
        }
      </form>
      <AdditionalActions additionalItems={additionalItems} />
      {
        loginRequest === RequestStatus.failed &&
        <Modal title={'Ошибка'} closePopup={onCloseErrorPopup}>
          <p>{ message }</p>
        </Modal>
      }
    </main>
  );
};
