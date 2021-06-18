import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

import { Button, Input } from 'semantic-ui-react';

import ListingBody from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import { withSearch } from './hocs';
import { withBlockExtensions } from '@plone/volto/helpers';
import { compose } from 'redux';

import config from '@plone/volto/registry';

const getListingBodyVariation = (data) => {
  const { variations } = config.blocks.blocksConfig.listing;

  const variation = data.listingBodyTemplate
    ? variations.find(({ id }) => id === data.listingBodyTemplate)
    : variations.find(({ isDefault }) => isDefault);

  return variation;
};

const SearchBlockView = (props) => {
  const { data, searchData, mode = 'view', variation } = props;

  const Layout = variation.view;

  const listingBodyVariation = getListingBodyVariation(data);

  return (
    <div className="block searchBlock">
      <Layout {...props}>
        <ListingBody
          variation={listingBodyVariation}
          data={searchData || {}}
          path={props.path}
          isEditMode={mode === 'edit'}
        />
      </Layout>
    </div>
  );
};

export default compose(withBlockExtensions, withSearch())(SearchBlockView);
