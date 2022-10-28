import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Portal } from 'react-portal';
import BasketToolbarPopup from './BasketToolbarPopup';
import basketSVG from '@eeacms/volto-freshwater/icons/basket.svg';
import './style.less';

const BasketToolbarButton = (props) => {
  const { basket } = props;

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
    <Portal
      node={__CLIENT__ && document.querySelector('.right-section-wrapper')}
    >
      <div className="fav-basket-menu" ref={menuRef}>
        <Button
          className="basket-btn"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          title="Boards basket"
        >
          <Icon name={basketSVG} size="30px" />
          {basket.items && basket.items.length > 0 && (
            <div className="basket-count">
              <span>{basket.items.length}</span>
            </div>
          )}
        </Button>

        {showMenu ? <BasketToolbarPopup /> : null}
      </div>
    </Portal>
  );
};

export default compose(
  connect((state) => ({
    basket: state.basket,
  })),
)(BasketToolbarButton);
