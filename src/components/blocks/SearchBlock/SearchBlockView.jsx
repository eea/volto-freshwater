import React from 'react';

import ListingBody from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import { withBlockExtensions } from '@plone/volto/helpers';

import config from '@plone/volto/registry';

import { withSearch } from './hocs';
import { compose } from 'redux';

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
