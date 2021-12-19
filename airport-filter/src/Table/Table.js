import React, { useState } from "react";
import Pagination from "../Pagination/Pagination.js";
import "./table.css";

const Table = props => {
  ///// Here we are creating one State for displaying specific number of rows on UI
  const [pageOfItems, setpageOfItems] = useState();
  //// Here we are creating rows array for rendering each array on UI
  const rows = [];

  ///// renderAllArrays is a function where we are rendering each row one by one one UI using forEach method on Array
  const renderAllArrays = () => {
    pageOfItems?.forEach((info, key) => {
      rows.push(
        <tr key={key}>
          <td>{info.name}</td>
          <td>{info.icao}</td>
          <td>{info.iata}</td>
          <td>{info.elevation}</td>
          <td>{info.latitude}</td>
          <td>{info.longitude}</td>
          <td>{info.type}</td>
        </tr>
      );
    });
  }
  //// belew we called renderAllArrays() function
  renderAllArrays();

  return (
    <div>
      {/* Below one is Table We are displaying json data as rows */}
      <div className="tableCont">
      <table id="table">
        {/* Below one is theade We are displaying headers for the table for ex. Name, ICAO, IATA.. etc */}
        <thead>
          <tr>
            <th>Name</th>
            <th>ICAO </th>
            <th>IATA</th>
            <th>Elev.</th>
            <th>Lat.</th>
            <th>Long.</th>
            <th>Type</th>
          </tr>
        </thead>
        {/* Below one is tbody in this we are displaying each row of data.json file on UI  */}
        <tbody>{rows}</tbody>
      </table>
      </div>
      {/* Below one is div in this we are displaying how much filtered results we got based on user input on UI  */}
      <div className="elFound">
        {
          props.length > 0 ?`Items Found : ${props.length} `: ''
        }
      </div>
      {/* Below one is Pagination Component where we are sending items ,onChangePage as a props from Table component to the Pagination Component   */}
      <div className="pagination">
        <Pagination items={props.data} onChangePage={setpageOfItems} />
      </div>
    </div>
  );
};

export default Table;
