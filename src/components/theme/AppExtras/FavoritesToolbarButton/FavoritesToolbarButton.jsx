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
} from '@collective/volto-bookmarks/actions';
import { groupBy, sortBy } from 'lodash';
import { removeItemFromBasket } from '@eeacms/volto-freshwater/actions/favBoard';
import briefcaseSVG from '@plone/volto/icons/briefcase.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import starSVG from '@plone/volto/icons/star.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import cx from 'classnames';
import './style.less';

const FavoritesToolbarButton = (props) => {
  const { basket } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [activeGroup, setActiveGroup] = useState('');
  const [boardTitle, setBoardTitle] = useState('Default');
  const [groups, setGroups] = useState({});
  const items = useSelector((state) => state.collectivebookmarks?.items || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookmarks());
  }, [dispatch]);

  useEffect(() => {
    if (basket && basket.length > 0) {
      setActiveGroup('');
    }
  }, [basket]);

  useEffect(() => {
    const groups = groupBy(items, (item) => item['group']);
    Object.keys(groups).forEach((item) => {
      groups[item] = sortBy(groups[item], [
        function (o) {
          return o.title.toLowerCase();
        },
      ]);
    });
    setGroups(groups);
  }, [dispatch, items]);

  const handleCreateBoard = () => {
    for (let item of basket) {
      dispatch(addBookmark(item.UID, boardTitle));
      setTimeout(() => dispatch(removeItemFromBasket(item)), 2500);
      setBoardTitle('Default');
    }
  };

  const handleSaveToBoard = (group) => {
    for (let item of basket) {
      dispatch(addBookmark(item.UID, group));
      setTimeout(() => dispatch(removeItemFromBasket(item)), 2500);
    }
  };

  return (
    <div>
      <Portal node={__CLIENT__ && document.querySelector('.toolbar-bottom')}>
        <div className="fav-toolbar-menu">
          <Button
            className="fav-toolbar-btn"
            onClick={() => setShowMenu(!showMenu)}
            title="Favorites"
          >
            <Icon name={briefcaseSVG} size="35px" />
          </Button>

          {showMenu ? (
            <div className="fav-menu pastanaga-menu">
              <header>
                <h2>Save to board</h2>
              </header>
              <div className="fav-menu-content">
                {basket && basket.length > 0 ? (
                  <>
                    <div className="toolbar-menu-title">Selected items: </div>
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
                            onClick={() => dispatch(removeItemFromBasket(item))}
                          >
                            <Icon name={clearSVG} size="20px" />
                          </Button>
                        </li>
                      ))}
                    </ul>

                    {items && items.length > 0 && (
                      <div className="fav-boards-list">
                        <div className="toolbar-menu-title">
                          Save to an existing board:
                        </div>

                        {Object.entries(groups)
                          .sort()
                          .map(([group, items], index) => {
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
                                {group} ({items.length})
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
                    )}

                    <div className="fav-group-title">
                      <div className="toolbar-menu-title">
                        Create new board:
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
                      <Button
                        primary
                        size="mini"
                        className="fav-board-save"
                        onClick={handleCreateBoard}
                      >
                        Save
                      </Button>
                    </div>
                  </>
                ) : (
                  <span className="fav-menu-info">
                    There are no selected items to save in a board.
                  </span>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </Portal>
    </div>
  );
};

export default compose(
  connect(
    (state) => ({
      basket: state.favBoard.basket,
    }),
    { removeItemFromBasket },
  ),
)(FavoritesToolbarButton);
