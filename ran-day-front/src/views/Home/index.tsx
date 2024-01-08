import './index.css'
import SearchForm from '../../components/SearchForm'
import Places from '../../components/Places'


const Home: React.FC = () => {
  return (
    <div className="grid-home">
      <section className="welcome">
        <h1>
          <span>Le </span>
          <span>programme de votre journée</span>
          <span> sans y passer la journée.</span>
        </h1>
        <h2>
          Choisissez un lieu, une date et on s'occupe du reste.
        </h2>
      </section>
      <section className="search">
        <SearchForm />
      </section>
      <section className="places">
        <Places />
      </section>
    </div>
  )
}

export default Home