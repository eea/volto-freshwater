import React from 'react';

import './less/herosection.less';

function HeroSection(props) {
  const {
    image_caption,
    image_url,
    content_description,
    content_title,
  } = props;
  return (
    <>
      {image_url && (
        <div className="herosection">
          <div className="herosection-content-wrapper">
            <div
              className="herosection-content-image document-image"
              style={{
                backgroundImage: `url(${image_url})`,
              }}
            />
            <div className="herosection-content-image-overlay" />
            <div className="ui container herosection-content">
              <h1 className="herosection-content-title">{content_title}</h1>
              {content_description && (
                <p className={'herosection-content-description'}>
                  {content_description}
                </p>
              )}
              {image_caption && (
                <p className="herosection-content-image-caption">
                  {image_caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// HeroSection.displayName = 'HeroSection';
export default HeroSection;
