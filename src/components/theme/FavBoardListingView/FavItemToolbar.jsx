import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';

import clearSVG from '@plone/volto/icons/delete.svg';
import linkSVG from '@plone/volto/icons/share.svg';
import { deleteBookmark } from '@collective/volto-bookmarks/actions';

const FavItemToolbar = (props) => {
  const { item } = props;
  const link = item['@id'];
  const dispatch = useDispatch();

  const handleDeleteBookmark = (uid, group, searchquery) => {
    dispatch(deleteBookmark(uid, group, searchquery));
  };

  return (
    <div className="fav-item-toolbar">
      <Button
        icon
        basic
        className="delete-fav-btn"
        title="Remove"
        onClick={() => {
          handleDeleteBookmark(item.uid, item.group, item.queryparams || '');
        }}
      >
        <Icon name={clearSVG} size="16px" />
      </Button>
      <Button
        icon
        basic
        className="delete-fav-btn"
        title="Copy link"
        onClick={() => {
          navigator.clipboard.writeText(link);
        }}
      >
        <Icon name={linkSVG} size="16px" />
      </Button>
    </div>
  );
};

export default FavItemToolbar;
