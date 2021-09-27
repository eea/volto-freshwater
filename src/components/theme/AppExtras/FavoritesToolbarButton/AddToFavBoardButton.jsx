import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Portal } from 'react-portal';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import bookmarkSVG from '@plone/volto/icons/bookmark.svg';
import { addItemToBasket } from '@eeacms/volto-freshwater/actions/favBasket';

const AddToFavBoardButton = (props) => {
  const items = useSelector((state) => state.favBoards?.items || []);
  const dispatch = useDispatch();

  return items && items.length > 0 ? (
    <div>
      <Portal node={__CLIENT__ && document.querySelector('.toolbar-actions')}>
        <div className="fav-toolbar-menu">
          <Button
            className="add-to-fav"
            title="Save to favorites"
            onClick={() => {
              if (props.location.hash) {
                dispatch(
                  addItemToBasket({
                    title: props.content.title,
                    UID: props.content.UID,
                    hash: props.location.hash,
                  }),
                );
              } else {
                dispatch(addItemToBasket(props.content));
              }
            }}
          >
            <Icon name={bookmarkSVG} size="33px" />
          </Button>
        </div>
      </Portal>
    </div>
  ) : (
    ''
  );
};

export default AddToFavBoardButton;
