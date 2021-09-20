import React from 'react';
import { Portal } from 'react-portal';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Grid } from 'semantic-ui-react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { addBookmark } from '@collective/volto-bookmarks/actions';
import { removeItemFromBasket } from '@eeacms/volto-freshwater/actions/favBoard';
import briefcaseSVG from '@plone/volto/icons/briefcase.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import './style.less';

const FavoritesToolbarButton = (props) => {
  const { basket } = props;
  const [showMenu, setShowMenu] = React.useState(false);
  const [boardTitle, setBoardTitle] = React.useState('Default');
  const dispatch = useDispatch();

  const handleSaveBoard = () => {
    for (let item of basket) {
      dispatch(addBookmark(item.UID, boardTitle));
      dispatch(removeItemFromBasket(item));
      setBoardTitle('Default');
    }
  };

  return (
    <div>
      {basket && basket.length > 0 && (
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
                  <h2>Create a new favorites board</h2>
                </header>
                <div className="fav-menu-content">
                  <div className="fav-group-title">
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
                  </div>

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

                  <Button
                    primary
                    size="small"
                    className="fav-board-save"
                    onClick={handleSaveBoard}
                  >
                    Create a board
                  </Button>
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
      basket: state.favBoard.basket,
    }),
    { removeItemFromBasket },
  ),
)(FavoritesToolbarButton);
