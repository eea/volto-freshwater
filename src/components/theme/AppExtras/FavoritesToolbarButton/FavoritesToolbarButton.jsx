import React from 'react';
import { useSelector } from 'react-redux';
import { Portal } from 'react-portal';
import { Link } from 'react-router-dom';
import { Icon } from '@plone/volto/components';
import starSVG from '@plone/volto/icons/star.svg';

const BasketToolbarButton = (props) => {
  const items = useSelector((state) => state.collectivebookmarks?.items || []);

  return items && items.length > 0 ? (
    <div>
      <Portal node={__CLIENT__ && document.querySelector('.toolbar-bottom')}>
        <div className="fav-toolbar-menu">
          <Link className="fav-toolbar-btn" title="Favorites" to="/favorites">
            <Icon name={starSVG} size="35px" />
          </Link>
        </div>
      </Portal>
    </div>
  ) : (
    ''
  );
};

export default BasketToolbarButton;
