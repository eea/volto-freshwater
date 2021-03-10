import cx from 'classnames';
import React from 'react';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Grid, Icon } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';

import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';

import './css/coloredcards.less';
import { serializeNodes } from 'volto-slate/editor/render';

export const Card = (props) => {
  const {
    title,
    text,
    link,
    attachedimage,
    background_color,
    text_color,
  } = props;

  return (
    <div
      className="ui card colored-card"
      style={
        background_color
          ? {
              backgroundColor: `${background_color}`,
              color: `${text_color}`,
            }
          : {}
      }
    >
      {link ? (
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
                          'preview',
                        )})`,
                      }
                    : {}
                }
              ></div>
            </LazyLoadComponent>
          )}

          {title && (
            <div className="content colored-card-content">
              <div className="header">{title}</div>
            </div>
          )}

          {text && (
            <div className="content">
              <div className="colored-card-description">
                {serializeNodes(text)}
              </div>
            </div>
          )}

          <div className="extra content">
            <div className="right floated author">
              <UniversalLink className={'colored-card-link'} href={link}>
                <Icon link name="arrow alternate circle right" size="large" />
              </UniversalLink>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="colored-card-title">{serializeNodes(text)}</div>
        </>
      )}
    </div>
  );
};

const ColoredCards = ({ data }) => {
  const { title, cards } = data;
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
          <Grid className={'ui three stackable cards colored-cards'}>
            {(cards || []).map((card, index) => (
              <Card
                key={index}
                {...card}
                background_color={data.background_color}
                text_color={data.text_color}
              />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ColoredCards;
