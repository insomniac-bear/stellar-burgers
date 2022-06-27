import { useSelector, useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Title from '../title/title';
import styles from './form.module.css';
import { USER_FORM_SET_VALUE } from '../../services/actions/user';

function Form ({
  namePlaceholder = '',
  emailPlaceholder = '',
  passwordPlaceholder = '',
  codePlaceholder = '',
  title='Вход',
  buttonName='Войти',
  onFormSubmit,
}) {
  const {
    name,
    email,
    password,
    code
  } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleInputChange = (evt) => {
    dispatch({
      type: USER_FORM_SET_VALUE,
      field: evt.target.name,
      value: evt.target.value
    })
  }
  return (
    <form className={styles.form}>
      <Title tag={'h2'}>{ title }</Title>
        {namePlaceholder && <Input
          placeholder={namePlaceholder}
          value={name}
          name='name'
          onChange={handleInputChange}
        />}
        {emailPlaceholder &&<Input
          placeholder={emailPlaceholder}
          value={email}
          name='email'
          onChange={handleInputChange}
        />}
        {passwordPlaceholder && <PasswordInput
          name='password'
          value={password}
          onChange={handleInputChange}
          placeholder={passwordPlaceholder}
        />}
        {codePlaceholder && <Input
          placeholder={codePlaceholder}
          value={code}
          name='code'
          onChange={handleInputChange}
        />}
        <Button
          type='primary'
          size='medium'
          onClick={onFormSubmit}
        >
          {buttonName}
        </Button>
    </form>
  );
}

export default Form;