import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

import { Button, Input } from 'semantic-ui-react';

import ListingBody from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import Facets from './Facets';
import withSearch from './withSearch';

import config from '@plone/volto/registry';

const SearchDetails = ({ total, text, as = 'h4' }) => {
  const El = as;
  return (
    <El>
      {text ? `Searched for: ${text}. ` : ''}Search results: {total}
    </El>
  );
};

const SearchBlockView = withSearch()((props) => {
  const {
    data,
    searchData,
    totalItems,
    facets,
    setFacets,
    mode = 'view',
    onTriggerSearch,
    searchedText, // search text for previous search
    searchText, // search text currently being entered (controlled input)
    setSearchText,
  } = props;

  const listingBodyVariation = config.blocks.blocksConfig.listing.variations[0];
  const colWidth = 12;

  return (
    <div className="block searchBlock">
      <h3>{data.title}</h3>
      <SearchDetails text={searchedText} total={totalItems} />
      <Grid className="searchBlock-facets" stackable>
        {data.showSearchInput && (
          <Grid.Column key="search_input" width={3}>
            {data.searchInputPrompt && (
              <label className="search-block-prompt">
                {data.searchInputPrompt}
              </label>
            )}
            <Input
              id={`${props.id}-searchtext`}
              value={searchText}
              placeholder="Search..."
              fluid
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  onTriggerSearch();
                }
              }}
              onChange={(event, { value }) => {
                setSearchText(value);
              }}
            />
          </Grid.Column>
        )}
        <Facets data={data} facets={facets} setFacets={setFacets} />
        {data.showSearchButton && (
          <Grid.Column width={colWidth}>
            <Button onClick={() => onTriggerSearch()}>
              {data.searchButtonLabel || 'Search!'}
            </Button>
          </Grid.Column>
        )}
      </Grid>
      <Divider />

      <ListingBody
        variation={listingBodyVariation}
        data={searchData || {}}
        path={props.path}
        isEditMode={mode === 'edit'}
      />
    </div>
  );
});

export default SearchBlockView;
