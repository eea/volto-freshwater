import cx from 'classnames';
import React from 'react';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Grid, Icon } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';

import { fixUrl, getPath } from '@eeacms/volto-freshwater/utils';

import './css/coloredcards.less';
import { serializeNodes } from 'volto-slate/editor/render';

export const thumbUrl = (url) =>
  (url || '').includes(settings.apiPath)
    ? `${flattenToAppURL(url.replace('/api', ''))}/@@images/image/preview`
    : `${url.replace('/api', '')}/@@images/image/preview`;

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
      className="ui card"
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
                className="card-image"
                style={
                  attachedimage
                    ? {
                        backgroundImage: `url(${fixUrl(
                          getPath(attachedimage),
                        )})`,
                      }
                    : {}
                }
              ></div>
            </LazyLoadComponent>
          )}

          {title && (
            <div className="content">
              <div className="header">{title}</div>
            </div>
          )}

          {text && (
            <div className="content">
              <div className="card-description">{serializeNodes(text)}</div>
            </div>
          )}

          <div className="extra content">
            <div className="right floated author">
              <UniversalLink className={'card-link'} href={link}>
                <Icon link name="arrow alternate circle right" size="large" />
              </UniversalLink>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card-title">{serializeNodes(text)}</div>
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
        'block align imagecards-block',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <BodyClass className="has-card-tiles" />
      <div
        className={cx({
          'full-width': data.align === 'full',
        })}
      >
        <div className={'cardsgrid'}>
          <h2 className={'cardsgrid-title'}>{title}</h2>
          <Grid className={'ui three stackable cards cardsgrid-cards'}>
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
