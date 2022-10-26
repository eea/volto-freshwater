import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Portal } from 'react-portal';
import BasketSearchPopup from './BasketSearchPopup';
import basketSVG from '@eeacms/volto-freshwater/icons/basket.svg';
import './style.less';

const BasketSearchButton = (props) => {
  const { basket, location } = props;

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

  const placement = () => {
    if (location.pathname === '/data-maps-and-tools/metadata') return true;
    return false;
  };

  return (
    <>
      {placement() === true && (
        <Portal
          node={__CLIENT__ && document.querySelector('.documentFirstHeading')}
        >
          <div className="boards-search" ref={menuRef} id="toolbar">
            <Button
              className="basket-search-btn"
              style={{ backgroundColor: 'transparent' }}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              title="Boards basket"
            >
              {basket.items && basket.items.length > 0 && (
                <div className="basket-count">
                  <span>{basket.items.length}</span>
                </div>
              )}

              <Icon name={basketSVG} size="36px" />
            </Button>

            {showMenu ? <BasketSearchPopup /> : null}
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
)(BasketSearchButton);
