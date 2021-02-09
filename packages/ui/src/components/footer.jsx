import React from 'react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left breadcrumb" />
      <div className="footer__right">
        <ul className="list list--xs">
          <li className="list__item">
            <strong className="list__item-label">
              <a href="https://adidas.com/" target="_blank" rel="nofollow noreferrer noopener" className="link label">
                adidas.com
              </a>
            </strong>
          </li>
        </ul>
      </div>
    </footer>
  );
}
