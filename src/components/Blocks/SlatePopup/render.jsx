import React from 'react';
import { Popup } from 'semantic-ui-react';

export const SlatePopupElement = (props) => {
  const { attributes, children, mode, element } = props;
  const { data = {} } = element;

  return (
    <>
      {mode === 'view' ? (
        <Popup
          hoverable
          position={data.popup_position}
          trigger={
            <span {...attributes} className="slate-popup-item">
              {children}
            </span>
          }
        >
          <Popup.Content>{data.popup_text}</Popup.Content>
        </Popup>
      ) : (
        <Popup
          hoverable
          position={data.popup_position}
          trigger={
            <span
              {...attributes}
              className="slate-popup-item slate-popup-edit-node"
            >
              {children}
            </span>
          }
        >
          <Popup.Content>{data.popup_text}</Popup.Content>
        </Popup>
      )}
    </>
  );
};
