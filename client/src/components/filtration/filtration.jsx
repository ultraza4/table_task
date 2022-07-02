import React from "react";
import style from './filtration.module.css';

const Filtration = () => {
    return (
        <div className={style.filtration_form}>
            <div className={style.select_form}>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Choose column</option>
                    <option value="1">Name</option>
                    <option value="2">Amount</option>
                    <option value="3">Distance</option>
                </select>
            </div>
            <div className={style.select_form}>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Сomparison method</option>
                    <option value="1">includes</option>
                    <option value="2">equals</option>
                    <option value="3">more than</option>
                    <option value="3">less than</option>
                </select>
            </div>
            <div className={style.input_form}>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Filtration value" aria-label="Filtration value" aria-describedby="button-addon2" />
                    <button onClick={()=>{}} class="btn btn-outline-secondary" type="button" id="button-addon2">Filter</button>
                </div>
            </div>
        </div>
    )
}

export default Filtration;