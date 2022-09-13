/*

  Reusable Component
  
*/

import React from "react";
import { Button, InputGroup, Form } from "react-bootstrap";

const SearchBar = ({
  placeholder,
  searchInput,
  handleSearchInputChange,
  handleClearInput,
}) => {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder={placeholder}
      />
      {searchInput ? (
        <Button
          variant="outline-secondary"
          id="btnClear"
          onClick={handleClearInput}
        >
          Clear
        </Button>
      ) : null}
    </InputGroup>
  );
};

export default SearchBar;
