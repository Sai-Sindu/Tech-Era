import {Link} from 'react-router-dom'

import './index.css'

const CoursesItem = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="link-card">
      <li className="course-item-card">
        <img src={logoUrl} alt={name} className="logo-img" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CoursesItem
