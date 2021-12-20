import React from "react";
import "./pagination.css";

///// Here we are creating one Pagination Component as Class
export default class Pagination extends React.Component {
  ///// Here we are defining one Parameterized constructor 
  constructor(props) {
    //// Super method for accessing all properties which are coming from parent component i.e.., Table component
    super(props);
    //// Here we are creating one pager state 
    this.state = { pager: {} };
  }

  /// componentWillMount triggers before the initial render, and the function will only trigger once in the lifespan of a component. So here we called one setPage function and passed this.props.initialPage as a argument to the this.setPage function 
  componentWillMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  /// The componentDidUpdate is particularly useful when an operation needs to happen after the DOM is updated and the update queue is emptied. It's probably most useful on complex renders and state or DOM changes or when you need something to be the absolutely last thing to be executed.

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  //// Here we are using setters in a class we are setting how much elements need to be displayed on UI, so inside setPage function we pass page as an argument
  setPage(page) {
    //// here we are storing whole data which is coming as a array from Table.js file as a props i.e.., items in items varibale
    var items = this.props.items;
    ///// here we are storing pager state in pager varible with var keyword means its accessible outside the function scope as well
    var pager = this.state.pager;

    ///// page value is less than 1 or page value is more than entire data length then we are returning inital condition
    if (page < 1 || page > pager.totalPages) {
      return;
    }

    ////// Here we are storing getter function i.e.., getPager(1st, 2nd) function which are passing two parameters 1st one array length in integer format, page value inside pager state variable
    pager = this.getPager(items.length, page);

    ////// here we are storing items.slice(1st index, last index); inside pageOfItems as an array format. Slice method() method returns selected elements in an array, as a new array. The slice() method selects from a given start, up to a (not inclusive) given end.The slice() method does not change the original array.
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    ///// here we are storing pager variable state inside pager state
    this.setState({ pager: pager });

    ///// Here we are using lifting the state up concept so we are setting Table.js state i.e.., setpageOfItems as a props i.e.., onChangePage props
    this.props.onChangePage(pageOfItems);
  }

  //// Here we are using getters in a class, getPager function we passed 3 arguments, i.e.., totalItems, currentPage and pageSize
  getPager(totalItems, currentPage, pageSize) {
    
    //// currentPage we stored atleast 1 value either currentPage or 1
    currentPage = currentPage || 1;

    ////  pageSize we stored atleast 1 value either pageSize or 4 for displaying atleast 4 rows on UI
    pageSize = pageSize || 4;

    //// Here we are finding total no of pages by dividing totalItems by pageSize and storing into totalPages variable
    var totalPages = Math.ceil(totalItems / pageSize);

    
    var startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      
      <ul className="pagination-list">
        <li
          className={`pagination-list-items ${
            pager.currentPage === 1 ? "disabled" : ""
          }`}
        >
          <a id="leftIcon" href="/" onClick={(e) => {
            e.preventDefault();
            this.setPage(1)
          }}>&lt;&lt;</a>
        </li>
        <li
          className={`pagination-list-items ${
            pager.currentPage === 1 ? "disabled" : ""
          }`}
        >
          <a href="/" onClick={(e) => {
            e.preventDefault();
            this.setPage(pager.currentPage - 1)
          }}>&lt;</a>
        </li>
        {pager.pages.map((page, index) => (
          <li
            key={index}
            className={`pagination-list-items ${
              pager.currentPage === page ? "active" : ""
            }`}
          >
            <a href="/" onClick={(e) => {
              e.preventDefault();
              this.setPage(page);
            }}>{page}</a>
          </li>
        ))}
        <li
          className={`pagination-list-items ${
            pager.currentPage === pager.totalPages ? "disabled" : ""
          }`}
        >
          <a href="/" onClick={(e) => {
            e.preventDefault();
            this.setPage(pager.currentPage + 1)
          }}>&gt;</a>
        </li>
        <li
          className={`pagination-list-items ${
            pager.currentPage === pager.totalPages ? "disabled" : ""
          }`}
        >
          <a href="/" onClick={(e) => {
            e.preventDefault();
            this.setPage(pager.totalPages)
          }}>&gt;&gt;</a>
        </li>
      </ul>
      
    );
  }
}


