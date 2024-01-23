import './index.css'
import { useState } from 'react'
import Programs from "../../components/Programs"
import Pagination from '@mui/material/Pagination'


const Favory: React.FC = () => {

  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  return (
    <section className="favory-container">
      <h1>Mes favoris</h1>
      <Programs 
        type="favory"
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

export default Favory;