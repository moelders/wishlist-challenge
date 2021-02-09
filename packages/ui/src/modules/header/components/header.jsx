import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Header as YarnHeader,
  HeaderContainer as YarnHeaderContainer,
  HeaderBrand as YarnHeaderBrand,
  HeaderMenu as YarnHeaderMenu,
  Icon,
  Link,
  Tabbar,
  TabbarItem
} from 'yarn-design-system-react-components';
import { I18nContext } from '../../../locales/i18n';
import { SWAGGER_URL } from '../../../config';

function getLocationBase(pathname) {
  const [ base ] = pathname.substr(1).match(/^\w+/) || [];

  return base;
}

export function Header({ title, menuLinks, login }) {
  const t = useContext(I18nContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const [ activeTabId, setActiveTabId ] = useState(getLocationBase(pathname));

  function navigate(location) {
    history.replace(`/${ location }`);
  }

  useEffect(() => {
    setActiveTabId(getLocationBase(pathname));
  }, [ pathname ]);

  return (
    <YarnHeader mobileResponsive={ true }>
      <YarnHeaderContainer position="left">
        <NavLink className="link" to="/">
          <YarnHeaderBrand logo={ <Icon name="baskets" /> }>
            { title }
          </YarnHeaderBrand>
        </NavLink>
      </YarnHeaderContainer>
      { !!menuLinks.length && (
        <YarnHeaderContainer position="middle">
          <YarnHeaderMenu>
            <Tabbar onSelect={ navigate }>
              { menuLinks.map(({ id, icon }) => (
                <TabbarItem key={ id } itemId={ id } active={ id === activeTabId }>
                  <Link>
                    <Icon name={ icon } className="space-m-r-1" />
                    { t(`${ id }.label`) }
                  </Link>
                </TabbarItem>
              )) }
            </Tabbar>
          </YarnHeaderMenu>
        </YarnHeaderContainer>
      ) }
      <YarnHeaderContainer position="right">
        { login }
        <Link href={ SWAGGER_URL }
            rel="noopener noreferrer nofollow"
            target="_blank">
          <Button type="primary">
            <Icon name="manual" />
            <span>{ t('header.doc') }</span>
          </Button>
        </Link>
      </YarnHeaderContainer>
    </YarnHeader>
  );
}
