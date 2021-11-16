/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Logo, Navigation, SearchWidget } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { HeroSection } from '@eeacms/volto-freshwater/components';
import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';
import clearLogoSVG from '@eeacms/volto-freshwater/static/freshwater_logo_clear.svg';
import config from '@plone/volto/registry';

/**
 * Header component class.
 * @class Header
 * @extends Component
 */
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHomepage: this.props.content?.['@type'] === 'Plone Site',
    };
  }
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    actualPathName: PropTypes.string.isRequired,
    leadImage: PropTypes.object,
    content: PropTypes.object,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.actualPathName !== this.props.actualPathName) {
      this.setState({
        isHomepage: this.props.content?.['@type'] === 'Plone Site',
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.actualPathName !== this.props.actualPathName) {
      this.setState({
        isHomepage: this.props.content?.['@type'] === 'Plone Site',
      });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    let leadImageUrl = this.props?.leadImage
      ? getScaleUrl(getPath(this.props.pathname), 'panoramic')
      : null;
    let imageCaption = this.props.content?.image_caption;
    let contentTitle = this.props.content?.title;
    let contentDescription = this.props.content?.description;
    let stagingBanner =
      __CLIENT__ && document.getElementsByClassName('stagingBanner').length > 0;
    let isDatabaseItemView =
      __CLIENT__ &&
      document.getElementsByClassName('database-item-view').length > 0;
    let isNonContentRoute = config._data.settings.nonContentRoutes.includes(
      this.props.actualPathName,
    );

    return (
      <div className="portal-top">
        {leadImageUrl && !isNonContentRoute && !isDatabaseItemView && (
          <BodyClass className="has-image" />
        )}
        {stagingBanner && <BodyClass className="staging-banner" />}
        <Segment basic className="header-wrapper" role="banner">
          <Container>
            <div className="header">
              <div
                className={`logo-nav-wrapper ${
                  this.state.isHomepage ? 'home-nav' : 'page-nav'
                }`}
              >
                <div className="logo">
                  {this.state.isHomepage ? (
                    <img
                      className="home-logo"
                      src={clearLogoSVG}
                      alt="Freshwater logo"
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
                      <SearchWidget pathname={this.props.pathname} />
                    </div>
                  </div>
                  <Navigation
                    pathname={this.props.pathname}
                    navigation={this.props.navigationItems}
                  />
                </div>
              </div>
            </div>
          </Container>
        </Segment>

        <React.Fragment>
          {!isNonContentRoute && !isDatabaseItemView && (
            <div
              className={`header-bg ${
                this.state.isHomepage ? 'homepage' : 'contentpage'
              }`}
            >
              {!this.state.isHomepage && (
                <div
                  className={'header-container'}
                  style={{ position: 'relative' }}
                >
                  <HeroSection
                    image_url={leadImageUrl}
                    image_caption={imageCaption}
                    content_title={contentTitle}
                    content_description={contentDescription}
                  />
                </div>
              )}
            </div>
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    token: state.userSession.token,
    leadImage: state?.content?.data?.image,
    content: state.content.data,
  }),
  {},
)(Header);
