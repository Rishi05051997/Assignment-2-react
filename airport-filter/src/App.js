import "./App.css";
import SearchBar from "./SearchBar/SearchBar.js";
import Table from "./Table/Table.js";
import data from "./utils/data.json";
import React, { useState } from "react";


function App() {
  ///// Belew searchType and setSeachType -->> State Management for user input from input whose type is text
  const [searchText, setsearchText] = useState("");
  ///// Belew searchByType and setsearchByType -->> State Management for user input from input whose type is radio
  const [searchByType, setsearchByType] = useState("");
  ///// Below two array for managing search state if user response come from input field having text type then filteredData will give filtered array based on user input value  if user response come from input field having radio type then filteredDataForType will give filtered array based on user input value
  let filteredData = [];
  let filteredDataForType = []

  ///// Below we defined one function whose work is to initilize an initial state of given data.json file like we are putting all data inside filtereddata array
  const initArr = () => {
    data.forEach(campaign => {
      if ((campaign.name.toLowerCase().indexOf(searchText.toLowerCase()) === -1)) {
        return;
      } 
      filteredData.push(campaign);
    });
  }
  //// below one we called or invoked our initArr function
  initArr();

  ///// below checkFilterationForType is a function we define. once user click on any of the radio button based on airports type for ex. small, medium, large, heliport and closed once that clicked we are sending one setsearchByType type state as a prop to the Searchbar component where we get response based on the user input value we are filtering the array in below function
  const checkFilterationForType = () => {
    //// here we are checking whether user input value is greater than 0 then and then only filteration will start working
    if (searchByType.length > 0) {
      filteredDataForType = filteredData.filter(({ type }) => searchByType.includes(type));
      filteredData = (filteredDataForType);
    }
  }

  checkFilterationForType();
  
  return (
    <div className="main-container">
      <div className="container">
        {/* Below one is Header */}
        <header className="header">
          <h1 className="head-1">Filter </h1> <h1 className="head-2">airports</h1>
        </header>
        {/* Below one is Searchbar Component here we are sending searchByType, setsearchByType, searchText, setsearchText as a props from App component to the Searchbar component*/}
        <SearchBar searchByType={searchByType} setsearchByType={setsearchByType} searchText={searchText} setsearchText={setsearchText} />
        {/* Below one is Table Component here we are sending data, length as a props rom App component to the Table component*/}
        <Table data={filteredData} length={filteredDataForType.length} />
      </div>

    </div>
  );
}

export default App;
