import React from 'react';

import './less/headerhero.less';

function HeaderHero(props) {
  const {
    image_caption,
    image_url,
    content_description,
    content_title,
  } = props;
  return (
    <>
      {image_url && (
        <div className="leadimage-header">
          <div className="leadimage-container">
            <div className="leadimage-wrapper">
              <div
                className="leadimage document-image"
                style={{
                  backgroundImage: `url(${image_url})`,
                }}
              />
              <div className="image-layer" />
              <div className="ui container leadimage-content">
                <h1 className="leadimage-title">{content_title}</h1>
                {content_description && (
                  <p className={'leadimage-description'}>
                    {content_description}
                  </p>
                )}
                {image_caption && (
                  <p className="leadimage-caption">{image_caption}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// HeaderHero.displayName = 'HeaderHeroes';
export default HeaderHero;
