import { FC } from "react";
import { useDispatch } from "../../services/hooks";
import { NavLink, useHistory } from "react-router-dom";
import { logoutUser } from "../../services/actions/user";
import styles from "./profile-menu.module.css";

const ProfileMenu: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutButtonHandler = () => {
    dispatch(logoutUser());
    history.replace({
      pathname: "/",
      state: {
        from: {
          pathname: "/",
        },
      },
    });
  };

  return (
    <nav className={styles.nav}>
      <menu className={styles.list}>
        <li>
          <NavLink
            to={`/profile`}
            exact={true}
            className={`${styles.link} text text_type_main-medium`}
            activeClassName={`${styles.linkActive} text text_type_main-medium`}
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/profile/orders`}
            exact={true}
            className={`${styles.link} text text_type_main-medium`}
            activeClassName={`${styles.linkActive} text text_type_main-medium`}
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <button
            className={`${styles.button} text text_type_main-medium`}
            onClick={logoutButtonHandler}
          >
            Выход
          </button>
        </li>
      </menu>
      <p className={`${styles.notes} text text_type_main-small mt-20`}>
        В этом разделе вы можете изменить&nbsp;свои персональные данные
      </p>
    </nav>
  );
};

export default ProfileMenu;
