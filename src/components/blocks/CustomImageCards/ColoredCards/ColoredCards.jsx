import cx from 'classnames';
import React from 'react';
import { Card } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';

import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';

// import './css/coloredcards.less';
import { serializeNodes } from 'volto-slate/editor/render';

export const CardItem = (props) => {
  const {
    title,
    text,
    link,
    attachedimage,
    background_color,
    border_color,
    border_top_width = '15px',
    text_color,
    font_size,
    sub_title,
    image_scale,
  } = props;

  return (
    <div
      className="ui card colored-card"
      style={{
        backgroundColor: `${background_color}`,
        color: `${text_color}`,
        borderTop: `${border_top_width} solid ${border_color}`,
      }}
    >
      <>
        {attachedimage && (
          <LazyLoadComponent>
            <div
              className="colored-card-image"
              style={
                attachedimage
                  ? {
                      backgroundImage: `url(${getScaleUrl(
                        getPath(attachedimage),
                        image_scale || 'preview',
                      )})`,
                    }
                  : {}
              }
            ></div>
          </LazyLoadComponent>
        )}

        {title && (
          <div className="content colored-card-content">
            <div className="ui sub header">{title}</div>
            <div className="colored-card-sub-header">{sub_title}</div>
          </div>
        )}

        {text && (
          <div className="content colored-card-content">
            <div className={`colored-card-description ${font_size}`}>
              {serializeNodes(text)}
            </div>
          </div>
        )}

        {link && (
          <div className="extra content">
            <div className="right floated author">
              <UniversalLink className={'colored-card-link'} href={link}>
                Read more
              </UniversalLink>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

const ColoredCards = ({ data }) => {
  const { title, cards, fluid_cards, image_scale } = data;
  return (
    <div
      className={cx(
        'block align colored-cards-block',
        {
          center: !Boolean(data.align),
          'full-width': data.align === 'full',
        },
        data.align,
      )}
    >
      <BodyClass className="has-card-tiles" />
      <div className={'colored-cards-grid-wrapper ui container'}>
        <div className={'colored-cards-grid'}>
          <h2 className={'colored-cards-grid-title'}>{title}</h2>
          <Card.Group
            className="colored-card-group"
            itemsPerRow={fluid_cards ? data?.cards.length : null}
          >
            {(cards || []).map((card, index) => (
              <CardItem
                key={index}
                {...card}
                background_color={data.background_color}
                border_color={data.border_color}
                border_top_width={data.border_top_width}
                text_color={data.text_color}
                font_size={data.font_size}
                image_scale={image_scale}
              />
            ))}
          </Card.Group>
        </div>
      </div>
    </div>
  );
};

export default ColoredCards;
