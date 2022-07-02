import React from "react";
import style from "../App.css";
const Pagination = ({ rowsPerPage, totalRows }) => {
    const pageNumbers =[];
    
    for(let i = 0; i <= Math.ceil(totalRows / rowsPerPage); i++){
        pageNumbers.push(i);
    }
    
    return(
        <div className={style.pagination}>
            <nav>
            <ul className="pagination">
                {pageNumbers.map(number => {
                    return <li key={number} className = "page-item">
                        <a href="/" className="page-link">
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