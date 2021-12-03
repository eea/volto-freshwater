import React from 'react';
import { Portal } from 'react-portal';
import { Link } from 'react-router-dom';
import { Icon } from '@plone/volto/components';
import bookSVG from '@plone/volto/icons/book.svg';

const FavoritesToolbarButton = (props) => {
  return (
    <Portal node={__CLIENT__ && document.querySelector('.toolbar-bottom')}>
      <div className="fav-toolbar-menu">
        <Link className="fav-toolbar-btn" title="Boards" to="/boards">
          <Icon name={bookSVG} size="35px" />
        </Link>
      </div>
    </Portal>
  );
};

export default FavoritesToolbarButton;
