import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import ItemMetadata from './../ItemMetadata/ItemMetadata';
import ItemTitle from './../ItemMetadata/ItemTitle';

import './less/listing.less';

const formatItemType = (item) => {
  const type =
    item
      .replace('_', ' / ')
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ') || '';
  return type;
};

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

              <div className="item-metadata">
                {item['@type'] && (
                  <div className="metadata-tab-section">
                    <span className="metadata-tab-title">Item: </span>
                    <span>{formatItemType(item['@type'])}</span>
                  </div>
                )}

                {item.category && (
                  <div className="metadata-tab-section">
                    <span className="metadata-tab-title">Topics: </span>
                    <span>{item.category}</span>
                  </div>
                )}

                {item.publication_year && (
                  <div className="metadata-tab-section">
                    <span className="metadata-tab-title">
                      Publication year:{' '}
                    </span>
                    <span>{item.publication_year}</span>
                  </div>
                )}

                {item.legislative_reference && (
                  <div className="metadata-tab-section">
                    <span className="metadata-tab-title">
                      Legislative reference:{' '}
                    </span>
                    <span>{item.legislative_reference.title}</span>
                  </div>
                )}
              </div>
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
