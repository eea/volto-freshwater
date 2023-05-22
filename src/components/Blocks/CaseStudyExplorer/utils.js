import { openlayers as ol } from '@eeacms/volto-openlayers-map';

export function getFeatures(cases) {
  const Feature = ol.ol.Feature;

  return cases.map((c, index) => {
    const {
      geometry: { coordinates },
    } = c;
    const point = new Feature(
      new ol.geom.Point(ol.proj.fromLonLat(coordinates)),
    );
    point.setId(index);
    point.setProperties(
      {
        title: c.properties.title,
        image: c.properties.image,
        nwrm_type: c.properties.nwrm_type,
        nwrms_implemented: c.properties.measures,
        index: index,
      },
      false,
    );
    //return new Feature({ labelPoint: point, index: index });
    return point;
  });
}

export function filterCases(cases, activeFilters) {
  const data = cases.filter((_case) => {
    let flag_type = false;
    let flag_implemented = false;

    if (!activeFilters.nwrm_type.length) {
      flag_type = true;
    } else {
      activeFilters.nwrm_type.forEach((filter) => {
        if (_case.properties.nwrm_type === filter) flag_type = true;
      });
    }

    if (!activeFilters.nwrms_implemented.length) {
      flag_implemented = true;
    } else
    {
      let nwrms_implemented = _case.properties.measures?.map((item) => {
        return item['id'].toString();
      });

      activeFilters.nwrms_implemented.forEach((filter) => {
        if (nwrms_implemented?.includes(filter)) flag_implemented = true;
      });
    }

    return flag_type && flag_implemented ? _case : false;
  });

  return data;
}

export function getFilters(cases) {
  let _filters = { nwrm_type: {}, nwrms_implemented: {} };

  for (let key of Object.keys(cases)) {
    const _case = cases[key];
    let typeName = _case.properties.nwrm_type;

    if (!_filters.nwrm_type.hasOwnProperty(typeName)) {
      _filters.nwrm_type[typeName] = typeName;
    }

    let nwrms_implemented = _case.properties.measures;
    nwrms_implemented.map((item) => {
      if (!_filters.nwrms_implemented.hasOwnProperty(item['id'])) {
        _filters.nwrms_implemented[item['id']] = item['title'];
      }
    });
  }

  return _filters;
}
