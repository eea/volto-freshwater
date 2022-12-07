import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { useSelector } from 'react-redux';
import { Portal } from 'react-portal';
import BasketPopup from './BasketPopup';
import basketSVG from '@eeacms/volto-freshwater/icons/basket.svg';
import './style.less';

const BasketButton = (props) => {
  const { basket } = props;
  const logedIn = useSelector(
    (state) =>
      state.userSession.token !== undefined && state.userSession.token !== null,
  );
  useLayoutEffect(() => {
    if (!document.getElementById('divider')) return;
    if (logedIn)
      document.getElementById('divider').style.display = 'inline-block';
    else document.getElementById('divider').style.display = 'none';
  }, [logedIn]);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const outsideClick = (e) => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', outsideClick);
    return () => {
      document.removeEventListener('mousedown', outsideClick);
    };
  }, [showMenu]);
  return (
    <>
      {logedIn && (
        <Portal node={__CLIENT__ && document.querySelector('.basket')}>
          <div
            className="search fav-basket-menu"
            ref={menuRef}
            role={'listbox'}
          >
            <Button
              className="basket-btn item"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              title="Boards basket"
            >
              <Icon name={basketSVG} size="25px" />

              {basket.items && basket.items.length > 0 && (
                <div className="basket-count">
                  <span>{basket.items.length}</span>
                </div>
              )}
            </Button>

            {showMenu ? <BasketPopup /> : null}
          </div>
        </Portal>
      )}
    </>
  );
};

export default compose(
  connect((state) => ({
    basket: state.basket,
  })),
)(BasketButton);
