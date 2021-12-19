import {React} from "react";
import "./searchbar.css";
import debounce from "../utils/debounce.js";
const SearchBar = props => {
  const handleSearchTextChange = e => {
    props.setsearchText(e[0].target.value);
  };

  
  
  
  const checkHanlderForSmall = (e) => {
    // debugger;
    
    if(e.target.checked === true){
      props.setsearchByType(e.target.value);
    }
    
  }
  
  return (
    <div className="formBox">
      {/* <form> */}
      <div className="inputField checks">
        <label htmlFor="">Type</label>
        <div>
          <input type="radio" onChange={(checkHanlderForSmall)} name="small" value="small" id="" />Small
          <input type="radio" onChange={checkHanlderForSmall} name="small"  value="medium" id="" />Medium
          <input type="radio" onChange={checkHanlderForSmall} name="small" value="large" id="" />Large
          <input type="radio" onChange={checkHanlderForSmall}name="small" value="heliport" id="" />Heliport
          <input type="radio" onChange={checkHanlderForSmall} name="small" value="closed" id="" />Closed
        </div>
      </div>
      <div className="inputField">
        <label >Type By Search</label>
        <input
          className="search-input"
          type="text"
          placeholder="Search by Name"
          onChange={debounce(handleSearchTextChange, 2000)}
        />
        

      </div>

    {/* </form> */}
    </div>
  );
};

export default SearchBar;
