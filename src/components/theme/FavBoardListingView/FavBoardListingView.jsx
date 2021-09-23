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
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
  FavBoardComments,
  FavItemToolbar,
} from '@eeacms/volto-freshwater/components';
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

const getAllBookmarks = (owner) => {
  return {
    type: 'GET_BOOKMARKS',
    request: {
      op: 'get',
      path: `/@bookmarks-all` + (owner ? `?owner=${owner}` : ``),
    },
  };
};

const ListingView = (props) => {
  const groupedItems = props.groupedItems;

  return Object.keys(groupedItems).map((username) => {
    return (
      <div>
        {Object.keys(groupedItems[username])
          .sort()
          .map((group, index) => {
            return (
              <div className="fav-listing-board" key={index}>
                <h3>
                  {group} by {username}
                </h3>
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
                            to={`${flattenToAppURL(item['@id'])}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h4>{item.title}</h4>
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

  const items = useSelector((state) => state.collectivebookmarks?.items || []);
  const bookmarkdelete = useSelector(
    (state) => state.collectivebookmarks?.delete || {},
  );

  let myGroupedItems = {};
  let otherPublicGroupedItems = {};

  // filter the bookmarks by parameters from url
  // and group them by group
  Object.keys(groupedItems).map((username) => {
    if (paramOwner && username !== paramOwner) {
      return false;
    }

    const items = groupedItems[username].map((item) => {
      if (paramUID && item.uid !== paramUID) {
        return;
      }
      if (paramGroup && item.group !== paramGroup) {
        return;
      }
      return item;
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
  console.log('myGroupedItems', myGroupedItems);
  console.log('otherPublicGroupedItems', otherPublicGroupedItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmarkdelete === 'loaded') {
      dispatch(getAllBookmarks(paramOwner));
    }
  }, [bookmarkdelete, dispatch]);

  useEffect(() => {
    const favItems = groupBy(items, (item) => item['owner']);
    Object.keys(favItems).forEach((item) => {
      favItems[item] = sortBy(favItems[item], [
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

  return (
    <div className="favorites-listing ui container">
      <h1>My bookmarks</h1>
      <ListingView groupedItems={myGroupedItems} />
      <h1>Other public bookmarks</h1>
      <ListingView groupedItems={otherPublicGroupedItems} />

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
