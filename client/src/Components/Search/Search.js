import React from 'react';
import './Search.css';
import ReactSearchBox from 'react-search-box';

const Search = ({ data }) => {
    // console.log(data)

    return (
        < ReactSearchBox
            data={data}
            placeholder="Search by name, mobile, email ..."
            inputBoxFontSize="20px"
        />
    )
}

export default Search;