/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Logo, Navigation, SearchWidget, Icon } from '@plone/volto/components';
import { BodyClass, isCmsUi } from '@plone/volto/helpers';
import { Container, Segment } from 'semantic-ui-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { HeroSection, StickyHeader } from '@eeacms/volto-freshwater/components';
import { useOutsideClick } from '@eeacms/volto-freshwater/helpers';
import clearLogoSVG from '@eeacms/volto-freshwater/static/freshwater_logo_white.svg';
import zoomSVG from '@plone/volto/icons/zoom.svg';

const Header = (props) => {
  const {
    content,
    leadImage,
    actualPathName,
    pathname,
    navigationItems,
  } = props;

  const leadImageUrl = leadImage?.scales?.panoramic?.download;
  const contentTitle = content?.title;
  const contentImageCaption = content?.image_caption;
  const contentDescription = content?.description;
  const isHomePage = content?.['@type'] === 'Plone Site';
  const cmsView = isCmsUi(actualPathName);
  const homePageView = isHomePage && !cmsView;

  const searchRef = React.useRef(null);
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  useOutsideClick(searchRef, () => {
    setShowMobileSearch(false);
  });

  return (
    <div className="portal-top">
      {homePageView && <BodyClass className="homepage-view" />}
      {leadImageUrl && !cmsView && <BodyClass className="has-image" />}
      <Segment
        basic
        className={`header-wrapper ${
          homePageView ? 'homepage' : 'contentpage'
        }`}
        role="banner"
      >
        <StickyHeader stickyBreakpoint={1024}>
          <div className="header">
            <Container>
              <div
                className={`logo-nav-wrapper ${
                  homePageView ? 'home-nav' : 'page-nav'
                }`}
              >
                <div className="logo">
                  {homePageView ? (
                    <LazyLoadImage
                      className="home-logo"
                      src={clearLogoSVG}
                      alt="Freshwater logo"
                      width="234"
                      height="56"
                    />
                  ) : (
                    <Logo />
                  )}
                </div>
                <div className="header-right-section">
                  <div className="right-section-wrapper">
                    <ul className="top-nav">
                      <li>
                        <a className="item" href={`mailto:WISE@eea.europa.eu`}>
                          Contact
                        </a>
                      </li>
                      <li>
                        <Link className="item" to="/sitemap">
                          <FormattedMessage
                            id="sitemap"
                            defaultMessage="Sitemap"
                          />
                        </Link>
                      </li>
                    </ul>
                    <div className="search">
                      <SearchWidget pathname={pathname} />
                    </div>
                    <div className="basket"></div>

                    <div className="mobile-search">
                      <div className="search-icon">
                        <Icon
                          onClick={toggleMobileSearch}
                          name={zoomSVG}
                          size="39px"
                        />
                      </div>
                    </div>
                  </div>
                  <Navigation
                    pathname={pathname}
                    navigation={navigationItems}
                  />
                </div>
              </div>
            </Container>

            {showMobileSearch ? (
              <div ref={searchRef} className="mobile-search-popup">
                <div>
                  <SearchWidget pathname={pathname} />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </StickyHeader>
      </Segment>

      <React.Fragment>
        {!cmsView && !isHomePage && (
          <div className="header-bg">
            <div
              className={'header-container'}
              style={{ position: 'relative' }}
            >
              <HeroSection
                image_url={leadImageUrl}
                image_caption={contentImageCaption}
                content_title={contentTitle}
                content_description={contentDescription}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  actualPathName: PropTypes.string.isRequired,
  leadImage: PropTypes.object,
  content: PropTypes.object,
};

export default connect(
  (state) => ({
    leadImage: state?.content?.data?.image,
    content: state.content.data,
  }),
  {},
)(Header);
