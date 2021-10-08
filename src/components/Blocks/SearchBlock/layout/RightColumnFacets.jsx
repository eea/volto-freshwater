import React from 'react';
import { SearchInput, SearchDetails, Facets, FilterList } from '../components';
import { Grid, Segment } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { flushSync } from 'react-dom';

const FacetWrapper = ({ children }) => (
  <Segment basic className="facet">
    {children}
  </Segment>
);

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
    isEditMode,
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;

  return (
    <Grid className="searchBlock-facets right-column-facets" stackable>
      <Grid.Row>
        <Grid.Column>
          {data.title && <h3>{data.title}</h3>}
          <SearchDetails text={searchedText} total={totalItems} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column mobile={12} tablet={8} computer={9}>
          {data.showSearchInput && (
            <div className="search-wrapper">
              <SearchInput {...props} isLive={isLive} />
              {data.showSearchButton && (
                <Button primary onClick={() => onTriggerSearch(searchText)}>
                  {data.searchButtonLabel || 'Search'}
                </Button>
              )}
            </div>
          )}

          <FilterList
            {...props}
            isEditMode={isEditMode}
            setFacets={(f) => {
              flushSync(() => {
                setFacets(f);
                onTriggerSearch(searchedText || '', f);
              });
            }}
          />

          {children}
        </Grid.Column>

        <Grid.Column className="facets" mobile={12} tablet={4} computer={3}>
          {data.facetsTitle && <h3>{data.facetsTitle}</h3>}
          <Facets
            data={data}
            facets={facets}
            isEditMode={isEditMode}
            setFacets={(f) => {
              flushSync(() => {
                setFacets(f);
                onTriggerSearch(searchedText || '', f);
              });
            }}
            facetWrapper={FacetWrapper}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RightColumnFacets;
