import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/user';
import styles from './profile-form.module.css';

function ProfileForm () {
  const dispatch = useDispatch();
  const { name, email } = useSelector(store => store.user.data);
  const [isInputEdit, setInputEdit] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [newUserData, setNewUserData] = useState({
    newName: name,
    newEmail: email,
    newPassword: '',
  });

  const onInputIconClick = (name) => {
    setInputEdit({
      ...isInputEdit,
      [name]: !isInputEdit[name],
    })
  };

  const handleInputChange = (evt) => {
    setNewUserData({
      ...newUserData,
      [evt.target.name]: evt.target.value,
    })
  };

  const submitForm = (evt) => {
    evt.preventDefault();
    const userData = {};
    if (newUserData.newName !== name) {
      userData.name = newUserData.newName;
    }
    if (newUserData.newEmail !== email) {
      userData.name = newUserData.newEmail;
    }
    if (newUserData.newPassword !== '') {
      userData.name = newUserData.newPassword;
    }

    dispatch(updateUser(userData));

    setInputEdit({
      name: false,
      email: false,
      password: false,
    });
  }

  const resetForm = (evt) => {
    evt.preventDefault();
    setInputEdit({
      name: false,
      email: false,
      password: false,
    });
    setNewUserData({
      newName: name,
      newEmail: email,
      newPassword: '',
    });
  }

  return (
    <form
      className={styles.form}
      noValidate={true}
      onSubmit={submitForm}
      onReset={resetForm}
    >
      <Input
        type='text'
        placeholder='Имя'
        value={newUserData.newName}
        name='newName'
        icon='EditIcon'
        disabled={!isInputEdit.name}
        onIconClick={() => onInputIconClick('name')}
        onChange={handleInputChange}
      />
      <Input
        type='email'
        placeholder='Логин'
        value={newUserData.newEmail}
        name='newEmail'
        icon='EditIcon'
        disabled={!isInputEdit.email}
        onIconClick={() => onInputIconClick('email')}
        onChange={handleInputChange}
      />
      <Input
        type='password'
        placeholder='Пароль'
        value={newUserData.newPassword}
        name='newPassword'
        icon='EditIcon'
        disabled={!isInputEdit.password}
        onIconClick={() => onInputIconClick('password')}
        onChange={handleInputChange}
      />
      {
        (isInputEdit.name || isInputEdit.email || isInputEdit.password) &&
        <ul className={styles.controls}>
          <li>
            <Button
              type="secondary"
              size="medium"
              htmlType='reset'
            >
              Отмена
            </Button>
          </li>
          <li>
            <Button
              type="primary"
              size="medium"
              htmlType='submit'
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
