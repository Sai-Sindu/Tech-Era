import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CoursesItem from '../CoursesItem'

import './index.css'

const coursesApiUrlStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    coursesList: [],
    coursesApiUrlStatus: coursesApiUrlStatusConst.initial,
  }

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({coursesApiUrlStatus: coursesApiUrlStatusConst.inProgress})
    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(coursesApiUrl)
    if (response.ok) {
      const coursesData = await response.json()

      const updatedData = coursesData.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({
        coursesApiUrlStatus: coursesApiUrlStatusConst.success,
        coursesList: updatedData,
      })
    } else {
      this.setState({coursesApiUrlStatus: coursesApiUrlStatusConst.failure})
    }
  }

  onClickRetry = () => {
    this.getCoursesList()
  }

  renderCoursesLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#1e293b" height={50} width={50} />
    </div>
  )

  renderCoursesFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view-title">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry()}
      >
        Retry
      </button>
    </div>
  )

  renderCoursesSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="courses-container">
        <h1 className="course-title">Courses</h1>
        <ul className="courses-list-container">
          {coursesList.map(eachCourse => (
            <CoursesItem courseDetails={eachCourse} key={eachCourse.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderCoursesDataStatusView = () => {
    const {coursesApiUrlStatus} = this.state
    switch (coursesApiUrlStatus) {
      case coursesApiUrlStatusConst.inProgress:
        return this.renderCoursesLoadingView()
      case coursesApiUrlStatusConst.success:
        return this.renderCoursesSuccessView()
      case coursesApiUrlStatusConst.failure:
        return this.renderCoursesFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCoursesDataStatusView()}
      </>
    )
  }
}

export default Home
