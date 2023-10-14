import './index.css'
import {Link} from 'react-router-dom'

const Header = () => (
  <div className="header-card">
    <Link to="/">
      <img
        className="image-logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </div>
)

export default Header
