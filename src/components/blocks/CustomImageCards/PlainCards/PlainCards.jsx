import cx from 'classnames';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';

import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';

import './css/plaincards.less';
import { serializeNodes } from 'volto-slate/editor/render';

export const Card = (props) => {
  const { title, text, link, attachedimage } = props;

  return (
    <div className="ui card plain-card">
      {link ? (
        <>
          <UniversalLink className={'plain-card-link'} href={link}>
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
        </>
      ) : (
        <>
          <div className="plain-card-title">{serializeNodes(text)}</div>
        </>
      )}
    </div>
  );
};

const PlainCards = ({ data }) => {
  const { title, cards } = data;
  return (
    <div
      className={cx(
        'block align plain-cards-block',
        {
          center: !Boolean(data.align),
          'full-width': data.align === 'full',
        },
        data.align,
      )}
    >
      <BodyClass className="has-card-tiles" />
      <div className={'plain-cards-grid-wrapper ui container'}>
        <div className={'plain-cards-grid'}>
          <h2 className={'plain-cards-grid-title'}>{title}</h2>
          <Grid className={'ui four stackable cards plain-cards'}>
            {(cards || []).map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default PlainCards;
