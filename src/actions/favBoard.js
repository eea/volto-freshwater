export const addItemToBasket = (basket) => {
  return {
    type: 'ADD_TO_BASKET',
    payload: basket,
  };
};

export const removeItemFromBasket = (basket) => {
  return {
    type: 'REMOVE_FROM_BASKET',
    payload: basket,
  };
};
