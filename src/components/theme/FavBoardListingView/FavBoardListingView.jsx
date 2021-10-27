import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { groupBy } from 'lodash';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Toolbar, Icon } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { Tab, Menu, Button } from 'semantic-ui-react';
import { getAllBookmarks } from '@eeacms/volto-freshwater/actions/favBoards';
import backSVG from '@plone/volto/icons/back.svg';
import starSVG from '@plone/volto/icons/half-star.svg';
import './style.less';

const ListingView = (props) => {
  const { groupedItems, userId } = props;

  return Object.keys(groupedItems).map((username) => {
    return (
      <div>
        {groupedItems[username].sort().map((group, index) => {
          return (
            <div className="fav-listing-board" key={index}>
              <Link
                className="fav-board-link"
                to={`${props.location.pathname}/boardview?user=${username}&board=${group.board}`}
              >
                <div className="fav-listing-board-item" key={index}>
                  <span>
                    {group.board}
                    {username !== userId && <span> by {username} </span>}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  });
};

const FavBoardListingView = (props) => {
  const { userId, token, items, boardsDelete } = props;
  const dispatch = useDispatch();

  const [myGroupedItems, setMyGroupedItems] = useState({});
  const [otherPublicGroupedItems, setOtherPublicGroupedItems] = useState({});

  useEffect(() => {
    if (boardsDelete === 'loaded') {
      dispatch(getAllBookmarks());
    }
  }, [boardsDelete, dispatch]);

  useEffect(() => {
    const groupedItems = groupBy(items, (item) => item['owner']);

    Object.keys(groupedItems).forEach((username) => {
      const items = groupedItems[username].filter((item) => {
        if (username !== userId && item.payload?.status === 'private') {
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

      if (username === userId) {
        setMyGroupedItems({ [username]: byBoards });
      } else {
        if (byBoards.length > 0)
          setOtherPublicGroupedItems({ [username]: byBoards });
      }
    });
  }, [dispatch, items, userId]);

  const panes = [
    {
      menuItem: (
        <Menu.Item key="my-boards">
          <h4>My boards</h4>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          {Object.keys(myGroupedItems).length > 0 ? (
            <ListingView
              {...props}
              userId={userId}
              groupedItems={myGroupedItems}
            />
          ) : (
            <div className="no-boards-info">
              You don't have any boards. You find the
              <span className="star-icon">
                <Icon name={starSVG} size="20px" />
              </span>
              button on every page to create boards.
            </div>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="other-boards">
          <h4>All public boards</h4>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          {Object.keys(otherPublicGroupedItems).length > 0 ? (
            <ListingView
              {...props}
              userId={userId}
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
      <BodyClass className="boards-listing-view" />
      <Tab menu={{ secondary: true, fluid: true }} panes={panes} />

      {__CLIENT__ && token && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            inner={
              <Button className="item" onClick={() => props.history.goBack()}>
                <Icon name={backSVG} size="30px" className="contents circled" />
              </Button>
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
    content: state.content,
    userId: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
    items: state.favBoards?.items || [],
    boardsDelete: state.favBoards?.delete || {},
  })),
)(FavBoardListingView);
