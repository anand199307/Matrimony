import React from 'react';
import { SearchContainer, InputBox } from './HeaderStyled';
import Serach from '../../../assets/Search.png';

// Create the SearchBox component
const SearchBox: React.FC = () => {
  return (
    <SearchContainer>
      <div className="searchIcon">
        <img src={Serach} alt="no img" />
      </div>
      <InputBox type="text" placeholder="Search" />
    </SearchContainer>
  );
};

export default SearchBox;
