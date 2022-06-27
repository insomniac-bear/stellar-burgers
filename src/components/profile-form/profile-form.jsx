import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';

function ProfileForm () {
  const [isInputEdit, setInputEdit] = useState({
    name: false,
    email: false,
    password: false,
  });
  const { name, email } = useSelector(store => store.user.data);

  const onInputIconClick = (name) => {
    setInputEdit({
      ...isInputEdit,
      [name]: !isInputEdit[name],
    })
  };

  const onCancelButtonClick = () => {
    setInputEdit({
      name: false,
      email: false,
      password: false,
    });
  }

  return (
    <form className={styles.form}>
      <Input
        type='text'
        placeholder='Имя'
        value={name}
        name='name'
        icon='EditIcon'
        disabled={!isInputEdit.name}
        onIconClick={() => onInputIconClick('name')}
      />
      <Input
        type='email'
        placeholder='Логин'
        value={email}
        name='email'
        icon='EditIcon'
        disabled={!isInputEdit.email}
        onIconClick={() => onInputIconClick('email')}
      />
      <Input
        type='password'
        placeholder='Пароль'
        value={''}
        name='password'
        icon='EditIcon'
        disabled={!isInputEdit.password}
        onIconClick={() => onInputIconClick('password')}
      />
      {
        (isInputEdit.name || isInputEdit.email || isInputEdit.password) &&
        <ul className={styles.controls}>
          <li>
            <Button
              type="secondary"
              size="medium"
            >
              Отмена
            </Button>
          </li>
          <li>
          <Button
              type="primary"
              size="medium"
              onClick={onCancelButtonClick}
            >
              Сохранить
            </Button>
          </li>
        </ul>
      }
    </form>
  );
};

export default ProfileForm;
