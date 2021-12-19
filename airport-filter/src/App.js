import "./App.css";
import SearchBar from "./SearchBar/SearchBar.js";
import Table from "./Table/Table.js";
import campaigns from "./utils/data.json";
import React, { useState } from "react";
// import icon from "./../"

function App() {
  const [searchText, setsearchText] = useState("");
  const [searchByType, setsearchByType] = useState("");
  
  
  

  let filteredData = [];
  let filteredStores = []

  campaigns.forEach(campaign => {
    // debugger
    if ((campaign.name.toLowerCase().indexOf(searchText.toLowerCase()) === -1)) {
      return;
    } 
    
    filteredData.push(campaign);

    if(searchByType.length < 0){
      filteredData.push(campaign);
    }
  });

  if (searchByType.length > 0) {
      
    filteredStores = filteredData.filter(({ type }) => searchByType.includes(type));
     console.log(filteredStores);
     
     filteredData = (filteredStores);
     
   }
   
  
  



  return (
    <div className="main-container">
      <div className="container">
        <header className="header">
          <h1 className="head-1">Filter </h1> <h1 className="head-2">airports</h1>
          {/* <img src={icon} alt="" /> */}
        </header>
        {/* <div className="formFieldBox"> */}
        <SearchBar searchByType={searchByType} setsearchByType={setsearchByType} searchText={searchText} setsearchText={setsearchText} />
        {/* </div> */}


        <Table campaigns={filteredData} length={filteredStores.length} />

      </div>

    </div>
  );
}

export default App;
