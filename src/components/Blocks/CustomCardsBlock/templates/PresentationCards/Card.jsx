import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';
import config from '@plone/volto/registry';

const Card = (props) => {
  const {
    card,
    border_color,
    image_height = '220px',
    image_scale,
    isEditMode,
  } = props;

  const leadImage = card.source?.[0]?.lead_image;

  return (
    <>
      {card.link && !isEditMode ? (
        <div
          className="ui card presentation-card has-link"
          style={
            border_color
              ? {
                  borderTop: `8px solid ${border_color}`,
                }
              : {}
          }
        >
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
                    <div className="presentation-card-header">{card.title}</div>
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
        </div>
      ) : (
        <div
          className="ui card presentation-card"
          style={
            border_color
              ? {
                  borderTop: `8px solid ${border_color}`,
                }
              : {}
          }
        >
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
                    <div className="presentation-card-header">{card.title}</div>
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
        </div>
      )}
    </>
  );
};

export default Card;
