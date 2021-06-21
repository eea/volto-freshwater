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

  // const colWidth = 3;
  // starting from 1, for the search button
  // const columns = 1 + data.facets?.length + (data.showSearchInput ? 1 : 0);
  // const colWidth = Math.floor(12 / columns);

  return (
    <>
      <h3>{data.title}</h3>
      <SearchDetails text={searchedText} total={totalItems} />

      <Grid className="searchBlock-facets" stackable>
        <Grid.Column mobile={12} tablet={8} computer={9}>
          <Grid.Row>
            <Grid columns="2" verticalAlign="bottom">
              {data.showSearchInput && (
                <Grid.Column>
                  <div className="search-input">
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
                  </div>
                </Grid.Column>
              )}
              {data.showSearchButton && (
                <Grid.Column>
                  <Button onClick={() => onTriggerSearch()}>
                    {data.searchButtonLabel || 'Search!'}
                  </Button>
                </Grid.Column>
              )}
            </Grid>
          </Grid.Row>
          <Divider />

          {children}
        </Grid.Column>
        <Grid.Column mobile={12} tablet={4} computer={3}>
          <Facets
            data={data}
            facets={facets}
            setFacets={setFacets}
            facetWrapper={({ children }) => <div>{children}</div>}
          />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default RightColumnFacets;
