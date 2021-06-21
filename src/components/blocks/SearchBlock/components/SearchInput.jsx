import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchInput = (props) => {
  const { data, searchText, setSearchText, isLive, onTriggerSearch } = props;
  const timeoutRef = React.useRef();

  return (
    <div className="search-input">
      {data.searchInputPrompt && (
        <label className="search-block-prompt">{data.searchInputPrompt}</label>
      )}
      <Input
        id={`${props.id}-searchtext`}
        value={searchText}
        placeholder="Search..."
        fluid
        onKeyPress={(event) => {
          if (isLive || event.key === 'Enter') onTriggerSearch(searchText);
        }}
        onChange={(event, { value }) => {
          setSearchText(value);
          if (isLive) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              onTriggerSearch(value);
            }, 1000);
          }
        }}
      />
    </div>
  );
};

export default SearchInput;
