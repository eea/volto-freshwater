import React from 'react';
import { openlayers as ol } from '@eeacms/volto-openlayers-map';
import { useMapContext } from '@eeacms/volto-openlayers-map/api';

const useStyles = () => {
  const selected = React.useMemo(
    () =>
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 12,
          fill: new ol.style.Fill({
            color: '#ccc',
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 0,
          }),
        }),
      }),
    [],
  );

  const selectStyle = React.useCallback(
    (feature) => {
      // const color = feature.values_.features[0].values_['color'] || '#ccc';
      const color = '#309ebc';
      // console.log(color);
      selected.image_.getFill().setColor(color);
      return selected;
    },
    [selected],
  );

  return { selected, selectStyle };
};

function getExtentOfFeatures(features) {
  const points = features.map((f) => f.getGeometry().flatCoordinates);
  const point = new ol.geom.MultiPoint(points);
  return point.getExtent();
}

export default function FeatureInteraction({ onFeatureSelect, hideFilters }) {
  const { map } = useMapContext();
  const { selectStyle } = useStyles();

  React.useEffect(() => {
    if (!map) return;

    const select = new ol.interaction.Select({
      condition: ol.condition.click,
      style: hideFilters ? null : selectStyle,
    });

    select.on('select', function (e) {
      const features = e.target.getFeatures().getArray();

      features.forEach((feature) => {
        const subfeatures = feature.values_.features;
        if (subfeatures.length === 1) {
          const selectedFeature = subfeatures[0].values_;
          if (hideFilters) {
            const url = window.location.origin + selectedFeature.path;
            // window.open(url);
            window.location.href = url;
          }
          onFeatureSelect(selectedFeature);
        } else {
          const extent = getExtentOfFeatures(subfeatures);
          let extentBuffer =
            (extent[3] - extent[1] + extent[2] - extent[0]) / 4;
          extentBuffer = extentBuffer < 500 ? 500 : extentBuffer;
          const paddedExtent = ol.extent.buffer(extent, extentBuffer);
          map.getView().fit(paddedExtent, { ...map.getSize(), duration: 1000 });
        }
      });

      return null;
    });

    map.addInteraction(select);

    map.on('pointermove', (e) => {
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getViewport().style.cursor = hit ? 'pointer' : '';
    });

    return () => map.removeInteraction(select);
  }, [map, selectStyle, onFeatureSelect, hideFilters]);

  return null;
}
