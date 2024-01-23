import './index.css'
import BrandIconFooter from '../icons/BrandIconFooter'


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="border">
        <div className="footer-top">
          <div>
            <BrandIconFooter />
            <p>Une application pour vous aider à programmer vos journées.</p>
          </div>
          <div>
            <h3>Ressources</h3>
            <a
              className="footer-link"
              href='https://www.openstreetmap.fr'
              target='_blank'
            >
              OpenStreetMap
            </a>
            <a
              className="footer-link"
              href='https://www.openstreetmap.fr'
              target='_blank'
            >
              API Gouv
            </a>
            <a
              className="footer-link"
              href='https://pixabay.com/fr'
              target='_blank'
            >
              Pixabay
            </a>
          </div>
          
        </div>
        <p className="footer-copyright">©Copyright 2023 - RanDay</p>
      </div>
    </footer>
  )
}

export default Footer