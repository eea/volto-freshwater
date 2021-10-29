import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button, Confirm } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import {
  deleteBookmark,
  getAllBookmarks,
} from '@eeacms/volto-freshwater/actions/boards';
import { useCopyToClipboard } from '@eeacms/volto-freshwater/utils';

import clearSVG from '@plone/volto/icons/delete.svg';
import linkSVG from '@plone/volto/icons/link.svg';

const CopyUrlButton = ({ url, confirmationText }) => {
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(url);

  if (copyUrlStatus === 'copied') {
    confirmationText = 'Copied to clipboard';
  } else if (copyUrlStatus === 'failed') {
    confirmationText = 'Copy failed. Please try again.';
  }

  return (
    <>
      <Button
        icon
        basic
        className="delete-fav-btn"
        title="Copy link to clipboard"
        onClick={copyUrl}
      >
        <Icon name={linkSVG} size="16px" />
      </Button>
      {copyUrlStatus === 'copied' && (
        <div className="copy-box">{confirmationText}</div>
      )}
    </>
  );
};

const FavItemToolbar = (props) => {
  const { item, groupedItems, userId, paramOwner, boardsModify } = props;
  const link = item['@id'];
  const dispatch = useDispatch();

  const [confirmOpen, setConfirmOpen] = useState(false);

  React.useEffect(() => {
    if (boardsModify === 'loaded') {
      dispatch(getAllBookmarks(paramOwner));
    }
  }, [dispatch, boardsModify, paramOwner]);

  const handleDeleteBookmark = (uid, group, searchquery) => {
    if (groupedItems.length === 1) {
      setConfirmOpen(true);
    } else {
      dispatch(deleteBookmark(uid, group, searchquery));
    }
  };

  return (
    <div className="fav-item-toolbar">
      <CopyUrlButton url={link} confirmationText="Copy URL" />

      {paramOwner === userId && (
        <>
          <Button
            icon
            basic
            className="delete-fav-btn"
            title="Remove item from this board"
            onClick={() => {
              handleDeleteBookmark(
                item.uid,
                item.group,
                item.queryparams || '',
              );
            }}
          >
            <Icon name={clearSVG} size="16px" />
          </Button>
        </>
      )}

      <Confirm
        className="delete-item-modal"
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

export default compose(
  connect((state) => ({
    boardsModify: state.boards?.modify || {},
  })),
)(FavItemToolbar);
