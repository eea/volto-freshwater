import React from 'react';
import {
  Grid,
  Accordion,
  Divider,
  Button,
  Label,
  Icon,
} from 'semantic-ui-react';
import { Icon as VoltoIcon } from '@plone/volto/components';
import downSVG from '@plone/volto/icons/down-key.svg';

const FilterList = (props) => {
  const { data, facets, setFacets, isEditMode } = props;
  const [isOpened, setIsOpened] = React.useState(false);
  const filters = !Object.values(facets).every((facet) => !facet.length);
  const currentFilters = Object.fromEntries(
    Object.entries(facets).filter((v) => v[1]),
  );
  const totalFilters = [].concat.apply([], Object.values(currentFilters))
    .length;

  return filters && Object.keys(facets).length ? (
    <Grid.Row verticalAlign="bottom">
      <Grid.Column width={12}>
        <Accordion className="filter-listing">
          <Accordion.Title
            className="filter-list-header"
            active={isOpened}
            onClick={() => setIsOpened(!isOpened)}
          >
            <div className="filter-list-title">
              <VoltoIcon name={downSVG} size="18px" />
              Current filters applied: {totalFilters}
            </div>
            <Button
              icon
              basic
              compact
              size="small"
              onClick={() => {
                !isEditMode && setFacets({});
              }}
            >
              <Icon name="trash" />
              Clear filters
            </Button>
          </Accordion.Title>
          <Accordion.Content className="filter-list-content" active={isOpened}>
            <Divider inverted />
            <div className="filter-list">
              {Object.keys(facets || {}).map((facet, i) => (
                <div key={i}>
                  {facets[facet].length > 0 && (
                    <div className="filter-list-group" key={i}>
                      {data?.facets.map((f, i) => {
                        return facet === f?.field?.value ? (
                          <span className="label-title" key={i}>
                            {f.title || f?.field?.label}:
                          </span>
                        ) : (
                          ''
                        );
                      })}
                      {typeof facets[facet] === 'string' ? (
                        <Label size="small" key={i}>
                          {facets[facet]}
                          <Icon
                            name="delete"
                            onClick={() => {
                              !isEditMode &&
                                setFacets({
                                  ...facets,
                                  [facet]: '',
                                });
                            }}
                          />
                        </Label>
                      ) : (
                        <>
                          {facets[facet].map((entry, i) => (
                            <Label size="small" key={i}>
                              {entry}
                              <Icon
                                name="delete"
                                onClick={() => {
                                  const entries = facets[facet].filter(
                                    (item) => item !== entry,
                                  );
                                  !isEditMode &&
                                    setFacets({
                                      ...facets,
                                      [facet]: entries,
                                    });
                                }}
                              />
                            </Label>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Accordion.Content>
        </Accordion>
      </Grid.Column>
    </Grid.Row>
  ) : null;
};

export default FilterList;
