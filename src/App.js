import './App.css';
import Table from './components/table/table';
import Loader from './components/loader';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const baseURL = "http://localhost:3000/table_data"
  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] =useState(true);
  
  const [query, setQuery] = useState("");
  // const [selectedColumn, setSelectedColumn] = useState();
  // const [selectedMethod, setSelectedMethod] = useState();

  function filter(rows) {
    return rows.filter((row) => row.name.toLowerCase().indexOf(query) > -1)
  }

  useEffect(() => {
    axios.get(baseURL).then((res) =>{
      setTableData(res.data);
      setLoading(false);
    })
  },[])
  
  return (
    <div className="App">
      {isLoading ? <Loader /> : <Table data = {filter(tableData)}/>}
      <h4>Filtration</h4>
            <div className="filtration_form">
                <div className="select_form">
                    <select class="form-select" aria-label="Default select example">
                        <option value="name">Name</option>
                        <option value="amount">Amount</option>
                        <option value="distance">Distance</option>
                    </select>
                </div>
                <div className="select_form">
                    <select className="form-select" aria-label="Default select example">
                        <option value="includes">includes</option>
                        <option value="equals">equals</option>
                        <option value="more">more than</option>
                        <option value="less">less than</option>
                    </select>
                </div>
                <div className="input_form">
                    <div className="input-group mb-3">
                        <input 
                        type="text" 
                        value = {query}
                        onChange ={(e)=>{setQuery(e.target.value); console.log(query)}}
                        class="form-control"
                        placeholder="Filtration value" 
                        aria-label="Filtration value" 
                        aria-describedby="button-addon2" />
                    </div>
                </div>
            </div>
    </div>
  );
}

export default App;
