import React, { useState } from "react";
import Pagination from "../Pagination/Pagination.js";
import "./table.css";

const Table = props => {
  const [pageOfItems, setpageOfItems] = useState();
  //   let lastCategory = null;
  
  const rows = [];

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

  return (
    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>Name</th>
            <th >
              ICAO 
              
            </th>
            <th>IATA</th>
            <th>Elev.</th>
            <th>Lat.</th>
            <th>Long.</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <div className="elFound">
         {
        props.length > 0 ?`Items Found : ${props.length} `: ''
      }
      </div>
      <div className="pagination">
        <Pagination items={props.campaigns} onChangePage={setpageOfItems} />
      </div>
    </div>
  );
};

export default Table;
