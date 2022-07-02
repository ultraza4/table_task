import React from "react";
import style from './filtration.module.css';

const Filtration = ({ columnHandler, methodHandler, queryHandler, query }) => {
    return (<>
        <h4>Table Filtration</h4>
        <div className={style.filtration_form}>
            <div className={style.select_form}>
                <select onChange={(e) => columnHandler(e.target.value)} class="form-select" aria-label="Default select example">
                    <option value="name">Name</option>
                    <option value="amount">Amount</option>
                    <option value="distance">Distance</option>
                </select>
            </div>
            <div className={style.select_form}>
                <select onChange={(e) => methodHandler(e.target.value)} className="form-select" aria-label="Default select example">
                    <option value="includes">includes</option>
                    <option value="equals">equals</option>
                    <option value="more">more than</option>
                    <option value="less">less than</option>
                </select>
            </div>
            <div className={style.input_form}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => { queryHandler(e.target.value) }}
                        class="form-control"
                        placeholder="Filtration value"
                        aria-label="Filtration value"
                    />
                </div>
            </div>
        </div>
    </>)
}

export default Filtration;