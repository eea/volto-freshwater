import React from 'react';
import loadable from '@loadable/component';
import { getClassName } from '@eeacms/volto-arcgis-block/components/utils';
import config from '@eeacms/volto-arcgis-block/components/MapViewer/config';
import { compose } from 'redux';
import { connectToDataParameters } from './helpers';

const View = (props) => {
  const { data, id, connected_data_parameters } = props;
  const { layerUrl } = data;

  const MapViewer = loadable(() => import('./MapViewer'), {
    noSsr: true,
  });
  return (
    <MapViewer
      connected_data_parameters={connected_data_parameters}
      layerUrl={layerUrl}
      cfg={config}
      url={props.properties.parent['@id']}
      customClass={getClassName(data)}
      id={id}
    ></MapViewer>
  );
};

export default compose(connectToDataParameters)(React.memo(View));
