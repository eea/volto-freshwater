import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { List, Modal, Button, Confirm, Popup } from 'semantic-ui-react';
import { BodyClass, flattenToAppURL } from '@plone/volto/helpers';
import { Toolbar, Icon } from '@plone/volto/components';
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import { groupBy } from 'lodash';
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
  FavBoardComments,
  FavItemToolbar,
} from '@eeacms/volto-freshwater/components';
import {
  getAllBookmarks,
  deleteBookmark,
} from '@eeacms/volto-freshwater/actions/boards';
import {
  useCopyToClipboard,
  deStringifySearchquery,
} from '@eeacms/volto-freshwater/utils';
import ToggleButton from './FavToggleStatusButton';

import backSVG from '@plone/volto/icons/back.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import moreSVG from '@plone/volto/icons/more.svg';
import './style.less';

const CATALOGUE_CONTENT_TYPES = [
  'dashboard',
  'dataset',
  'database',
  'report_publication',
  'indicator',
  'briefing',
  'map_interactive',
];

const ListingViewHeader = (props) => {
  const {
    userId,
    groupedItems,
    paramOwner,
    paramGroup,
    setConfirmOpen,
  } = props;
  const item = groupedItems[paramOwner][paramGroup][0];

  const [copyUrlStatus, copyUrl] = useCopyToClipboard(window.location.href);
  const [confirmationText, setConfirmationText] = useState(false);

  React.useEffect(() => {
    if (copyUrlStatus === 'copied') {
      setConfirmationText('Copied to clipboard');
    } else if (copyUrlStatus === 'failed') {
      setConfirmationText('Copy failed. Please try again.');
    }
  }, [copyUrlStatus]);

  return (
    <div>
      <div className="board-view-header">
        <h1 className="board-title">{item.group}</h1>

        {copyUrlStatus === 'copied' && (
          <div className="copy-box">{confirmationText}</div>
        )}

        {paramOwner === userId && (
          <div className="header-tools">
            <ToggleButton
              groupedItems={groupedItems}
              paramOwner={paramOwner}
              paramGroup={paramGroup}
            />

            <Popup
              basic
              className="more-board-popup"
              position="bottom right"
              on="click"
              trigger={
                <Button icon basic className="delete-fav-btn">
                  <Icon name={moreSVG} size="25px" />
                </Button>
              }
            >
              <Popup.Content>
                <List divided relaxed>
                  <List.Item>
                    <List.Content>
                      <div
                        role="presentation"
                        onClick={() => {
                          setConfirmOpen(true);
                        }}
                        onKeyDown={() => {
                          setConfirmOpen(true);
                        }}
                      >
                        <Icon name={deleteSVG} size="16px" />
                        <span>Delete board</span>
                      </div>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <div
                        role="presentation"
                        onClick={copyUrl}
                        onKeyDown={copyUrl}
                      >
                        <Icon name={linkSVG} size="16px" />
                        <span>Copy board URL</span>
                      </div>
                    </List.Content>
                  </List.Item>
                </List>
              </Popup.Content>
            </Popup>
          </div>
        )}
      </div>

      {paramOwner !== userId && (
        <span className="createdBy">Created by {paramOwner} </span>
      )}
    </div>
  );
};

