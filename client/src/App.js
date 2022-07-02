import './App.css';
import Table from './components/table/table';
import Table2 from './components/table/table2';
import Pagination from './components/pagination';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const baseURL = "http://localhost:4000/distance"
  const [tableData, setTableData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow,indexOfLastRow);

  const [query, setQuery] = useState("");
  const [selectedColumn, setSelectedColumn] = useState('name');
  const [selectedMethod, setSelectedMethod] = useState('includes');

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      setTableData(res.data);
      console.log(tableData.length);
    })
  }, [])

  function filter(rows) {
    if (selectedMethod === "includes") {
      return rows.filter((row) => row[selectedColumn].toLowerCase().indexOf(query) > -1)
    }
    if (selectedMethod === "more" && (selectedColumn == "amount" || selectedColumn == "distance")) {
      if (query == "") setQuery("0");
      return rows.filter((row) => row[selectedColumn] > parseInt(query))
    }
    if (selectedMethod === "less" && (selectedColumn == "amount" || selectedColumn == "distance")) {
      if (query == "") setQuery("0");
      return rows.filter((row) => row[selectedColumn] < parseInt(query))
    }
  }

  return (
    <div className="App">
      <Table data={filter(currentRows)} />
      <Pagination rowsPerPage = {rowsPerPage} totalRows = {tableData.length}/>
      <h4>Filtration</h4>
      <div className="filtration_form">
        <div className="select_form">
          <select onChange={(e) => setSelectedColumn(e.target.value)} class="form-select" aria-label="Default select example">
            <option value="name">Name</option>
            <option value="amount">Amount</option>
            <option value="distance">Distance</option>
          </select>
        </div>
        <div className="select_form">
          <select onChange={(e) => setSelectedMethod(e.target.value)} className="form-select" aria-label="Default select example">
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
              value={query}
              onChange={(e) => { setQuery(e.target.value) }}
              class="form-control"
              placeholder="Filtration value"
              aria-label="Filtration value"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
