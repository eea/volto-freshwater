/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, Segment, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Anontools } from '@plone/volto/components';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import ecLogo from '@eeacms/volto-freshwater/static/ec_logo.png';
import eeaLogo from '@eeacms/volto-freshwater/static/eea_mini.png';
import fiseLogo from '@eeacms/volto-freshwater/static/forest.svg';
import ccaLogo from '@eeacms/volto-freshwater/static/climate_adapt.png';
import biseLogo from '@eeacms/volto-freshwater/static/bise-logo.png';
import wiseLogo from '@eeacms/volto-freshwater/static/wise-logo.png';
// import fishLogo from '@eeacms/volto-freshwater/static/footer-fishes.svg';

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => (
  <Segment role="contentinfo" vertical padded className="footerWrapper">
    <Grid className="footer-top-wave"> </Grid>
    <Container>
      <div className="footer-top-wrapper">
        <Grid stackable>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <ul className="footer-nav" id="footer_links">
                <li>
                  <Link className="item" to="/">
                    <FormattedMessage id="home" defaultMessage="Home" />
                  </Link>
                </li>
                <li>
                  <a className="item" href={`mailto:WISE@eea.europa.eu`}>
                    Contact
                  </a>
                </li>
                <li>
                  <Link className="item" to="/sitemap">
                    <FormattedMessage id="sitemap" defaultMessage="Sitemap" />
                  </Link>
                </li>
                <li>
                  <a
                    className="item"
                    href="https://water.europa.eu/legal-notice"
                  >
                    <FormattedMessage
                      id="legal_notice"
                      defaultMessage="Privacy and legal notice"
                    />
                  </a>
                </li>
                <Anontools />
              </ul>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      <div className="site-info">
        <Grid stackable>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={6}>
              <div className="site-info-logos">
                <a href="https://www.eea.europa.eu/">
                  <LazyLoadImage
                    className="footerLogo"
                    src={eeaLogo}
                    title="European Environment Agency"
                    alt="European Environment Agency"
                  />
                </a>
                <a href="https://ec.europa.eu/">
                  <LazyLoadImage
                    className="footerLogo"
                    src={ecLogo}
                    title="European Commission"
                    alt="European Commission"
                  />
                </a>
              </div>
            </Grid.Column>

            <Grid.Column mobile={16} tablet={16} computer={6}>
              <div>
                <p>Other European Information Systems:</p>
              </div>
              <div className="footerLogos">
                <a href="https://biodiversity.europa.eu/">
                  <LazyLoadImage
                    className="footerLogo"
                    src={biseLogo}
                    title="Biodiversity Information System for Europe"
                    alt="Biodiversity Information System for Europe"
                  />
                </a>
                <a href="https://climate-adapt.eea.europa.eu/">
                  <LazyLoadImage
                    className="footerLogo"
                    src={ccaLogo}
                    title="Climate-Adapt"
                    alt="Climate-Adapt"
                  />
                </a>
                <a href="https://water.europa.eu/">
                  <LazyLoadImage
                    className="footerLogo"
                    src={wiseLogo}
                    title="Water Information System for Europe"
                    alt="Water Information System for Europe"
                  />
                </a>
                <a href="https://forest.eea.europa.eu/">
                  <LazyLoadImage
                    className="footerLogo"
                    src={fiseLogo}
                    title="Forest Information System for Europe"
                    alt="Forest Information System for Europe"
                  />
                </a>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/*<div className="footer-backdrop">*/}
        {/*  <LazyLoadImage*/}
        {/*    src={fishLogo}*/}
        {/*    title="Footer Fish Logo"*/}
        {/*    alt="Footer Fish Logo"*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </Container>
  </Segment>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
