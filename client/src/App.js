import './App.css';
import Table from './components/table/table';
import Pagination from './components/pagination/pagination';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Filtration from './components/filtration/filtration';

function App() {
  const baseURL = "http://localhost:4000/distance";
  const [tableData, setTableData] = useState([]);

  // хуки для пагинаций
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(8);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // хуки для фильтраций таблицы
  const [query, setQuery] = useState("");
  const [selectedColumn, setSelectedColumn] = useState('name');
  const [selectedMethod, setSelectedMethod] = useState('includes');
  const currentRows = filter(tableData).slice(indexOfFirstRow, indexOfLastRow); //в компоненту Table передаються уже отфильтрованные данные

  // Берем данные с нашего сервера
  useEffect(() => {
    axios.get(baseURL).then((res) => {
      setTableData(res.data);
    })

  }, [])

  //непосредственно сама функция для фильтраций
  function filter(rows) {
    if (selectedColumn === "name") {
      // в зависимости какой метод фильтраций выбран возвращаем отфильтрованный массив
      switch (selectedMethod) {
        case "includes":
          return rows.filter((row) => row[selectedColumn].toLowerCase().indexOf(query) > -1);
        case "equals":
          if (query === "") return rows;
          return rows.filter((row) => row[selectedColumn].toLowerCase() === query);
        default:
          console.log("Sorry, something went wrong");
      }
    }

    if (selectedColumn === "amount" || selectedColumn === "distance") {
      // в зависимости какой метод фильтраций выбран возвращаем отфильтрованный массив
      switch (selectedMethod) {
        case "includes":
          return rows.filter((row) => row[selectedColumn].toString().indexOf(query) > -1);
        case "equals":
          if (query === "") return rows;
          return rows.filter((row) => row[selectedColumn].toString() === query);
        case "more":
          if (query === "") return rows;
          return rows.filter((row) => row[selectedColumn].toString() > parseInt(query));
        case "less":
          if (query === "") return rows;
          return rows.filter((row) => row[selectedColumn] < parseInt(query));
        default:
          console.log("Sorry, something went wrong");
      }
    }
  }

  //коллбэки для компоненты с пагинацией
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
        query={query}
        selectedColumn={selectedColumn}
        selectedMethod={selectedMethod} />

      <Table data={currentRows} />
      <Pagination rowsPerPage={rowsPerPage} totalRows={filter(tableData).length} paginate={paginate} currentPage={currentPage} />
    </div>
  );
}

export default App;
