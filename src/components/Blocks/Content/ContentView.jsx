import React from 'react';

import { RenderBlocks } from '@plone/volto/components';
import { getContent } from '@plone/volto/actions';
import { getLayoutFieldname, flattenToAppURL } from '@plone/volto/helpers';
import { useSelector, useDispatch } from 'react-redux';
import config from '@plone/volto/registry';

class View extends React.Component {
  /**
   * Default fallback view
   * @method getViewDefault
   * @returns {string} Markup for component.
   */
  getViewDefault = () => config.views.defaultView;

  /**
   * Get view by content type
   * @method getViewByType
   * @returns {string} Markup for component.
   */
  getViewByType = () =>
    config.views.contentTypesViews[this.props.content['@type']] || null;

  /**
   * Get view by content layout property
   * @method getViewByLayout
   * @returns {string} Markup for component.
   */
  getViewByLayout = () =>
    config.views.layoutViews[
      this.props.content[getLayoutFieldname(this.props.content)]
    ] || null;

  /**
   * Cleans the component displayName (specially for connected components)
   * which have the Connect(componentDisplayName)
   * @method cleanViewName
   * @param  {string} dirtyDisplayName The displayName
   * @returns {string} Clean displayName (no Connect(...)).
   */
  cleanViewName = (dirtyDisplayName) =>
    dirtyDisplayName
      .replace('Connect(', '')
      .replace('injectIntl(', '')
      .replace(')', '')
      .replace('connect(', '')
      .toLowerCase();

  render() {
    const RenderedView =
      this.getViewByType() || this.getViewByLayout() || this.getViewDefault();
    return (
      <RenderedView
        content={this.props.content}
        location={this.props.location}
        token={this.props.token}
        history={this.props.history}
      />
    );
  }
}

const Title = (level) => ({ properties: { title } }) => {
  const As = level;
  return level === 'hidden' ? '' : <As>{title}</As>;
};

const ContentBlockView = (props) => {
  const { data = {}, block } = props;
  const { href = [] } = data;
  const dispatch = useDispatch();

  const url = href.length > 0 ? flattenToAppURL(href[0]['@id']) : null;
  const key = `${block}-${url}`;
  const blockData = useSelector(
    (state) => state.content.subrequests[key]?.data,
  );

  React.useEffect(() => {
    if (url && !blockData) {
      dispatch(getContent(url, null, key));
    }
  }, [url, block, blockData, dispatch, key]);

  return (
    <div className="block-content-embed">
      {blockData ? (
        blockData.blocks ? (
          <RenderBlocks
            content={blockData}
            blocksConfig={{
              ...config.blocks.blocksConfig,
              title: {
                ...config.blocks.blocksConfig.title,
                view: Title(data.title_style || 'h2'),
              },
            }}
            location={{ pathname: props.pathname }}
          />
        ) : (
          <View content={blockData} />
        )
      ) : (
        'Nothing yet'
      )}
    </div>
  );
};

export default ContentBlockView;
