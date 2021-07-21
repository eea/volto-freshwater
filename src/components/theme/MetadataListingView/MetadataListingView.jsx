import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
} from '@eeacms/volto-freshwater/components';
import './style.less';

const MetadataListingView = ({ items, isEditMode }) => {
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const close = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="items">
        {items.map((item) => (
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
    </>
  );
};

MetadataListingView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default MetadataListingView;
