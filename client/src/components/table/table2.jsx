import React,{useState} from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function Basic({data}) {
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'Id',
        field: 'id',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Id',
        },
      },
      {
        label: 'Date',
        field: 'date',
        width: 270,
      },
      {
        label: 'Name',
        field: 'name',
        width: 200,
      },
      {
        label: 'Amount',
        field: 'amount',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Distance',
        field: 'distance',
        sort: 'disabled',
        width: 100,
      },
    ],
    rows: data,
  });

  return <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />;
}