import {
  PlainCardsView,
  ColoredCardsView,
  PresentationCardsView,
} from '@eeacms/volto-freshwater/components/Blocks/CustomBlockTemplates/VoltoBlockImageCards';

const customBlockTemplates = (config) => ({
  ...config.blocks.blocksConfig,
  imagecards: {
    sidebarTab: 1,
    ...config.blocks.blocksConfig.imagecards,
    display_types: {
      ...config.blocks.blocksConfig.imagecards?.display_types,
    },
    blockRenderers: {
      plain_cards: {
        title: 'Plain cards',
        view: PlainCardsView,
        schema: PlainCardsView.schema,
        schemaExtender: PlainCardsView.schemaExtender,
      },
      colored_cards: {
        title: 'Colored cards',
        view: ColoredCardsView,
        schema: ColoredCardsView.schema,
        schemaExtender: ColoredCardsView.schemaExtender,
      },
      metadata_cards: {
        title: 'Metadata Cards',
        view: PresentationCardsView,
        schema: PresentationCardsView.schema,
        schemaExtender: PresentationCardsView.schemaExtender,
      },
      presentation_cards: {
        title: 'Pesentation cards',
        view: PresentationCardsView,
        schema: PresentationCardsView.schema,
        schemaExtender: PresentationCardsView.schemaExtender,
      },
      ...config.blocks.blocksConfig.imagecards?.blockRenderers,
    },
  },
});
export default customBlockTemplates;
