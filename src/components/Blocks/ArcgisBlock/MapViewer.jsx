import React, { createRef } from 'react';
import '@eeacms/volto-arcgis-block/components/MapViewer/css/ArcgisMap.css';
import classNames from 'classnames';
import { loadModules, loadCss } from 'esri-loader';
import LegendWidget from './LegendWidget';
import { MapViewerConfig } from '@eeacms/volto-arcgis-block/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
//import "isomorphic-fetch";  <-- Necessary to use fetch?
var Map, MapView, Zoom, FeatureLayer, promiseUtils;

const FilterInput = (props) => {
  const treatmentType = props.type;
  const filterField = props.filterField;
  return (
    <div>
      <input
        id={treatmentType.name}
        type="checkbox"
        name={filterField}
        value={treatmentType.name}
        defaultChecked="true"
        onChange={props.onChange}
      />
      <label for={treatmentType.name}>
        {treatmentType.label || treatmentType.name} ({treatmentType.count})
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
    this.state = { layers: [], filterTypes: [], showTypes: [] };
    this.layerUrls = [props.layerUrl];
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
    let condition = this.countryCondition;
    const layers = this.state.layers;

    // debugger;

    layers.forEach((layer) => {
      if (layer.filterField) {
        condition =
          condition +
          ` AND ${layer.filterField} in ('${layer.showTypes.join("','")}')`;
      }

      const mapLayer = this.map.layers.items.find((item) => {
        return item.url + '/' + item.layerId === layer.layerUrl;
      });

      mapLayer.definitionExpression = condition;
      // console.log('condition', condition);
    });
  }

  updateFilters = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    const filterField = event.target.name;

    if (!checked) {
      this.setState({
        layers: this.state.layers.map((layer) => {
          if (layer.filterField === filterField) {
            layer.showTypes = layer.showTypes.filter((type) => {
              return type !== value;
            });
          }
          return layer;
        }),
      });
    } else {
      this.setState({
        layers: this.state.layers.map((layer) => {
          if (layer.filterField === filterField) {
            layer.showTypes = [...layer.showTypes, value];
          }
          return layer;
        }),
      });
    }
    // console.log('showTypes', this.state.showTypes);
  };

  componentWillUnmount() {
    this.unmounted = true;
  }

  getLabelForValueInfo = (values, name) => {
    const label = values.find((val) => {
      return val.value === name;
    });

    return label.label;
  };

  getLabelForField = (fields, name) => {
    const label = fields.filter((field) => {
      return field.name === name;
    });

    return label[0].alias;
  };

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
        basemap: 'gray-vector', // topo, gray-vector
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
      // Setup layers
      // ###############################################################

      this.layerUrls.forEach((layerUrl) => {
        const layer = new FeatureLayer({
          url: layerUrl,
          outFields: ['*'],
          // labelingInfo: [trailheadsLabels],
          // popupTemplate: popupTrailheads,
          definitionExpression: this.countryCondition,
        });

        this.map.add(layer);
        layer.load().then(() => {
          // Set the view extent to the data extent
          layer.popupTemplate = layer.createPopupTemplate();

          let layerData = { layerUrl: layerUrl };
          const filterField = layer.typeIdField;
          const layerTitle = this.getLabelForField(layer.fields, filterField);

          layerData.layerTitle = layerTitle;
          layerData.filterField = filterField;

          const getTypes = promiseUtils.debounce((layer) => {
            const queryParams = layer.createQuery();
            queryParams.returnGeometry = false;
            queryParams.returnExceededLimitFeatures = true;
            queryParams.maxRecordCountFactor = 5;
            queryParams.num = 9999;
            queryParams.outFields = [filterField];
            const x = layer.queryFeatures(queryParams).then(function (results) {
              // prints the array of result graphics to the console
              const res = results.features;
              return res;
            });
            return promiseUtils.eachAlways([x]);
          });

          const updateTypes = (result) => {
            if (!result[0].value) {
              return;
            }

            let types = result[0].value.map((item) => {
              return item.attributes[filterField];
            });
            // console.log('total types', types.length);
            const typesUnique = [...new Set(types)];

            // console.log('types', types);
            const typesCount = typesUnique.map((t) => {
              return {
                name: t,
                label: this.getLabelForValueInfo(
                  layer.renderer.uniqueValueInfos,
                  t,
                ),
                count: types.filter((i) => i === t).length,
              };
            });

            // console.log('typesCount', typesCount);

            if (!this.unmounted) {
              layerData.filterTypes = typesCount;
              layerData.showTypes = typesUnique;
              this.setState({ layers: [...this.state.layers, layerData] });
            }
          };

          getTypes(layer).then(updateTypes);
          // console.log('this.state.layers', this.state.layers);
        });
      });

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

  renderLegend() {
    if (this.view) return <LegendWidget view={this.view} mapViewer={this} />;
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
          {(this.state.layers || []).map((layer) => {
            return (
              <fieldset>
                <legend>{layer.layerTitle}</legend>
                {(layer.filterTypes || []).map((type) => {
                  return (
                    <FilterInput
                      onChange={this.updateFilters}
                      type={type}
                      filterField={layer.filterField}
                    />
                  );
                })}
              </fieldset>
            );
          })}
        </form>
        <div ref={this.mapdiv} className="map">
          {this.renderLegend()}
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