import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from './components/app-header/app-header';
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  Page404,
} from './pages';
import Modal from './components/modal/modal';
import { useAuth } from './hooks/use-auth-hook';
import { useGetIngredients } from './hooks/use-get-ingredients';
import {
  RESET_INGREDIENTS_FAILED,
} from './services/actions/ingredients';
import { ProtectedRoute } from './components/protected-route/protected-route';

function App () {
  const dispatch = useDispatch();

  const ingredientsError = useGetIngredients();
  useAuth();

  const closeErrorPopup = () => {
    if (ingredientsError) {
      dispatch({ type: RESET_INGREDIENTS_FAILED });
    }
  };

  return(
    <Router>
      <AppHeader />
      {
        ingredientsError &&
        <Modal title={'Что-то пошло не так.'} closePopup={closeErrorPopup}>
          <p>Попробуйте перезагрузить страницу</p>
        </Modal>
      }
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegistrationPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;