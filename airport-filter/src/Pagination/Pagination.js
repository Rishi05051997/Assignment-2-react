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

  //// Here we are using setters in a class we are setting how much elements need to be displayed on UI
  setPage(page) {
    
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    pager = this.getPager(items.length, page);

    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    this.setState({ pager: pager });

    this.props.onChangePage(pageOfItems);
  }

  //// Here we are using getterss in a class
  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;

    pageSize = pageSize || 4;

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


