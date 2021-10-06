import React, { useState, useEffect } from 'react';
import { Portal } from 'react-portal';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Grid } from 'semantic-ui-react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import {
  addBookmark,
  getAllBookmarks,
} from '@eeacms/volto-freshwater/actions/favBoards';
import { groupBy } from 'lodash';
import { removeItemFromBasket } from '@eeacms/volto-freshwater/actions/favBasket';
import clearSVG from '@plone/volto/icons/clear.svg';
import starSVG from '@plone/volto/icons/star.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import basketSVG from '@eeacms/volto-freshwater/icons/basket.svg';
import cx from 'classnames';
import jwtDecode from 'jwt-decode';
import './style.less';

const BasketToolbarButton = (props) => {
  const { basket } = props;
  const items = useSelector((state) => state.favBoards?.items || []);
  const userSession = useSelector((state) => state.userSession);
  const userID = userSession.token ? jwtDecode(userSession.token).sub : '';

  const [showMenu, setShowMenu] = useState(false);
  const [activeGroup, setActiveGroup] = useState('');
  const [boardTitle, setBoardTitle] = useState('Default');
  const [boardCreated, setBoardCreated] = useState(false);
  const [groupedItems, setGroupedItems] = useState({});

  const menuRef = React.useRef(null);
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

  useEffect(() => {
    const outsideClick = (e) => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
        setBoardCreated(false);
      }
    };
    document.addEventListener('mousedown', outsideClick);
    return () => {
      document.removeEventListener('mousedown', outsideClick);
    };
  }, [showMenu]);

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
      dispatch(removeItemFromBasket(item));
      setTimeout(() => setActiveGroup(''), 2000);
    }
  };

  return (
    <div>
      {basket && basket.length > 0 && (
        <Portal node={__CLIENT__ && document.querySelector('.toolbar-bottom')}>
          <div className="fav-toolbar-menu" ref={menuRef}>
            <Button
              className="basket-toolbar-btn"
              onClick={() => {
                setShowMenu(!showMenu);
                setBoardCreated(false);
              }}
              title="Save to board"
            >
              <div className="basket-count">
                <span>{basket.length}</span>
              </div>

              <Icon name={basketSVG} size="36px" />
            </Button>

            {showMenu ? (
              <div className="fav-menu pastanaga-menu">
                <header>
                  <h2>Save to board</h2>
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
                            <div>
                              {Object.keys(groupedItems[user])
                                .sort()
                                .map((group, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className={cx('board-item', {
                                        active: activeGroup === group,
                                      })}
                                      onClick={() => {
                                        handleSaveToBoard(group);
                                        setActiveGroup(group);
                                      }}
                                      onKeyDown={() => {
                                        handleSaveToBoard(group);
                                        setActiveGroup(group);
                                      }}
                                      role="button"
                                      tabIndex="0"
                                    >
                                      <Icon name={starSVG} size="16px" />
                                      {group} (
                                      {groupedItems[user][group].length})
                                      {activeGroup === group && (
                                        <Icon
                                          className="check-icon"
                                          name={checkSVG}
                                          size="16px"
                                        />
                                      )}
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="fav-group-title">
                      <div className="toolbar-menu-title">
                        Create a new board:
                      </div>

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
                        // disabled={basket.length === 0}
                        onClick={handleCreateBoard}
                      >
                        Create
                      </Button>
                    </div>
                  </>
                </div>
              </div>
            ) : null}
          </div>
        </Portal>
      )}
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
)(BasketToolbarButton);
