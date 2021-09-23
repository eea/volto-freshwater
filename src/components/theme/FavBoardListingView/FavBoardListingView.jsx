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
// import { getAllBookmarks } from '@collective/volto-bookmarks/actions';
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

const FavBoardListingView = (props) => {
  const urlParams = queryString.parse(props.location.search);
  const paramOwner = urlParams ? urlParams['user'] : null;
  const paramGroup = urlParams ? urlParams['group'] : null;
  const paramUID = urlParams ? urlParams['uid'] : null;

  const items = useSelector((state) => state.collectivebookmarks?.items || []);
  const bookmarkdelete = useSelector(
    (state) => state.collectivebookmarks?.delete || {},
  );
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [groupedItems, setGroupedItems] = useState({});
  const filteredGroupedItems = {};
  Object.keys(groupedItems).map((group) => {
    if (paramGroup && group !== paramGroup) {
      return false;
    }
    const items = groupedItems[group].filter((item) => {
      if (paramUID && item.uid !== paramUID) {
        return false;
      }
      if (paramOwner && item.owner !== paramOwner) {
        return false;
      }

      return true;
    });

    filteredGroupedItems[group] = items;
  });
  console.log('filteredGroupedItems', filteredGroupedItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmarkdelete === 'loaded') {
      dispatch(getAllBookmarks(paramOwner));
    }
  }, [bookmarkdelete, dispatch]);

  useEffect(() => {
    const favItems = groupBy(items, (item) => item['group']);
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
      {Object.keys(filteredGroupedItems)
        .sort()
        .map((group, index) => {
          return (
            <div className="fav-listing-board" key={index}>
              <h3>{group}</h3>
              <List key={index}>
                {filteredGroupedItems[group].map((item, index) => (
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
