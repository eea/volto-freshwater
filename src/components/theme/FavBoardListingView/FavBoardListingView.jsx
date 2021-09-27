import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { groupBy, sortBy } from 'lodash';
import queryString from 'query-string';
import { flattenToAppURL } from '@plone/volto/helpers';
import { List, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Toolbar } from '@plone/volto/components';
import jwtDecode from 'jwt-decode';
import { deStringifySearchquery } from '@eeacms/volto-freshwater/utils';
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
  FavBoardComments,
  FavItemToolbar,
} from '@eeacms/volto-freshwater/components';
import { getAllBookmarks } from '@eeacms/volto-freshwater/actions/favBoards';
import ToggleButton from './FavToggleStatusButton';
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

const ListingView = (props) => {
  const { showToggle, groupedItems } = props;

  return Object.keys(groupedItems).map((username) => {
    return (
      <div>
        {Object.keys(groupedItems[username])
          .sort()
          .map((group, index) => {
            return (
              <div className="fav-listing-board" key={index}>
                <div className="fav-listing-board-grouptitle">
                  <h3>
                    {group} <sup>{username}</sup>
                  </h3>
                  {showToggle && (
                    <ToggleButton
                      groupedItems={groupedItems[username][group]}
                    />
                  )}
                </div>
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

                        <FavItemToolbar item={item} />
                      </List.Content>
                    </List.Item>
                  ))}
                </List>

                <FavBoardComments board={group} />
              </div>
            );
          })}
      </div>
    );
  });
};

const FavBoardListingView = (props) => {
  const userSession = useSelector((state) => state.userSession);
  const userID = userSession.token ? jwtDecode(userSession.token).sub : '';

  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [groupedItems, setGroupedItems] = useState({});

  const urlParams = queryString.parse(props.location.search);
  const paramOwner = urlParams ? urlParams['user'] : '';
  const paramGroup = urlParams ? urlParams['group'] : '';
  const paramUID = urlParams ? urlParams['uid'] : '';

  const items = useSelector((state) => state.favBoards?.items || []);
  const bookmarkdelete = useSelector((state) => state.favBoards?.delete || {});

  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmarkdelete === 'loaded') {
      dispatch(getAllBookmarks(paramOwner));
    }
  }, [paramOwner, bookmarkdelete, dispatch]);

  useEffect(() => {
    const favItems = groupBy(items, (item) => item['owner']);
    Object.keys(favItems).forEach((username) => {
      favItems[username] = sortBy(favItems[username], [
        function (o) {
          return o.title.toLowerCase();
        },
      ]);
    });
    setGroupedItems(favItems);
  }, [dispatch, items]);

  const closeModal = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  let myGroupedItems = {};
  let otherPublicGroupedItems = {};

  // filter the bookmarks by parameters from url
  // and group them by group
  Object.keys(groupedItems).map((username) => {
    if (paramOwner && username !== paramOwner) {
      return;
    }

    const items = groupedItems[username].filter((item) => {
      if (paramUID && item.uid !== paramUID) {
        return false;
      }
      if (paramGroup && item.group !== paramGroup) {
        return false;
      }
      if (username !== userID && item.payload?.status === 'private') {
        return;
      }

      return true;
    });

    const byGroups = groupBy(items, (item) => item['group']);
    Object.keys(byGroups).forEach((item) => {
      byGroups[item] = sortBy(byGroups[item], [
        function (o) {
          return o.title.toLowerCase();
        },
      ]);
    });

    if (username === userID) {
      myGroupedItems[username] = byGroups;
    } else {
      otherPublicGroupedItems[username] = byGroups;
    }
  });

  // console.log('userID', userID);
  console.log('myGroupedItems', myGroupedItems);
  console.log('otherPublicGroupedItems', otherPublicGroupedItems);

  return (
    <div className="favorites-listing ui container">
      <h1>My bookmarks</h1>
      <ListingView showToggle={true} groupedItems={myGroupedItems} />
      <h1>Other public bookmarks</h1>
      <ListingView showToggle={false} groupedItems={otherPublicGroupedItems} />

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
          <ItemMetadata item={selectedItem} />
        </Modal.Content>
      </Modal>

      {__CLIENT__ && props.token && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar inner={<span />} />
        </Portal>
      )}
    </div>
  );
};

export default compose(
  connect((state) => ({
    token: state.userSession.token,
  })),
)(FavBoardListingView);
