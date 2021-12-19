import {React} from "react";
import "./searchbar.css";
import debounce from "../utils/debounce.js";
const SearchBar = props => {

  /// handleSearchTextChange is a function we basically taking user input value having text type and put that input value into setsearchText state which is coming from App component as a props
  const handleSearchTextChange = e => {
    props.setsearchText(e[0].target.value);
  };
  /// checkHanlderForSmall is a function we basically taking user input value having radio type and put that input value into setsearchByType state which is coming from App component as a props
  const checkHanlderForSmall = (e) => {
    if(e.target.checked === true){
      props.setsearchByType(e.target.value);
    }
    
  }
  
  return (
    <div className="formBox">
      
       {/* Below one is radio input field here user can give his/her response  */}
      <div className="inputField checks">
        <label htmlFor="">Type</label>
        <div id="radioBtns">
          <input type="radio" onChange={checkHanlderForSmall} name="small" value="small" id="" />Small
          <input type="radio" onChange={checkHanlderForSmall} name="small"  value="medium" id="" />Medium
          <input type="radio" onChange={checkHanlderForSmall} name="small" value="large" id="" />Large
          <input type="radio" onChange={checkHanlderForSmall}name="small" value="heliport" id="" />Heliport
          <input type="radio" onChange={checkHanlderForSmall} name="small" value="closed" id="" />Closed
        </div>
      </div>
      {/* Below one is text input field here user can give his/her response  */}
      <div className="inputField">
        <label >Type By Search</label>
        <input className="search-input" type="text" placeholder="Search by Name" onChange={debounce(handleSearchTextChange, 2000)}/>
      </div>
    </div>
  );
};

export default SearchBar;
