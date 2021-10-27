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
    <div>
      <Portal node={__CLIENT__ && document.querySelector('.toolbar-bottom')}>
        <div className="fav-toolbar-menu" ref={menuRef}>
          <Button
            className="basket-toolbar-btn"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            title="Favorite boards"
          >
            {basket && basket.length > 0 && (
              <div className="basket-count">
                <span>{basket.length}</span>
              </div>
            )}

            <Icon name={basketSVG} size="36px" />
          </Button>

          {showMenu ? <BasketToolbarPopup /> : null}
        </div>
      </Portal>
    </div>
  );
};

export default compose(
  connect((state) => ({
    basket: state.favBasket.basket,
  })),
)(BasketToolbarButton);
