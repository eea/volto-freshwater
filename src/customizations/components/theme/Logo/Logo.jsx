/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import LogoImage from './Logo.svg';

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = (props) => {
  const root = useSelector((state) => state.breadcrumbs.root);

  return (
    <Link to={root || '/'} title="WISE Freshwater">
      <Image
        src={LogoImage}
        alt="WISE Freshwater Logo"
        title="WISE Freshwater"
      />
    </Link>
  );
};

export default Logo;
