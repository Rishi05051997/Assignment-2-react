import React from "react";
import "./pagination.css";

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    console.log(this.props);
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

  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;

    pageSize = pageSize || 10;

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


