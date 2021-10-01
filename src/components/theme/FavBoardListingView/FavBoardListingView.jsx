import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { groupBy } from 'lodash';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Toolbar } from '@plone/volto/components';
import ToggleButton from './FavToggleStatusButton';
import { getAllBookmarks } from '@eeacms/volto-freshwater/actions/favBoards';
import './style.less';

const ListingView = (props) => {
  const { showToggle, groupedItems } = props;

  return Object.keys(groupedItems).map((username) => {
    return (
      <div>
        {groupedItems[username].sort().map((group, index) => {
          return (
            <div className="fav-listing-board" key={index}>
              <div className="fav-listing-board-grouptitle">
                <div className="fav-listing-board" key={index}>
                  <Link
                    to={`${props.location.pathname}/board?user=${username}&group=${group.board}&status=${group.status}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>
                      {group.board}
                      <sup>{username}</sup>
                    </h3>
                  </Link>
                </div>
                {showToggle && <ToggleButton groupedItems={group} />}
              </div>
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

  const items = useSelector((state) => state.favBoards?.items || []);
  const bookmarkdelete = useSelector((state) => state.favBoards?.delete || {});

  const [myGroupedItems, setMyGroupedItems] = useState({});
  const [otherPublicGroupedItems, setOtherPublicGroupedItems] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmarkdelete === 'loaded') {
      dispatch(getAllBookmarks());
    }
  }, [bookmarkdelete, dispatch]);

  useEffect(() => {
    const groupedItems = groupBy(items, (item) => item['owner']);

    Object.keys(groupedItems).forEach((username) => {
      const items = groupedItems[username].filter((item) => {
        if (username !== userID && item.payload?.status === 'private') {
          return false;
        }
        return true;
      });

      const byGroups = groupBy(items, (item) => item['group']);

      const byBoards = [];
      Object.keys(byGroups).forEach((group, i) => {
        const board = {
          board: group,
          items: [...byGroups[group]],
          status: byGroups[group][0].payload.status,
        };
        byBoards.push(board);
      });

      if (username === userID) {
        setMyGroupedItems({ [username]: byBoards });
      } else {
        setOtherPublicGroupedItems({ [username]: byBoards });
      }
    });
  }, [dispatch, items, userID]);

  // console.log('myGroupedItems', myGroupedItems);
  // console.log('otherPublicGroupedItems', otherPublicGroupedItems);

  return (
    <div className="favorites-listing ui container">
      <h2>My bookmarks:</h2>
      <ListingView {...props} showToggle={true} groupedItems={myGroupedItems} />

      <h2>Other public bookmarks:</h2>
      <ListingView
        {...props}
        showToggle={false}
        groupedItems={otherPublicGroupedItems}
      />

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
