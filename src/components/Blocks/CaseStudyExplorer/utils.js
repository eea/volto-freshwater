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
        sectors: c.properties.sectors,
        index: index,
        path: c.properties.path,
        color: c.properties.nwrm_type === 'Light' ? '#50B0A4' : '#0083E0',
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
    let flag_sectors = false;

    if (!activeFilters.nwrm_type.length) {
      flag_type = true;
    } else {
      activeFilters.nwrm_type.forEach((filter) => {
        if (_case.properties.nwrm_type === filter) flag_type = true;
      });
    }

    if (!activeFilters.nwrms_implemented.length) {
      flag_implemented = true;
    } else {
      let nwrms_implemented = _case.properties.measures?.map((item) => {
        return item['id'].toString();
      });

      activeFilters.nwrms_implemented.forEach((filter) => {
        if (nwrms_implemented?.includes(filter)) flag_implemented = true;
      });
    }

    if (!activeFilters.sectors.length) {
      flag_sectors = true;
    } else {
      let sectors = _case.properties.sectors?.map((item) => {
        return item.toString();
      });

      activeFilters.sectors.forEach((filter) => {
        if (sectors?.includes(filter)) flag_sectors = true;
      });
    }

    return flag_type && flag_implemented && flag_sectors ? _case : false;
  });

  return data;
}

export function getFilters(cases) {
  let _filters = { nwrm_type: {}, nwrms_implemented: {}, sectors: {} };

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
      return [];
    });

    let sectors = _case.properties.sectors;
    sectors.map((item) => {
      if (!_filters.sectors.hasOwnProperty(item)) {
        _filters.sectors[item] = item;
      }
      return [];
    });
  }

  return _filters;
}
