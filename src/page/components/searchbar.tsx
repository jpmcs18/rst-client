import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

export default function SearchBar({
  search,
  placeholder,
  value,
}: {
  search: (key: string) => void;
  placeholder?: string;
  value?: string;
}) {
  const [searchKey, setSearchKey] = useState<string>(() => value ?? '');

  function onKeyPress(key: React.KeyboardEvent<HTMLDivElement>) {
    if (key.key === 'Enter') {
      search(searchKey);
    }
  }

  function searchKeyChange(val: {
    target: { value: React.SetStateAction<string> };
  }) {
    setSearchKey(val.target.value);
  }

  function searchClick() {
    search(searchKey);
  }
  return (
    <div className='custom-input searchbar'>
      <div className='input-container'>
        <input
          type='text'
          className='name'
          placeholder={placeholder ?? 'Search...'}
          value={searchKey}
          onChange={searchKeyChange}
          onKeyUp={onKeyPress}
        />
        <div className='magnify-container'>
          <FontAwesomeIcon
            className='search-icon'
            icon={faSearch as IconProp}
            onClick={searchClick}
          />
        </div>
      </div>
    </div>
  );
}
