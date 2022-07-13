import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  Page404,
  IngredientPage,
  Feed,
  FeedOrderDetailsPage
} from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useAuth } from '../../hooks/use-auth-hook';
import { useGetIngredients } from '../../hooks/use-get-ingredients';
import {
  RESET_INGREDIENTS_FAILED,
} from '../../services/actions/ingredients';
import { ProtectedRoute } from '../protected-route/protected-route';
import { AnonimusRoute } from '../anonimus-route/anonimus-route';
import Preloader from '../preloader/preloader';
import { getCookie } from '../../utils/utils';
import FeedOrderDetails from '../feed-content/feed-order-details/feed-order-details';
import { getOrders } from '../../services/selectors';

function App () {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    authRequest,
    message
  } = useSelector(store => store.user);

  const ingredientsError = useGetIngredients();
  useAuth();

  const closeErrorPopup = () => {
    if (ingredientsError) {
      dispatch({ type: RESET_INGREDIENTS_FAILED });
    }
  };

  const background = location.state && location.state.background;

  const closeIngredientPopup = () => {
    history.goBack();
  }

  const orders = useSelector(getOrders);

  if (authRequest || (message === '' && getCookie('token'))) {
    return (<Preloader />);
  } else {
      return(
        <>
          <AppHeader />
          {
            ingredientsError &&
            <Modal title={'Что-то пошло не так.'} closePopup={closeErrorPopup}>
              <p>Попробуйте перезагрузить страницу</p>
            </Modal>
          }
          <Switch location={background || location}>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
            <Route path="/feed" exact={true}>
              <Feed />
            </Route>
            <Route path="/ingredients/:id" exact={true}>
              <IngredientPage />
            </Route>
            <Route path="/feed/:id" exact={true}>
              <FeedOrderDetailsPage />
            </Route>
            <AnonimusRoute path="/login" exact={true}>
              <LoginPage />
            </AnonimusRoute>
            <AnonimusRoute path="/register" exact={true}>
              <RegistrationPage />
            </AnonimusRoute>
            <AnonimusRoute path="/forgot-password" exact={true}>
              <ForgotPasswordPage />
            </AnonimusRoute>
            <AnonimusRoute path="/reset-password" exact={true}>
              <ResetPasswordPage />
            </AnonimusRoute>
            <ProtectedRoute path="/profile" exact={true}>
              <ProfilePage />
            </ProtectedRoute>
            <Route>
              <Page404 />
            </Route>
          </Switch>
          {
            background &&
            <Route path="/ingredients/:id" exact={true}>
              <Modal
                title='Детали ингредиента'
                closePopup={closeIngredientPopup}
              >
                <IngredientDetails />
              </Modal>
            </Route>
          }
          {
            background && orders.length &&
            <Route path="/feed/:id" exact={true}>
              <Modal
                title=''
                closePopup={closeIngredientPopup}
              >
                <FeedOrderDetails />
              </Modal>
            </Route>
          }
        </>
      );
    }
  }

export default App;