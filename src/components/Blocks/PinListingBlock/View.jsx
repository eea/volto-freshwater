import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { removeItemFromBasket } from '@eeacms/volto-freshwater/actions/pinLists';
import { compose } from 'redux';
import { Modal, Button } from 'semantic-ui-react';
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
} from '@eeacms/volto-freshwater/components';
import { Icon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';

const PinListingBlockView = (props) => {
  const { basket } = props;
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const dispatch = useDispatch();

  const close = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="favorites-listing container">
      <div className="items">
        <h2>Pin list:</h2>
        {basket &&
          basket.map((item, i) => (
            <div className="listing-item" key={item['@id']}>
              <div className="listing-body">
                <div
                  className="listing-title"
                  onClick={() => {
                    setOpenModal(true);
                    setSelectedItem(item);
                  }}
                  onKeyDown={() => setSelectedItem(item)}
                  role="button"
                  tabIndex="0"
                >
                  <h3>{item.title ? item.title : item.id}</h3>
                </div>
                <Button
                  className="remove-pin-btn"
                  basic
                  onClick={() => dispatch(removeItemFromBasket(item))}
                >
                  <Icon name={clearSVG} size="20px" />
                </Button>

                <ItemMetadataSnippet item={item} />
                <p>{item.description}</p>
              </div>
            </div>
          ))}

        <Modal
          className="item-metadata-modal"
          open={isOpenModal}
          onClose={close}
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
      </div>
    </div>
  );
};

export default compose(
  connect(
    (state) => ({
      basket: state.pinLists.basket,
    }),
    { removeItemFromBasket },
  ),
)(PinListingBlockView);
