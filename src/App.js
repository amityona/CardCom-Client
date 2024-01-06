import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { peopleApi } from './utils/urls';
import CustomRow from './components/CustomRow';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddPeopleModal from './components/AddPeopleModal';

function App() {


  const [isOpenAddModal, setModalStatus] = useState(false);
  const [peoples, setPeople] = useState([])
  const [loading, SetLoading] = useState(false);

  const onClickrefreshData = () => {
    setPeople([]);
    fetchData();
  }

  async function fetchData() {
    SetLoading(true);
    try {
      const data = await axios.get(`${peopleApi}`);

      setPeople(data.data);
    }
    catch (err) {
      alert("Fail Fetch The Data")
    }
    finally {
      SetLoading(false);
    }
  }

  useEffect(() => {

    fetchData();

  }, [])
  return (
    <div className="w-full  h-screen bg-slate-600 text-white overflow-y-auto relative">
      {loading && <div> Loading... </div>}

      {/* Buttons */}
      <div className='flex justify-center items-center space-x-5'>
        <IconButton className=' flex justify-center text-center pt-10' color="success" aria-label="icon button" onClick={() => { onClickrefreshData(); }}>
          <div className='flex flex-col items-center  mt-10'>
            <RefreshIcon />
            <p className='text-green-400'>REFRESH</p>
          </div>
        </IconButton>

        <IconButton className=' flex justify-center text-center pt-10' color="primary" aria-label="icon button" onClick={() => { setModalStatus(true); }}>
          <div className='flex flex-col items-center mt-10'>
            <AddIcon />
            <p className="bg-blue-900-400">ADD</p>
          </div>
        </IconButton>


      </div>

      {isOpenAddModal && <AddPeopleModal handleClose={setModalStatus} editClick={onClickrefreshData} />}

      {/* Table Display The Data*/}
      <div className='p-16 '>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>BirhDay</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Action</th>

          </tr>

          {peoples.map((people) => {
            return <CustomRow people={people} editClick={onClickrefreshData} />

          })}
        </table>
        {peoples.length === 0 && <div className='text-center w-full mt-10'>Empty Data</div>}
      </div>

    </div>
  );
}

export default App;
