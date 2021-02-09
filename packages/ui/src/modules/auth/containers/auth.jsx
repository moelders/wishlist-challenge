import React from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { STORAGE_KEY } from '../../../config';
import { login } from '../../../store/actions';
import { useApi } from '../../../services/api';
import { set } from '../../../services/storage';
import { Login } from '../components/login';

export function AuthContainer({ className }) {
  const _className = cn('container', className);

  const { login: loginApi } = useApi('auth');
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(({ auth }) => auth.loggedIn);

  const { from } = location.state || { from: { pathname: '/' } };

  function handleAccept(credentials) {
    loginApi(credentials)
    .then((user) => {
      set(STORAGE_KEY.user, user);
      dispatch(login(user));

      history.replace(from);
    })
    .catch(console.error.bind(console));
  }

  return loggedIn
    ? <Redirect to={ from } />
    : (
      <div className={ _className }>
        <Login onAccept={ handleAccept } />
      </div>
    );
}

AuthContainer.propTypes = {
  className: PropTypes.string
};
