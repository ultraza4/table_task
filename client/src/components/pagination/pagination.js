import React from "react";
import style from "./pagination.module.css";
const Pagination = ({ rowsPerPage, totalRows, paginate, currentPage }) => {

    // обьявляем массив страниц и передаем туда значения путем исчесления 
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={style.pagination}>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {pageNumbers.map(number => {
                        return <li key={number} className={currentPage === number ? "activePage" : "page-item"} >
                            <a onClick={() => paginate(number)} href="!#" className="page-link">
                                {number}
                            </a>
                        </li>
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;