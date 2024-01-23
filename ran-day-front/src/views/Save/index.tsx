import './index.css'
import { useState } from 'react'
import Programs from "../../components/Programs"
import Pagination from '@mui/material/Pagination'


const Save: React.FC = () => {

  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  return (
    <section className="save-container">
      <h1>Enregistrés</h1>
      <Programs 
        type="save"
        page={page}
        setLastPage={setLastPage}
      />
      <div className="pagination-container">
        {
          lastPage > 1 &&
          <Pagination count={lastPage} page={page} onChange={handleChange} />
        }
      </div>
    </section>
  )
}

export default Save;