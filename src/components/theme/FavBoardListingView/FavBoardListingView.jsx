import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { groupBy } from 'lodash';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Toolbar } from '@plone/volto/components';
import ToggleButton from './FavToggleStatusButton';
import { Tab, Menu } from 'semantic-ui-react';
import { getAllBookmarks } from '@eeacms/volto-freshwater/actions/favBoards';
import './style.less';

const ListingView = (props) => {
  const { showToggle, groupedItems, userID } = props;

  return Object.keys(groupedItems).map((username) => {
    return (
      <div>
        {groupedItems[username].sort().map((group, index) => {
          return (
            <div className="fav-listing-board" key={index}>
              <div className="fav-listing-board-item" key={index}>
                <Link
                  className="fav-board-link"
                  to={`${props.location.pathname}/board?user=${username}&group=${group.board}&status=${group.status}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    {group.board}
                    {username !== userID && <span> by {username} </span>}
                  </span>
                </Link>
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
        if (byBoards.length > 0)
          setOtherPublicGroupedItems({ [username]: byBoards });
      }
    });
  }, [dispatch, items, userID]);

  const panes = [
    {
      menuItem: (
        <Menu.Item key="my-boards">
          <h4>My boards</h4>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <ListingView
            {...props}
            userID={userID}
            showToggle={true}
            groupedItems={myGroupedItems}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="other-boards">
          <h4>Other public boards</h4>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          {Object.keys(otherPublicGroupedItems).length > 0 ? (
            <ListingView
              {...props}
              userID={userID}
              showToggle={false}
              groupedItems={otherPublicGroupedItems}
            />
          ) : (
            <span>There are no public boards at the moment.</span>
          )}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="favorites-listing ui container">
      <Tab menu={{ secondary: true, fluid: true }} panes={panes} />

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
