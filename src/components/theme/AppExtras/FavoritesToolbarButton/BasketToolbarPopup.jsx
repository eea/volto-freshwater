import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Grid, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { groupBy } from 'lodash';
import jwtDecode from 'jwt-decode';
import {
  addBookmark,
  getAllBookmarks,
} from '@eeacms/volto-freshwater/actions/favBoards';
import { removeItemFromBasket } from '@eeacms/volto-freshwater/actions/favBasket';

import clearSVG from '@plone/volto/icons/clear.svg';
import starSVG from '@plone/volto/icons/star.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import cx from 'classnames';
import './style.less';

const BasketToolbarPopup = (props) => {
  const { basket } = props;
  const items = useSelector((state) => state.favBoards?.items || []);
  const userSession = useSelector((state) => state.userSession);
  const userID = userSession.token ? jwtDecode(userSession.token).sub : '';

  const [activeGroup, setActiveGroup] = useState('');
  const [boardTitle, setBoardTitle] = useState('Default');
  const [boardCreated, setBoardCreated] = useState(false);
  const [groupedItems, setGroupedItems] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookmarks(userID));
  }, [dispatch, userID]);

  useEffect(() => {
    if (basket && basket.length > 0) setActiveGroup('');
  }, [basket]);

  useEffect(() => {
    const favItems = groupBy(items, (item) => item['owner']);

    Object.keys(favItems).forEach((item) => {
      if (item !== userID) {
        return false;
      }
      const items = favItems[item].filter((item) => item.owner === userID);
      const byGroups = groupBy(items, (item) => item['group']);
      setGroupedItems({ [item]: byGroups });
    });
  }, [items, userID]);

  const handleCreateBoard = () => {
    for (let item of basket) {
      dispatch(
        addBookmark(item.UID, boardTitle, item.hash || '', {
          status: 'private',
          data: item,
        }),
      );
      dispatch(removeItemFromBasket(item));
      setBoardCreated(true);
      setBoardTitle('Default');
    }
  };

  const handleSaveToBoard = (group) => {
    for (let item of basket) {
      dispatch(
        addBookmark(item.UID, group, item.hash || '', {
          status: 'private',
          data: item,
        }),
      );
      setActiveGroup('');
      setTimeout(() => setActiveGroup(''), 2000);
      dispatch(removeItemFromBasket(item));
    }
  };

  return (
    <div className="fav-menu pastanaga-menu">
      <header>
        <h2>Favorite boards</h2>
      </header>
      <div className="fav-menu-content">
        <div className="toolbar-menu-title">Selected items: </div>
        <>
          {basket && basket.length > 0 ? (
            <ul className="fav-menu-listing">
              {basket.map((item, i) => (
                <li
                  className="fav-menu-list-item"
                  key={item['@id']}
                  title={item.title}
                >
                  <span className="fav-item-title">{item.title}</span>
                  <Button
                    className="remove-pin-btn"
                    title="Remove favorite"
                    onClick={() => {
                      dispatch(removeItemFromBasket(item));
                    }}
                  >
                    <Icon name={clearSVG} size="20px" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <span className="fav-menu-info">
              No selected items to save in a board.
            </span>
          )}

          {groupedItems && Object.keys(groupedItems).length > 0 && (
            <div className="fav-boards-list">
              <div className="toolbar-menu-title">
                Save to an existing board:
              </div>

              {Object.keys(groupedItems).map((user) => {
                return (
                  <ul>
                    {Object.keys(groupedItems[user])
                      .sort()
                      .map((group, index) => {
                        return (
                          <li
                            role="presentation"
                            key={index}
                            className={cx('board-item', {
                              active: activeGroup === group,
                            })}
                            onClick={() => {
                              if (basket && basket.length > 0) {
                                handleSaveToBoard(group);
                                setActiveGroup(group);
                              }
                            }}
                            onKeyDown={() => {
                              if (basket && basket.length > 0) {
                                handleSaveToBoard(group);
                                setActiveGroup(group);
                              }
                            }}
                          >
                            <div className="boards-wrapper">
                              <Icon name={starSVG} size="16px" />
                              {group} ({groupedItems[user][group].length})
                              {activeGroup === group && (
                                <Icon
                                  className="check-icon"
                                  name={checkSVG}
                                  size="16px"
                                />
                              )}
                            </div>
                            <div className="add-btn-wrapper">
                              <div className="add-btn">Save</div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                );
              })}
            </div>
          )}

          <div className="fav-group-title">
            <div className="toolbar-menu-title">Create a new board:</div>

            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                  <label htmlFor="field-title">Board Name</label>
                </Grid.Column>

                <Grid.Column width={9}>
                  <div className="ui input">
                    <input
                      id="field-title"
                      name="title"
                      type="text"
                      value={boardTitle}
                      onChange={(e) => setBoardTitle(e.target.value)}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {boardCreated && (
              <p className="board-created-info">Board created.</p>
            )}

            <Button
              primary
              size="mini"
              className="fav-board-save"
              disabled={basket.length === 0}
              onClick={handleCreateBoard}
            >
              Create
            </Button>
          </div>
        </>
      </div>
    </div>
  );
};

export default compose(
  connect(
    (state) => ({
      basket: state.favBasket.basket,
    }),
    { removeItemFromBasket },
  ),
)(BasketToolbarPopup);
