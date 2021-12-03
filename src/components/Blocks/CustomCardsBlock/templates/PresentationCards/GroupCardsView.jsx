import React from 'react';
import { Card } from 'semantic-ui-react';
import { Card as CardItem } from '@eeacms/volto-freshwater/components';

const GroupCardsView = (props) => {
  const {
    cards,
    border_color,
    image_height,
    image_scale,
    cards_per_row,
    isEditMode,
  } = props;

  return (
    <Card.Group
      className="presentation-cards-group"
      {...(cards_per_row && cards_per_row > 0
        ? { itemsPerRow: cards_per_row }
        : {})}
    >
      {(cards || []).map((card, index) => (
        <CardItem
          key={index}
          card={card}
          border_color={border_color}
          image_height={image_height}
          image_scale={image_scale}
          isEditMode={isEditMode}
        />
      ))}
    </Card.Group>
  );
};

export default GroupCardsView;
