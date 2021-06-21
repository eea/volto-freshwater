import React from 'react';
import { SearchInput, SearchDetails, Facets } from '../components';
import { Grid, Divider } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { debounce } from 'lodash';

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
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;

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
                  <SearchInput {...props} isLive={isLive} />
                </Grid.Column>
              )}
              {data.showSearchButton && (
                <Grid.Column>
                  <Button onClick={() => onTriggerSearch(searchText)}>
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
            setFacets={(f) => {
              setFacets(f);
              if (isLive) onTriggerSearch(searchedText || '');
            }}
            facetWrapper={({ children }) => <div>{children}</div>}
          />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default RightColumnFacets;
