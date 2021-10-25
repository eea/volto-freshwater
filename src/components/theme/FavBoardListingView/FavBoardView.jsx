import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { groupBy } from 'lodash';
import queryString from 'query-string';
import { flattenToAppURL } from '@plone/volto/helpers';
import { List, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Toolbar, Icon } from '@plone/volto/components';
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
import backSVG from '@plone/volto/icons/back.svg';
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
  const { groupedItems, setOpenModal, setSelectedItem, userID } = props;

  return Object.keys(groupedItems).map((username, i) => {
    return (
      <div key={i}>
        {Object.keys(groupedItems[username])
          .sort()
          .map((group, index) => {
            return (
              <div className="fav-listing-board" key={index}>
                <h1 className="board-title">{group}</h1>
                {username !== userID && (
                  <span className="createdBy">Created by {username} </span>
                )}
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
  const items = useSelector((state) => state.favBoards?.items || []);
  const bookmarkdelete = useSelector((state) => state.favBoards?.delete || {});
  const dispatch = useDispatch();

  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [groupedItems, setGroupedItems] = useState({});

  const urlParams = queryString.parse(props.location.search);
  const paramOwner = urlParams ? urlParams['user'] : '';
  const paramGroup = urlParams ? urlParams['group'] : '';
  const paramStatus = urlParams ? urlParams['status'] : '';

  useEffect(() => {
    if (bookmarkdelete === 'loaded') {
      dispatch(getAllBookmarks(paramOwner));
    }
  }, [paramOwner, bookmarkdelete, dispatch]);

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
  }, [items, paramOwner, paramGroup, userID]);

  const closeModal = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const showList =
    paramOwner === userID ||
    (paramOwner !== userID && paramStatus === 'public');

  return (
    <div className="favorites-listing ui container">
      <h3 className="board-upper-title">Board</h3>
      {showList ? (
        <>
          <ListingView
            {...props}
            userID={userID}
            paramOwner={paramOwner}
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
        </>
      ) : (
        <p>This board is private.</p>
      )}

      {__CLIENT__ && props.token && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            inner={
              <>
                <Link className="item" to="/favorites">
                  <Icon
                    name={backSVG}
                    size="30px"
                    className="contents circled"
                  />
                </Link>
              </>
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
  })),
)(FavBoardView);
