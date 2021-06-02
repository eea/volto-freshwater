import React from 'react';
import PresentationCardsView from './PresentationCardsView';

const PresentationCardsEdit = (props) => {
  const { data = {} } = props;
  const { cards = [] } = data;
  const [refresh, forceRefresh] = React.useState(0);

  React.useEffect(() => {
    cards.forEach((card, index) => {
      if (!card.title && card.source?.length) {
        card.title = card.source[0].title;
        card.description = card.source[0].Description;
        card.link = card.source[0].getURL;
        forceRefresh(refresh + 1);
      }
      if ((card.title || card.description) && !card.source?.length) {
        card.title = null;
        card.description = null;
        card.link = null;
        forceRefresh(refresh + 1);
      }
    });
  }, [cards, refresh]);

  return <PresentationCardsView {...props} isEditMode />;
};

export default PresentationCardsEdit;
