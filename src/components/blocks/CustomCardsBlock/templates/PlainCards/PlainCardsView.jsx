import React from 'react';
import { Card } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';
import { serializeNodes } from 'volto-slate/editor/render';
import cx from 'classnames';

import './css/plaincards.less';

export const CardItem = (props) => {
  const { title, text, link, attachedimage, isEditMode } = props;

  return (
    <>
      {link && !isEditMode ? (
        <div className="ui card plain-card">
          <UniversalLink className="plain-card-link" href={link}>
            {attachedimage && (
              <LazyLoadComponent>
                <div
                  className="plain-card-image"
                  style={
                    attachedimage
                      ? {
                          backgroundImage: `url(${getScaleUrl(
                            getPath(attachedimage),
                            'thumb',
                          )})`,
                        }
                      : {}
                  }
                ></div>
              </LazyLoadComponent>
            )}

            {title && (
              <div className="content plain-card-content">
                <div className="plain-card-header">{title}</div>
              </div>
            )}

            {text && (
              <div className="content plain-card-content">
                <div className="plain-card-description">
                  {serializeNodes(text)}
                </div>
              </div>
            )}
          </UniversalLink>
        </div>
      ) : (
        <div className="ui card plain-card">
          {attachedimage && (
            <LazyLoadComponent>
              <div
                className="plain-card-image"
                style={
                  attachedimage
                    ? {
                        backgroundImage: `url(${getScaleUrl(
                          getPath(attachedimage),
                          'thumb',
                        )})`,
                      }
                    : {}
                }
              ></div>
            </LazyLoadComponent>
          )}

          {title && (
            <div className="content plain-card-content">
              <div className="plain-card-header">{title}</div>
            </div>
          )}

          {text && (
            <div className="content plain-card-content">
              <div className="plain-card-description">
                {serializeNodes(text)}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const PlainCards = ({ data, isEditMode }) => {
  const { title, cards, custom_class } = data;
  return (
    <div
      className={cx(
        'block align plain-cards-block',
        {
          center: !Boolean(data.align),
          'full-width': data.align === 'full',
        },
        data.align,
        custom_class,
      )}
    >
      <BodyClass className="has-card-tiles" />
      <div className="plain-cards-grid-wrapper">
        <div className="plain-cards-grid">
          <h2 className="plain-cards-grid-title">{title}</h2>
          <Card.Group className="plain-card-group">
            {(cards || []).map((card, index) => (
              <CardItem key={index} {...card} isEditMode={isEditMode} />
            ))}
          </Card.Group>
        </div>
      </div>
    </div>
  );
};

export default PlainCards;
