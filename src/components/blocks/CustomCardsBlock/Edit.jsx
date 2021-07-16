import React from 'react';
import { SidebarPortal } from '@plone/volto/components'; // EditBlock
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import config from '@plone/volto/registry';
import CustomCardsView from './View';
import cards_schema from './schema';

const tweakSchema = (schema, data) => {
  const { blockRenderers } = config.blocks.blocksConfig.customCardsBlock;
  const renderers = Object.keys(blockRenderers).map((k) => [
    k,
    blockRenderers[k].title,
  ]);
  schema.properties.display.choices = renderers;

  const extension = data.display
    ? blockRenderers[data.display].schemaExtender
    : null;
  return extension ? extension(schema, data) : schema;
};

const CustomCardsEdit = (props) => {
  const schema = tweakSchema(cards_schema(props), props.data);
  const display = props.data.display || 'presentation_cards';
  const CardsView =
    config.blocks.blocksConfig.customCardsBlock.blockRenderers?.[display]
      ?.edit || CustomCardsView;

  const { data = {} } = props;
  const { cards = [] } = data;
  const [refresh, forceRefresh] = React.useState(0);

  React.useEffect(() => {
    cards.forEach((card, index) => {
      if (card.source?.length && !card.title) {
        card.title = card.source[0].title;
        card.description = card.source[0].Description;
        card.link = card.source[0].getURL;
        card.item_type = card.source[0]?.Type;
        forceRefresh(refresh + 1);
      }
    });
  }, [cards, refresh]);

  return (
    <>
      <CardsView {...props} data={props.data} isEditMode />

      <SidebarPortal selected={props.selected}>
        <InlineForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              [id]: value,
            });
          }}
          formData={props.data}
          block={props.block}
        />
      </SidebarPortal>
    </>
  );
};

export default CustomCardsEdit;
