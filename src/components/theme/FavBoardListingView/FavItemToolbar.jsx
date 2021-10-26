import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Confirm } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { deleteBookmark } from '@eeacms/volto-freshwater/actions/favBoards';

import clearSVG from '@plone/volto/icons/delete.svg';
import linkSVG from '@plone/volto/icons/share.svg';

const FavItemToolbar = (props) => {
  const { item, groupedItems, userId, paramOwner } = props;
  const link = item['@id'];
  const dispatch = useDispatch();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteBookmark = (uid, group, searchquery) => {
    if (groupedItems.length === 1) {
      setConfirmOpen(true);
    } else {
      dispatch(deleteBookmark(uid, group, searchquery));
    }
  };

  return (
    <div className="fav-item-toolbar">
      {paramOwner === userId && (
        <Button
          icon
          basic
          className="delete-fav-btn"
          title="Remove item from this board"
          onClick={() => {
            handleDeleteBookmark(item.uid, item.group, item.queryparams || '');
          }}
        >
          <Icon name={clearSVG} size="16px" />
        </Button>
      )}

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

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        confirmButton="Delete"
        content={`${
          'If you delete the last item, it will delete the board as well, ' +
          'are you sure you want to delete this item?'
        }`}
        onConfirm={() => {
          dispatch(
            deleteBookmark(item.uid, item.group, item.queryparams || ''),
          );
          props.history.push('/boards');
          window.location.reload();
        }}
      />
    </div>
  );
};

export default FavItemToolbar;
