import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch
} from "react-router-dom";
import ProfileForm from '../components/profile-form/profile-form';
import styles from './profile.module.css'

export const ProfilePage = () => {
  const { url } = useRouteMatch();
  return (
    <div className='page'>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <menu className={styles.list}>
            <li>
              <NavLink
                to={`${url}/`}
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={`${styles.linkActive} text text_type_main-medium`}
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${url}/orders`}
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={`${styles.linkActive} text text_type_main-medium`}
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <button className={`${styles.button} text text_type_main-medium`}>Выход</button>
            </li>
          </menu>
          <p className={`${styles.notes} text text_type_main-small mt-20`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </nav>
        <section>
          <Router>
            <Switch>
              <Route path={`${url}/`}>
                <ProfileForm />
              </Route>
              <Route path={`${url}/orders`}></Route>
            </Switch>
          </Router>
        </section>
      </main>
    </div>
  );
};
