import React from 'react';
import { Modal } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';
import config from '@plone/volto/registry';
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
} from '@eeacms/volto-freshwater/components';
import cx from 'classnames';

const Card = (props) => {
  const {
    card,
    border_color,
    image_height = '220px',
    image_scale,
    editable,
    display,
  } = props;

  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const metadataView = display === 'metadata_cards';

  const close = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const leadImage = card.source?.[0]?.lead_image;

  return (
    <>
      <Modal
        className="item-metadata-modal"
        open={isOpenModal}
        onClose={close}
        size="large"
        closeIcon
        centered
      >
        <Modal.Header>
          <ItemMetadataSnippet {...props} item={selectedItem} />
          <ItemTitle {...props} item={selectedItem} />
        </Modal.Header>

        <Modal.Content>
          <ItemMetadata
            {...props}
            item={selectedItem}
            map_preview={true}
            shareItem={true}
          />
        </Modal.Content>
      </Modal>

      <div
        className={cx('ui card presentation-card has-link', {
          'metadata-card': metadataView,
        })}
        style={
          border_color
            ? {
                borderTop: `8px solid ${border_color}`,
              }
            : {}
        }
        onClick={() => {
          if (metadataView) {
            setOpenModal(true);
            setSelectedItem(props.card);
          }
        }}
        onKeyDown={() => {
          if (metadataView) setSelectedItem(props.card);
        }}
        role="button"
        tabIndex="0"
      >
        {!metadataView && card.link && !editable ? (
          <>
            <div className="content presentation-card-content">
              <UniversalLink
                className="presentation-card-wrapper"
                href={card.link}
              >
                <>
                  {leadImage && !card?.attachedimage ? (
                    <div
                      className="presentation-card-image"
                      style={{
                        backgroundImage: `url(${card.source?.[0]['@id']
                          .replace(config.settings.apiPath, '')
                          .replace(
                            config.settings.internalApiPath,
                            '',
                          )}/@@images/image/${image_scale || 'large'})`,
                        minHeight: `${image_height}`,
                      }}
                    ></div>
                  ) : (
                    <div
                      className="presentation-card-image"
                      style={
                        card?.attachedimage
                          ? {
                              backgroundImage: `url(${getScaleUrl(
                                getPath(card.attachedimage),
                                image_scale || 'large',
                              )})`,
                              minHeight: `${image_height}`,
                            }
                          : {}
                      }
                    ></div>
                  )}

                  <div className="presentation-cards-content-wrapper">
                    {card.title && (
                      <div className="presentation-card-header">
                        {card.title}
                      </div>
                    )}

                    {!card.hide_description && card.description && (
                      <div className="presentation-card-description">
                        <p>{card.description}</p>
                      </div>
                    )}
                  </div>
                </>
              </UniversalLink>
            </div>
            {card.item_type && (
              <div className="extra content">{card.item_type}</div>
            )}
          </>
        ) : (
          <>
            <div className="content presentation-card-content">
              <div className="presentation-card-wrapper">
                <>
                  {leadImage && !card?.attachedimage ? (
                    <div
                      className="presentation-card-image"
                      style={{
                        backgroundImage: `url(${card.source?.[0]['@id']
                          .replace(config.settings.apiPath, '')
                          .replace(
                            config.settings.internalApiPath,
                            '',
                          )}/@@images/image/${image_scale || 'large'})`,
                        minHeight: `${image_height}`,
                      }}
                    ></div>
                  ) : (
                    <div
                      className="presentation-card-image"
                      style={
                        card?.attachedimage
                          ? {
                              backgroundImage: `url(${getScaleUrl(
                                getPath(card.attachedimage),
                                image_scale || 'large',
                              )})`,
                              minHeight: `${image_height}`,
                            }
                          : {}
                      }
                    ></div>
                  )}

                  <div className="presentation-cards-content-wrapper">
                    {card.title && (
                      <div className="presentation-card-header">
                        {card.title}
                      </div>
                    )}

                    {!card.hide_description && card.description && (
                      <div className="presentation-card-description">
                        <p>{card.description}</p>
                      </div>
                    )}
                  </div>
                </>
              </div>
            </div>

            {card.item_type && (
              <div className="extra content">{card.item_type}</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Card;
