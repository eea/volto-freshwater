import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { serializeNodes } from 'volto-slate/editor/render';
import {
  CarouselCardsView,
  GroupCardsView,
} from '@eeacms/volto-freshwater/components';
import cx from 'classnames';

import './css/presentationcards.less';

const PresentationCardsView = ({ data, isEditMode }) => {
  const {
    title,
    text,
    cards,
    border_color,
    image_height,
    image_scale,
    text_align = 'left',
    cards_per_row,
    slider,
    slides_to_show,
    custom_class,
  } = data;

  return (
    <>
      {cards && cards.length > 0 ? (
        <div
          className={cx('block align presentation-cards-block', custom_class)}
        >
          <BodyClass className="has-card-tiles" />
          <div className="presentation-cards-grid-wrapper">
            <div className="presentation-cards-grid">
              {title && (
                <h2 className="presentation-cards-grid-title">{title}</h2>
              )}
              {text && (
                <div className="presentation-cards-grid-description">
                  {serializeNodes(text)}
                </div>
              )}
              <div style={{ textAlign: `${text_align}` }}>
                {slider ? (
                  <CarouselCardsView
                    cards={cards}
                    slides_to_show={slides_to_show}
                    border_color={border_color}
                    image_height={image_height}
                    image_scale={image_scale}
                    isEditMode={isEditMode}
                  />
                ) : (
                  <GroupCardsView
                    cards={cards}
                    cards_per_row={cards_per_row}
                    border_color={border_color}
                    image_height={image_height}
                    image_scale={image_scale}
                    isEditMode={isEditMode}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="block-info">Add cards from the sidebar</div>
      )}
    </>
  );
};

export default PresentationCardsView;
