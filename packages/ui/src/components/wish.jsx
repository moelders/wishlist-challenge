import React from 'react';
import cn from 'classnames';
import { Icon } from 'yarn-design-system-react-components';

export function Wish({ active, dark, onClick = () => {}, className }) {
  const _className = cn('wish', {
    'wish--active': active,
    'wish--dark': dark
  }, className);

  function handleClick() {
    onClick(!active);
  }

  return (
    <div className={ _className }>
      <Icon name="star" size="xl" onClick={ handleClick } />
    </div>
  );
}
