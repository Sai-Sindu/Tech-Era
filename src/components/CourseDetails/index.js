import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const courseDetailsApiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {
    courseDetails: {},
    courseDetailsApiStatus: courseDetailsApiStatusConst.initial,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({
      courseDetailsApiStatus: courseDetailsApiStatusConst.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(courseDetailsApiUrl)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        courseDetailsApiStatus: courseDetailsApiStatusConst.success,
        courseDetails: updatedData,
      })
    } else {
      this.setState({
        courseDetailsApiStatus: courseDetailsApiStatusConst.failure,
      })
    }
  }

  onClickRetryCourseDetails = () => {
    this.getCourseDetails()
  }

  renderCourseDetailsLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#1e293b" height={50} width={50} />
    </div>
  )

  renderCourseDetailsFailureView = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry"
        onClick={this.onClickRetryCourseDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderCourseDetailsSuccessView = () => {
    const {courseDetails} = this.state
    const {name, description, imageUrl} = courseDetails

    return (
      <div className="course-details-container">
        <div className="course-details-card">
          <img src={imageUrl} alt={name} className="image" />
          <div className="description-card">
            <h1 className="heading">{name}</h1>
            <p className="details">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderCourseDetailsDataStatusView = () => {
    const {courseDetailsApiStatus} = this.state
    switch (courseDetailsApiStatus) {
      case courseDetailsApiStatusConst.inProgress:
        return this.renderCourseDetailsLoadingView()
      case courseDetailsApiStatusConst.success:
        return this.renderCourseDetailsSuccessView()
      case courseDetailsApiStatusConst.failure:
        return this.renderCourseDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseDetailsDataStatusView()}
      </>
    )
  }
}
export default CourseDetails
