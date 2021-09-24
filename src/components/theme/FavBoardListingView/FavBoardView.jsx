import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupBy } from 'lodash';
import queryString from 'query-string';
import { flattenToAppURL } from '@plone/volto/helpers';
import { List, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Toolbar } from '@plone/volto/components';
import jwtDecode from 'jwt-decode';
import { deStringifySearchquery } from '@collective/volto-bookmarks/helpers';
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
  const { groupedItems, setOpenModal, setSelectedItem } = props;

  return Object.keys(groupedItems).map((username, i) => {
    return (
      <div key={i}>
        {Object.keys(groupedItems[username])
          .sort()
          .map((group, index) => {
            return (
              <div className="fav-listing-board" key={index}>
                <h1>
                  {group} by {username}
                </h1>
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

const FavBoardView = (props) => {
  const userSession = useSelector((state) => state.userSession);
  const userID = userSession.token ? jwtDecode(userSession.token).sub : '';
  const items = useSelector((state) => state.collectivebookmarks?.items || []);
  const bookmarkdelete = useSelector(
    (state) => state.collectivebookmarks?.delete || {},
  );
  const dispatch = useDispatch();

  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [groupedItems, setGroupedItems] = useState({});

  const urlParams = queryString.parse(props.location.search);
  const paramOwner = urlParams ? urlParams['user'] : '';
  const paramGroup = urlParams ? urlParams['group'] : '';
  // const paramUID = urlParams ? urlParams['uid'] : '';

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

      if (item === userID) {
        favItems[item] = byGroups;
      }
    });

    setGroupedItems(favItems);
  }, [items, paramOwner, paramGroup, userID]);

  useEffect(() => {
    if (bookmarkdelete === 'loaded') {
      dispatch(getAllBookmarks(paramOwner));
    }
  }, [paramOwner, bookmarkdelete, dispatch]);

  const closeModal = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="favorites-listing ui container">
      <h3 className="boards-title">Board</h3>
      <ListingView
        {...props}
        groupedItems={groupedItems}
        setOpenModal={setOpenModal}
        setSelectedItem={setSelectedItem}
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

export default FavBoardView;
