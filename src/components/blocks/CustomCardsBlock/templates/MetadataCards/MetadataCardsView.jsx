import React from 'react';
import { Modal, Card } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { BodyClass } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';
import { serializeNodes } from 'volto-slate/editor/render';
import ItemMetadata from './../../../../theme/ItemMetadata/ItemMetadata';
import ItemTitle from './../../../../theme/ItemMetadata/ItemTitle';
import ItemMetadataSnippet from './../../../../theme/ItemMetadata/ItemMetadataSnippet';
import cx from 'classnames';
import './css/metadatacards.less';

export const CardItem = (props) => {
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const {
    source,
    title,
    description,
    hide_description,
    item_type,
    border_color,
    attachedimage,
    image_height = '220px',
    image_scale,
  } = props;

  const leadImage = source?.[0]?.lead_image;

  const close = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

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
          <ItemMetadata {...props} item={selectedItem} />
        </Modal.Content>
      </Modal>

      <div
        className="ui card metadata-card has-link"
        style={
          border_color
            ? {
                borderTop: `8px solid ${border_color}`,
              }
            : {}
        }
        onClick={() => {
          setOpenModal(true);
          setSelectedItem(props);
        }}
        onKeyDown={() => setSelectedItem(props)}
        role="button"
        tabIndex="0"
      >
        <div className="content metadata-card-content">
          <div className="metadata-card-wrapper">
            <>
              {leadImage && !attachedimage ? (
                <LazyLoadComponent>
                  <div
                    className="metadata-card-image"
                    style={{
                      backgroundImage: `url(${props.source?.[0]['@id']
                        .replace(config.settings.apiPath, '')
                        .replace(
                          config.settings.internalApiPath,
                          '',
                        )}/@@images/image/${image_scale || 'large'})`,
                      minHeight: `${image_height}`,
                    }}
                  ></div>
                </LazyLoadComponent>
              ) : (
                <LazyLoadComponent>
                  <div
                    className="metadata-card-image"
                    style={
                      attachedimage
                        ? {
                            backgroundImage: `url(${getScaleUrl(
                              getPath(attachedimage),
                              image_scale || 'large',
                            )})`,
                            minHeight: `${image_height}`,
                          }
                        : {}
                    }
                  ></div>
                </LazyLoadComponent>
              )}

              <div className="metadata-cards-content-wrapper">
                {title && <div className="metadata-card-header">{title}</div>}

                {!hide_description && description && (
                  <div className="metadata-card-description">
                    <p>{description}</p>
                  </div>
                )}
              </div>
            </>
          </div>
        </div>

        {item_type && (
          <div className="extra content">
            <div className="left floated card_item_type">{item_type}</div>
          </div>
        )}
      </div>
    </>
  );
};

const MetadataCardsView = ({ data, isEditMode }) => {
  const {
    title,
    text,
    cards,
    border_color,
    image_bg_size,
    image_height,
    image_scale,
    cards_per_row,
    custom_class,
    text_align = 'left',
  } = data;

  return (
    <>
      <div className={cx('block align metadata-cards-block', custom_class)}>
        <BodyClass className="has-card-tiles" />
        <div className="metadata-cards-grid-wrapper">
          <div className="metadata-cards-grid">
            {title && <h2 className="metadata-cards-grid-title">{title}</h2>}

            {text && (
              <div className="metadata-cards-grid-description">
                {serializeNodes(text)}
              </div>
            )}

            <div style={{ textAlign: `${text_align}` }}>
              {cards && cards.length > 0 ? (
                <Card.Group
                  className="metadata-cards-group"
                  itemsPerRow={cards_per_row ? cards_per_row : ''}
                >
                  {(cards || []).map((card, index) => (
                    <CardItem
                      key={index}
                      {...card}
                      border_color={border_color}
                      border_top_width={data.border_top_width}
                      image_bg_size={image_bg_size}
                      image_height={image_height}
                      image_scale={image_scale}
                      isEditMode={isEditMode}
                    />
                  ))}
                </Card.Group>
              ) : (
                <div className="block-info">Add cards from the sidebar</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MetadataCardsView;
