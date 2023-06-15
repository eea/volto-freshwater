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
  const cases = useCases(addAppURL(cases_url));

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
    const activeItems = filterCases(cases, activeFilters);
    setActiveItems(activeItems);
  }, [activeFilters, cases]);

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
        <CaseStudyFilters
          filters={filters}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </Grid.Row>
      <Grid.Row>
        {cases.length ? (
          <Grid columns="12">
            <Grid.Column
              mobile={8}
              tablet={8}
              computer={9}
              // className="col-left"
            >
              <CaseStudyMap items={cases} activeItems={activeItems} />
            </Grid.Column>
            <Grid.Column mobile={4} tablet={4} computer={3}>
              <div id="external-popup-overlay">popup HERE</div>
            </Grid.Column>
          </Grid>
        ) : null}
      </Grid.Row>
    </div>
  );
}

// import { useDispatch } from 'react-redux'; // , useSelector
// import { getVocabulary } from '@plone/volto/actions'; // , searchContent
// const IPCC = 'eea.climateadapt.aceitems_ipcc_category';
// const dispatch = useDispatch();
// React.useEffect(() => {
//   const action = getVocabulary({
//     vocabNameOrURL: IPCC,
//   });
//   dispatch(action);
// }, [dispatch]);
// setMapKey(
//   activeItems.length +
//     '-' +
//     activeFilters.sectors +
//     '-' +
//     activeFilters.impacts,
// );
//console.log('activeFilters filter cases', data);
// setMapKey(
//   activeItems.length +
//     '-' +
//     activeFilters.sectors +
//     '-' +
//     activeFilters.impacts,
// );
// const [mapKey, setMapKey] = React.useState('-');
