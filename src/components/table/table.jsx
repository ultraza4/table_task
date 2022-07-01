import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './table.module.css';
import Filtration from "../filtration/filtration";

const Table = ({data}) => {
    return(
        <div className={style.table_container}>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) =>{
                        return(
                            <tr key={item.date}>
                                <td scope="row">{item.date}</td>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                                <td>{item.distance}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Filtration />
        </div>
    )
}

export default Table;