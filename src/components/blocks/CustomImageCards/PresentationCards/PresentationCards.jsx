import cx from 'classnames';
import React from 'react';
import { Card } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';

import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';

import './css/presentationcards.less';
import { serializeNodes } from 'volto-slate/editor/render';

export const CardItem = (props) => {
  const {
    title,
    text,
    item_type,
    link,
    border_color,
    border_top_width,
    attachedimage,
    image_bg_size,
    image_bg_min_size,
    image_scale,
  } = props;

  return (
    <div
      className="ui card presentation-card"
      style={{
        borderTop: `${border_top_width} solid ${border_color}`,
      }}
    >
      {link ? (
        <>
          <div className="content presentation-card-content">
            <UniversalLink className={'presentation-card-link'} href={link}>
              {attachedimage && (
                <LazyLoadComponent>
                  <div
                    className="presentation-card-image"
                    style={
                      attachedimage
                        ? {
                            backgroundImage: `url(${getScaleUrl(
                              getPath(attachedimage),
                              image_scale || 'preview',
                            )})`,
                            backgroundSize: `${image_bg_size}`,
                            minHeight: `${image_bg_min_size}`,
                          }
                        : {}
                    }
                  ></div>
                </LazyLoadComponent>
              )}

              {title && <div className="presentation-card-header">{title}</div>}

              {text && (
                <div className="content presentation-card-content">
                  <div className="presentation-card-description">
                    {serializeNodes(text)}
                  </div>
                </div>
              )}
            </UniversalLink>
          </div>
          {item_type && (
            <div className="extra content">
              <div className="left floated card_item_type">{item_type}</div>
            </div>
          )}
        </>
      ) : (
        <>
          {text && (
            <div className="presentation-card-title">
              {serializeNodes(text)}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const PresentationCards = ({ data }) => {
  const {
    title,
    cards,
    border_color,
    image_bg_size,
    image_bg_min_size,
    image_scale,
    fluid_cards,
  } = data;

  return (
    <div
      className={cx(
        'block align presentation-cards-block',
        {
          center: !Boolean(data.align),
          'full-width': data.align === 'full',
        },
        data.align,
      )}
    >
      <BodyClass className="has-card-tiles" />
      <div className={'presentation-cards-grid-wrapper'}>
        <div className={'presentation-cards-grid'}>
          <h2 className={'presentation-cards-grid-title'}>{title}</h2>
          <Card.Group
            className="presentation-cards-group"
            itemsPerRow={fluid_cards ? data?.cards.length : ''}
          >
            {(cards || []).map((card, index) => (
              <CardItem
                key={index}
                {...card}
                border_color={border_color}
                border_top_width={data.border_top_width}
                image_bg_size={image_bg_size}
                image_bg_min_size={image_bg_min_size}
                image_scale={image_scale}
              />
            ))}
          </Card.Group>
        </div>
      </div>
    </div>
  );
};

export default PresentationCards;
