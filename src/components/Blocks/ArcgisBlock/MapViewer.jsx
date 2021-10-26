import React, { createRef } from 'react';
import '@eeacms/volto-arcgis-block/components/MapViewer/css/ArcgisMap.css';
import classNames from 'classnames';
import { loadModules, loadCss } from 'esri-loader';
import BasemapWidget from '@eeacms/volto-arcgis-block/components/MapViewer/BasemapWidget';
import MeasurementWidget from '@eeacms/volto-arcgis-block/components/MapViewer/MeasurementWidget';
import PrintWidget from '@eeacms/volto-arcgis-block/components/MapViewer/PrintWidget';
import AreaWidget from '@eeacms/volto-arcgis-block/components/MapViewer/AreaWidget';
import ScaleWidget from '@eeacms/volto-arcgis-block/components/MapViewer/ScaleWidget';
import LegendWidget from '@eeacms/volto-arcgis-block/components/MapViewer/LegendWidget';
import MenuWidget from '@eeacms/volto-arcgis-block/components/MapViewer/MenuWidget';
import { MapViewerConfig } from '@eeacms/volto-arcgis-block/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
//import "isomorphic-fetch";  <-- Necessary to use fetch?
var Map, MapView, Zoom, FeatureLayer, promiseUtils;

const FilterInput = (props) => {
  const treatmentType = props.type;

  return (
    <div>
      <input
        id={treatmentType.name}
        type="checkbox"
        name="treatmenttype_cp"
        value={treatmentType.name}
        defaultChecked="true"
        onChange={props.onChange}
      />
      <label for={treatmentType.name}>
        {treatmentType.name} ({treatmentType.count})
      </label>
      <br />
    </div>
  );
};

class MapViewer extends React.Component {
  /**
   * This method does the creation of the main component
   * @param {*} props
   */
  constructor(props) {
    super(props);
    //we create a reference to the DOM element that will
    //be later mounted. We will use the reference that we
    //create here to reference the DOM element from javascript
    //code, for example, to create later a MapView component
    //that will use the map div to show the map
    this.state = { treatmentTypes: [], showTypes: [] };
    this.layerUrl = props.layerUrl;
    this.countryCode = props.connected_data_parameters
      ? props.connected_data_parameters[0].v[0]
      : '';
    this.countryCondition = `country = '${this.countryCode}'`;
    this.mapdiv = createRef();
    this.mapCfg = props.cfg.Map;
    this.compCfg = this.props.cfg.Components;
    this.url = this.props.cfg.url || ''; // Get url or default
    this.map = null;
    this.id = props.id;
    this.mapClass = classNames('map-container', {
      [`${props.customClass}`]: props.customClass || null,
    });

    this.updateFilters = this.updateFilters.bind(this);
  }

  loader() {
    return loadModules([
      'esri/WebMap',
      'esri/views/MapView',
      'esri/widgets/Zoom',
      'esri/layers/FeatureLayer',
      'esri/core/promiseUtils',
    ]).then(([_Map, _MapView, _Zoom, _FeatureLayer, _promiseUtils]) => {
      [Map, MapView, Zoom, FeatureLayer, promiseUtils] = [
        _Map,
        _MapView,
        _Zoom,
        _FeatureLayer,
        _promiseUtils,
      ];
    });
  }

  componentDidUpdate() {
    let condition = this.countryCondition; /* queryParams.where; */
    let layer = this.map.layers.items[0];

    condition =
      condition +
      ` AND treatmenttype_cp in ('${this.state.showTypes.join("','")}')`;
    layer.definitionExpression = condition;
    console.log('condition', condition);
  }

  updateFilters = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    console.log('checked', checked);

