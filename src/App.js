
import './App.css';
import Table from './components/table/table';
import Loader from './components/loader';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const baseURL = "http://localhost:3000/table_data"
  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] =useState(true);
  
  useEffect(() => {
    axios.get(baseURL).then((res) =>{
      setTableData(res.data);
      setLoading(false);
    })
  },[])
  
  return (
    <div className="App">
      {isLoading ? <Loader /> : <Table data = {tableData}/>}
    </div>
  );
}

export default App;
