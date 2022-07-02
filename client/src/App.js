import './App.css';
import Table from './components/table/table';
import Pagination from './components/pagination/pagination';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Filtration from './components/filtration/filtration';

function App() {
  const baseURL = "http://localhost:4000/distance"
  const [tableData, setTableData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(8);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const [query, setQuery] = useState("");
  const [selectedColumn, setSelectedColumn] = useState('name');
  const [selectedMethod, setSelectedMethod] = useState('includes');
  const currentRows = filter(tableData).slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      setTableData(res.data);
    })
  }, [])

  function filter(rows) {

    if (selectedMethod === "includes" && selectedColumn === "name") {
      return rows.filter((row) => row[selectedColumn].toLowerCase().indexOf(query) > -1)
    }
    if (selectedMethod === "more" && (selectedColumn === "amount" || selectedColumn === "distance")) {
      if (query === "") setQuery("0");
      return rows.filter((row) => row[selectedColumn] > parseInt(query))
    }
    if (selectedMethod === "less" && (selectedColumn === "amount" || selectedColumn === "distance")) {
      if (query === "") setQuery("0");
      return rows.filter((row) => row[selectedColumn] < parseInt(query));
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const columnHandler = (value) => setSelectedColumn(value);
  const methodHandler = (value) => setSelectedMethod(value);
  const queryHandler = (value) => setQuery(value);

  return (
    <div className="App">
      <Filtration
        columnHandler={columnHandler}
        methodHandler={methodHandler}
        queryHandler={queryHandler}
        query={query} />
      <Table data={currentRows} />
      <Pagination rowsPerPage={rowsPerPage} totalRows={filter(tableData).length} paginate={paginate} />
    </div>
  );
}

export default App;
