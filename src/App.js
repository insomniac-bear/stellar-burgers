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
import { ProtectedRoute } from './components/protected-route/protected-route';

function App () {
  return(
    <Router>
      <AppHeader />
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