const ListingView = (props) => {
  const {
    groupedItems,
    setOpenModal,
    setSelectedItem,
    userId,
    paramOwner,
    paramGroup,
    dispatch,
  } = props;

  const [confirmOpen, setConfirmOpen] = useState(false);

  return Object.keys(groupedItems).map((username, i) => {
    return (
      <div key={i}>
        <ListingViewHeader
          groupedItems={groupedItems}
          userId={userId}
          paramOwner={paramOwner}
          paramGroup={paramGroup}
          setConfirmOpen={setConfirmOpen}
        />

        {Object.keys(groupedItems[username])
          .sort()
          .map((group, index) => {
            return (
              <div className="fav-listing-board" key={index}>
                <List key={index}>
                  {groupedItems[username][group].map((item, index) => (
                    <List.Item key={index}>
                      <List.Content>
                        {CATALOGUE_CONTENT_TYPES.includes(item['@type']) ? (
                          <div
                            className="listing-title"
                            onClick={() => {
                              setOpenModal(true);
                              setSelectedItem(item.payload.data);
                            }}
                            onKeyDown={() => setSelectedItem(item.payload.data)}
                            role="button"
                            tabIndex="0"
                          >
                            {item.title}
                          </div>
                        ) : (
                          <Link
                            className="listing-title"
                            to={`${
                              flattenToAppURL(item['@id']) +
                              '#' +
                              deStringifySearchquery(item.queryparams)
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.title}
                          </Link>
                        )}

                        <FavItemToolbar
                          {...props}
                          userId={userId}
                          paramOwner={paramOwner}
                          item={item}
                          groupedItems={groupedItems[username][group]}
                        />
                      </List.Content>
                    </List.Item>
                  ))}
                </List>

                <FavBoardComments
                  {...props}
                  board={group}
                  groupedItems={groupedItems[username][group]}
                />

                <Confirm
                  className="delete-item-modal"
                  open={confirmOpen}
                  onCancel={() => setConfirmOpen(false)}
                  confirmButton="Delete board"
                  cancelButton="No, keep the board"
                  content={
                    'This operation cannot be undone. Are you sure you want to delete this board?'
                  }
                  onConfirm={() => {
                    for (let item of groupedItems[username][group]) {
                      dispatch(
                        deleteBookmark(
                          item.uid,
                          item.group,
                          item.queryparams || '',
                        ),
                      );
                    }
                    props.history.push('/boards');
                    window.location.reload();
                  }}
                />
              </div>
            );
          })}
      </div>
    );
  });
};

const FavBoardView = (props) => {
  const { userId, token, items, boardsDelete } = props;
  const dispatch = useDispatch();
  const urlParams = queryString.parse(props.location.search);
  const paramOwner = urlParams ? urlParams['user'] : '';
  const paramGroup = urlParams ? urlParams['board'] : '';
  const [groupedItems, setGroupedItems] = useState({});
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const status = groupedItems?.[paramOwner]?.[paramGroup]?.[0]?.payload.status;

  useEffect(() => {
    if (boardsDelete === 'loaded') {
      dispatch(getAllBookmarks(paramOwner));
    }
  }, [paramOwner, boardsDelete, dispatch]);

  // filter the bookmarks by parameters from url
  // and group them by group
  useEffect(() => {
    const favItems = groupBy(items, (item) => item['owner']);

    Object.keys(favItems).forEach((item) => {
      if (paramOwner && item !== paramOwner) {
        return false;
      }
      const items = favItems[item].filter(
        (item) => item.group === paramGroup && item.owner === paramOwner,
      );
      const byGroups = groupBy(items, (item) => item['group']);

      setGroupedItems({ [item]: byGroups });
    });
  }, [items, paramOwner, paramGroup, userId]);

  const closeModal = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const showList =
    paramOwner === userId || (paramOwner !== userId && status === 'public');

  return (
    <div className="favorites-listing ui container">
      <BodyClass className="board-view" />
      {token && showList ? (
        <>
          <h3 className="board-upper-title">Board</h3>
          <ListingView
            {...props}
            userId={userId}
            paramOwner={paramOwner}
            paramGroup={paramGroup}
            groupedItems={groupedItems}
            setOpenModal={setOpenModal}
            setSelectedItem={setSelectedItem}
            dispatch={dispatch}
          />

          <Modal
            className="item-metadata-modal"
            open={isOpenModal}
            onClose={closeModal}
            size="large"
            closeIcon
            centered
          >
            <Modal.Header>
              <ItemMetadataSnippet item={selectedItem} />
              <ItemTitle item={selectedItem} />
            </Modal.Header>

            <Modal.Content>
              <ItemMetadata
                item={selectedItem}
                mapPreview={true}
                shareItem={true}
              />
            </Modal.Content>
          </Modal>
        </>
      ) : (
        <p>This board is private.</p>
      )}

      {__CLIENT__ && token && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            inner={
              <Link className="item" to="/boards">
                <Icon name={backSVG} size="30px" className="contents circled" />
              </Link>
            }
          />
        </Portal>
      )}
    </div>
  );
};

export default compose(
  connect((state) => ({
    token: state.userSession.token,
    userId: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
    items: state.boards?.items || [],
    boardsDelete: state.boards?.delete || {},
  })),
)(FavBoardView);