    if (!checked) {
      console.log('removing ', value);
      this.setState({
        showTypes: this.state.showTypes.filter((type) => {
          return type !== value;
        }),
      });
    } else {
      console.log('adding ', value);
      this.setState({ showTypes: [...this.state.showTypes, value] });
    }
    console.log('showTypes', this.state.showTypes);
  };

  componentWillUnmount() {
    this.unmounted = true;
  }

  /**
   * Once the component has been mounted in the screen, this method
   * will be executed, so we can access to the DOM elements, since
   * they are already mounted
   */
  componentDidMount() {
    loadCss();
    // await this.loader();
    this.loader().then(() => {
      this.map = new Map({
        basemap: 'gray-vector', // topo
      });

      this.view = new MapView({
        container: this.mapdiv.current,
        map: this.map,
        center: this.mapCfg.center,
        zoom: this.mapCfg.zoom,
        ui: {
          components: ['attribution'],
        },
      });
      this.zoom = new Zoom({
        view: this.view,
      });
      this.view.ui.add(this.zoom, {
        position: 'top-right',
      });

      // ###############################################################
      // ###############################################################
      const popupTrailheads = {
        title: '{uwwname}',
        content: [
          {
            type: 'fields',
            fieldInfos: [
              {
                fieldName: 'aggname',
                label: 'aggname.alias',
                visible: true,
              },
            ],
          },
        ],
      };
      const trailheadsLabels = {
        symbol: {
          type: 'text',
          color: '#FFFFFF',
          haloColor: '#5E8D74',
          haloSize: '2px',
          font: {
            size: '12px',
            family: 'Noto Sans',
            style: 'italic',
            weight: 'normal',
          },
        },

        labelPlacement: 'above-center',
        labelExpressionInfo: {
          expression: 'HELLLOOO',
        },
      };

      console.log('layerUrl', this.layerUrl);
      console.log('connected_data_parameters', this.connected_data_parameters);

      const layer = new FeatureLayer({
        url: this.layerUrl,
        outFields: ['*'],
        // labelingInfo: [trailheadsLabels],
        // popupTemplate: popupTrailheads,
        definitionExpression: this.countryCondition,
      });

      this.map.add(layer);
      layer.load().then(() => {
        // Set the view extent to the data extent
        layer.popupTemplate = layer.createPopupTemplate();
      });

      const getTypes = promiseUtils.debounce((layer) => {
        const queryParams = layer.createQuery();
        queryParams.returnGeometry = false;
        queryParams.returnExceededLimitFeatures = true;
        queryParams.maxRecordCountFactor = 5;
        queryParams.num = 9999;
        queryParams.outFields = ['treatmenttype_cp'];
        const x = layer.queryFeatures(queryParams).then(function (results) {
          // prints the array of result graphics to the console
          const res = results.features;
          return res;
        });
        return promiseUtils.eachAlways([x]);
        // queryParams.where = queryParams.where + " AND treatmenttype_cp = 'Biological treatment'";
        // layer.definitionExpression = queryParams.where;
      });

      const updateTypes = (result) => {
        let types = result[0].value.map((item) => {
          return item.attributes.treatmenttype_cp;
        });
        console.log('total types', types.length);
        const typesUnique = [...new Set(types)];

        // console.log('types', types);

        const typesCount = typesUnique.map((t) => {
          return { name: t, count: types.filter((i) => i === t).length };
        });

        console.log('typesCount', typesCount);

        if (!this.unmounted) {
          this.setState({ treatmentTypes: typesCount, showTypes: typesUnique });
        }
      };

      getTypes(layer).then(updateTypes);
      // console.log('treatmentTypes', this.state.treatmentTypes);

      // ###############################################################
      // ###############################################################

      // After launching the MapViewerConfig action
      // we will have stored the json response here:
      // this.props.mapviewer_config
      this.props.MapViewerConfig(this.props.url);

      //Once we have created the MapView, we need to ensure that the map div
      //is refreshed in order to show the map on it. To do so, we need to
      //trigger the renderization again, and to trigger the renderization
      //we invoke the setState method, that changes the state and forces a
      //react component to render itself again
      // this.setState({});
    });
    // this.mapdiv.current is the reference to the current DOM element of
    // this.mapdiv after it was mounted by the render() method
  }

  setActiveWidget(widget) {
    if (!widget) {
      this.activeWidget = null;
      return;
    }
    if (this.activeWidget === widget) return;
    this.closeActiveWidget();
    this.activeWidget = widget;
  }
  closeActiveWidget() {
    if (this.activeWidget) {
      this.activeWidget.openMenu();
      this.activeWidget = null;
    }
  }

  /**
   * This method evaluates the ability to render the basemaps widget and
   * returns the jsx allowing such a render (if conditions are ok)
   * @returns jsx
   */
  renderBasemap() {
    if (this.props.mapviewer_config.Download) return;
    if (this.view) return <BasemapWidget view={this.view} mapViewer={this} />;
  }

  renderLegend() {
    if (this.view) return <LegendWidget view={this.view} mapViewer={this} />;
  }

  renderMeasurement() {
    if (this.props.mapviewer_config.Download) return;
    if (this.view)
      return <MeasurementWidget view={this.view} mapViewer={this} />;
  }

  renderPrint() {
    if (this.props.mapviewer_config.Download) return;
    if (this.view) return <PrintWidget view={this.view} mapViewer={this} />;
  }

  renderArea() {
    if (this.props.mapviewer_config.Download) return;
    if (this.view)
      return (
        <AreaWidget
          view={this.view}
          map={this.map}
          mapViewer={this}
          download={this.props.mapviewer_config.Download}
        />
      );
  }

  renderScale() {
    if (this.view) return <ScaleWidget view={this.view} mapViewer={this} />;
  }

  renderMenu() {
    if (this.view)
      return (
        <MenuWidget
          view={this.view}
          conf={this.props.mapviewer_config.Components}
          download={this.props.mapviewer_config.Download}
          map={this.map}
          mapViewer={this}
        />
      ); //call conf
  }

  /**
   * This method renders the map viewer, invoking if necessary the methods
   * to render the other widgets to display
   * @returns jsx
   */
  render() {
    // we use a reference (ref={this.mapdiv}) in order to reference a
    // DOM element to be mounted (but not yet mounted)
    return (
      <div className={this.mapClass} style={{ display: 'flex' }}>
        <form id="map-filters">
          <fieldset>
            <legend>Treatment Type</legend>
            {(this.state.treatmentTypes || []).map((type) => {
              return <FilterInput onChange={this.updateFilters} type={type} />;
            })}
          </fieldset>
        </form>
        <div ref={this.mapdiv} className="map">
          {this.renderBasemap()}
          {this.renderLegend()}
          {this.renderMeasurement()}
          {this.renderPrint()}
          {this.renderArea()}
          {this.renderScale()}
          {this.renderMenu()}
        </div>
      </div>
    );
  }
}

export default compose(
  connect(
    (state, props) => ({
      mapviewer_config: state.mapviewer_config.mapviewer_config,
    }),
    { MapViewerConfig },
  ),
)(MapViewer);
