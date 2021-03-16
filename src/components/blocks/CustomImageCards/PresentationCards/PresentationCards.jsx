import cx from 'classnames';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';

import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';

import './css/presentationcards.less';
import { serializeNodes } from 'volto-slate/editor/render';

export const Card = (props) => {
  const { title, text, link, attachedimage } = props;

  return (
    <div className="ui card presentation-card">
      {link ? (
        <>
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
                            'thumb',
                          )})`,
                        }
                      : {}
                  }
                ></div>
              </LazyLoadComponent>
            )}

            {title && (
              <div className="content presentation-card-content">
                <div className="presentation-card-header">{title}</div>
              </div>
            )}

            {text && (
              <div className="content presentation-card-content">
                <div className="presentation-card-description">
                  {serializeNodes(text)}
                </div>
              </div>
            )}
          </UniversalLink>
        </>
      ) : (
        <>
          {text && (
            <div className="presentation-card-title">{serializeNodes(text)}</div>
          )}
        </>
      )}
    </div>
  );
};

const PresentationCards = ({ data }) => {
  const { title, cards } = data;
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
      <div className={'presentation-cards-grid-wrapper ui container'}>
        <div className={'presentation-cards-grid'}>
          <h2 className={'presentation-cards-grid-title'}>{title}</h2>
          <Grid className={'ui four stackable cards presentation-cards'}>
            {(cards || []).map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default PresentationCards;
