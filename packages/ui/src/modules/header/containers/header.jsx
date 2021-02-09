import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Avatar, Button, Chip } from 'yarn-design-system-react-components';
import { I18nContext } from '../../../locales/i18n';
import { logout } from '../../../store/actions';
import { remove } from '../../../services/storage';
import { STORAGE_KEY, PROFILE_PICTURE_URL } from '../../../config';
import { Header } from '../components/header';

function getProfilePictureUrl(userName) {
  return PROFILE_PICTURE_URL.replace('{{userName}}', userName);
}

const DEFAULT_AVATAR_IMG = 'https://d2y1pz2y630308.cloudfront.net/24678/pictures-thumb/2020/2/person-placeholder-1-1.jpg';

export function HeaderContainer({ className }) {
  const _className = cn('container', className);

  const t = useContext(I18nContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { loggedIn, userName, fullName } = useSelector(({ auth }) => auth);

  function handleLogout() {
    dispatch(logout());
    remove(STORAGE_KEY.user);

    history.replace('/login');
  }

  const menuLinks = [
    { id: 'products', icon: 'products' },
    { id: 'wishlist', icon: 'star' }
  ];

  const avatar = (
    <Avatar text={ fullName }
        image={ userName.startsWith('tst_') ? DEFAULT_AVATAR_IMG : getProfilePictureUrl(userName) } />
  );

  return (
    <Header className={ _className }
        title={ t('title') }
        menuLinks={ loggedIn ? menuLinks : [] }
        login={ loggedIn
          ? (
            <Chip avatar={ avatar } size="lg" type="interactive" onClick={ handleLogout }>
              { fullName }
            </Chip>
          )
          : pathname !== '/login' && (
          <Link className="link" to="/login">
            <Button type="primary">{ t('auth.login') }</Button>
          </Link>
          )
      } />
  );
}

HeaderContainer.propTypes = {
  className: PropTypes.string
};
