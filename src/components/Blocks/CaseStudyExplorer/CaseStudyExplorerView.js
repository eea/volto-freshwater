import React from 'react';
import { Grid } from 'semantic-ui-react'; // Dropdown,
import { addAppURL } from '@plone/volto/helpers';

import CaseStudyMap from './CaseStudyMap';
import CaseStudyFilters from './CaseStudyFilters';

import { filterCases, getFilters } from './utils';
import { useCases } from './hooks';

import './styles.less';

const cases_url = '@@case-studies-map.arcgis.json';

export default function CaseStudyExplorerView(props) {
  let cases = useCases(addAppURL(cases_url));
  const { caseStudies } = props; // case studies from measure view
  const caseStudiesIds =
    caseStudies &&
    caseStudies.map((item) => {
      return item['@id'].split('/').pop();
    });

  const hideFilters = caseStudiesIds ? true : false;

  const [activeFilters, setActiveFilters] = React.useState({
    nwrm_type: [],
    nwrms_implemented: [],
    sectors: [],
  });

  const [activeItems, setActiveItems] = React.useState(cases);
  const [filters, setFilters] = React.useState([]);

  React.useEffect(() => {
    const _filters = getFilters(cases);
    setFilters(_filters);
  }, [
    cases,
    activeFilters.nwrm_type,
    activeFilters.nwrms_implemented,
    activeFilters.sectors,
    activeItems.length,
  ]);

  React.useEffect(() => {
    let activeItems = filterCases(cases, activeFilters);

    if (caseStudiesIds) {
      activeItems = activeItems.filter((item) => {
        return caseStudiesIds.includes(item.properties.url.split('/').pop());
      });
    }

    setActiveItems(activeItems);
  }, [caseStudiesIds, activeFilters, cases]);

  if (__SERVER__) return '';

  return (
    <div>
      <Grid.Row
        // mobile={3}
        // tablet={3}
        // computer={2}
        stretched={true}
        id="cse-filter"
      >
        {hideFilters ? null : (
          <CaseStudyFilters
            filters={filters}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
        )}
      </Grid.Row>
      <Grid.Row>
        {cases.length ? (
          <Grid columns="12">
            <Grid.Column
              mobile={8}
              tablet={8}
              computer={8}
              // className="col-left"
            >
              <CaseStudyMap items={cases} activeItems={activeItems} />
            </Grid.Column>
            <Grid.Column mobile={4} tablet={4} computer={4}>
              <div id="external-popup-overlay"></div>
            </Grid.Column>
          </Grid>
        ) : null}
      </Grid.Row>
    </div>
  );
}
