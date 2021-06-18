import React from 'react';
import { SearchDetails, Facets } from '../components';
import { Grid, Divider } from 'semantic-ui-react';
import { Button, Input } from 'semantic-ui-react';

const RightColumnFacets = (props) => {
  const {
    children,
    data,
    totalItems,
    facets,
    setFacets,
    onTriggerSearch,
    searchedText, // search text for previous search
    searchText, // search text currently being entered (controlled input)
    setSearchText,
    // searchData,
    // mode = 'view',
    // variation,
  } = props;

  const colWidth = 12;

  return (
    <>
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

      {children}
    </>
  );
};

export default RightColumnFacets;
