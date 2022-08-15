import { useState, useMemo, useEffect, FC, FormEvent } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AdditionalActions from '../components/additional-actions/additional-actions';
import Modal from '../components/modal/modal';
import Preloader from '../components/preloader/preloader';
import Title from '../components/title/title';
import { recoveryPassword } from '../services/actions/user';
import {
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
} from '../services/constants';
import { regEmail } from '../utils/const';

const additionalItems = [
  {
    text: 'Вспомнили пароль?',
    link: '/login',
    linkText: 'Войти'
  }
];

let buttonIsDisabled = true;

export const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [ isEmail, setIsEmail ] = useState(true);
  const { email } = useSelector(state => state.user.input);
  const { forgotPassRequest, message } = useSelector(state => state.user);

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(recoveryPassword(email));
  };

  const handleInputChange = (evt: any) => {
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

  useMemo(() => {
    buttonIsDisabled = !email;
  }, [ email ]);

  useEffect(() => {
    if (message && forgotPassRequest !== 'failed') {
      dispatch({
        type: CLEAR_REQUESTS_MESSAGE
      })
      history.replace({
        pathname: '/reset-password',
        state: '/login'
      });
    }
  }, [ history, message, forgotPassRequest, dispatch ]);

  return (
    <main className='page'>
      <form
        className='form'
        noValidate
        onSubmit={onFormSubmit}
      >
        <Title tag={'h2'}>Восстановление пароля</Title>
        <Input
          placeholder='E-mail'
          value={email}
          name='email'
          onChange={handleInputChange}
          onBlur={checkEmailCorrect}
          error={!isEmail}
          errorText='Введите корректный email'
        />
        {
          !forgotPassRequest && <Button
            type='primary'
            size='medium'
            disabled={buttonIsDisabled}
            htmlType='submit'
          >
            Восстановить
          </Button>
        }
        {
          forgotPassRequest === 'pending' && <Preloader />
        }
      </form>
      <AdditionalActions additionalItems={additionalItems} />
      {
        forgotPassRequest === 'failed' &&
        <Modal title={'Ошибка'} closePopup={onCloseErrorPopup}>
          <p>{ message }</p>
        </Modal>
      }
    </main>
  );
};
