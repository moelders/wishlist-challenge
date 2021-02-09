import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Button, Modal, TextField } from 'yarn-design-system-react-components';
import { I18nContext } from '../../../locales/i18n';

export function Login({ onAccept, className }) {
  const _className = cn('login', className);

  const t = useContext(I18nContext);
  const [ userName, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleClose() {
    onAccept({ userName, password });
  }

  const title = <h5>{ t('auth.label') }</h5>;

  const footer = (
    <Button className="space-m-r-2" type="secondary" onClick={ handleClose }>
      { t('component.auth.accept') }
    </Button>
  );

  const userNameField = (
    <TextField id="userNameField"
        type="text"
        value={ userName }
        placeholder={ t('auth.form.placeholder', { type: t('auth.form.userName') }) }
        required={ true }
        label={ t('auth.form.userName') }
        iconBefore="profile"
        onChange={ setUserName } />
  );

  const passwordField = (
    <TextField id="passwordField"
        type="password"
        value={ password }
        placeholder={ t('auth.form.placeholder', { type: t('auth.form.password') }) }
        required={ true }
        label={ t('auth.form.password') }
        iconBefore="confidential-lock"
        onChange={ setPassword } />
  );

  return (
    <div className={ _className }>
      <Modal className="login__modal"
          title={ title }
          footer={ footer }
          floating={ false }
          closable={ false }>
        <>
          { userNameField }
          { passwordField }
        </>
      </Modal>
    </div>
  );
}
