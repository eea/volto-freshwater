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

import { HeroSection } from '../../../../components';
import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';

import clearLogoSVG from './freshwater_logo_clear.svg';

/**
 * Header component class.
 * @class Header
 * @extends Component
 */
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHomepage: !this.props.pathname,
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
    if (nextProps.pathname !== this.props.pathname) {
      this.setState({
        isHomepage: !nextProps.pathname,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pathname !== this.props.pathname) {
      this.setState({
        isHomepage: !this.props.pathname,
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
    return (
      <div className="portal-top">
        {leadImageUrl && <BodyClass className="has-image" />}
        <Segment basic className="header-wrapper" role="banner">
          <Container>
            <div className="header">
              <div
                className={`logo-nav-wrapper ${
                  this.state.isHomepage ? 'home-nav' : 'page-nav'
                }`}
              >
                {this.state.isHomepage ? (
                  <>
                    <div>
                      <div className="logo">
                        <img
                          className="home-logo"
                          src={clearLogoSVG}
                          alt="Freshwater logo"
                        />
                      </div>
                      <div className="search">
                        <SearchWidget pathname={this.props.pathname} />
                      </div>
                    </div>
                    <div>
                      <Navigation
                        pathname={this.props.pathname}
                        navigation={this.props.navigationItems}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="logo">
                        <Logo />
                      </div>
                    </div>
                    <div className="header-right-section">
                      <div className="search">
                        <SearchWidget pathname={this.props.pathname} />
                      </div>
                      <Navigation
                        pathname={this.props.pathname}
                        navigation={this.props.navigationItems}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </Container>
        </Segment>

        <React.Fragment>
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
