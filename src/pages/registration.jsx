import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AdditionalActions from '../components/additional-actions/additional-actions';
import Modal from '../components/modal/modal';
import Preloader from '../components/preloader/preloader';
import Title from '../components/title/title';
import {
  registerUser,
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
} from '../services/actions/user';
import { regEmail } from '../utils/const';

const additionalItems = [
  {
    text: 'Уже зарегистрированы?',
    link: '/login',
    linkText: 'Войти'
  }
];

let buttonIsDisabled = true;

export const RegistrationPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [ isEmail, setIsEmail ] = useState(true);
  const { name, email, password } = useSelector(state => state.user.input);
  const { registerRequest, registerError, message, data } = useSelector(state => state.user);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(registerUser({ name, email, password }));
  }

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
  };

  const onCloseSuccessPopup = () => {
    dispatch({
      type: CLEAR_REQUESTS_MESSAGE,
    });
    history.replace({
      pathname: '/',
      state: {
        from: {
          pathname: '/'
        }
      }
    });
  };

  const checkEmailCorrect = () => {
    if (email !== '') {
      setIsEmail(regEmail.test(email));
    }
  }

  useEffect(() => {
    buttonIsDisabled = !email || !password || !name;
  }, [ email, password, name ]);

  return (
    <main className='page'>
      <form className='form' noValidate>
        <Title tag={'h2'}>Регистрация</Title>
        <Input
          placeholder='Имя'
          value={name}
          name='name'
          onChange={handleInputChange}
        />
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
          !registerRequest && <Button
            type='primary'
            size='medium'
            onClick={onFormSubmit}
            disabled={buttonIsDisabled}
            htmlType='submit'
          >
            Зарегистрироваться
          </Button>
        }
        {
          registerRequest && <Preloader />
        }
      </form>
      <AdditionalActions additionalItems={additionalItems} />
      {
        registerError &&
        <Modal title={'Ошибка'} closePopup={onCloseErrorPopup}>
          <p>{ message }</p>
        </Modal>
      }
      {
        data.isAuth &&
        <Modal title={'Поздравляем!'} closePopup={onCloseSuccessPopup}>
          <p>Вы успешно зарегистрировались! Пора оформить заказ!</p>
        </Modal>
      }
    </main>
  );
}
