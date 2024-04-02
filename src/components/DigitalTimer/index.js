import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 60, timerId: 0, status: 'Paused'}

  startTimer = () => {
    const uniqueId = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds === 1 ? 60 : prevState.seconds - 1,
        minutes:
          prevState.seconds === 60 ? prevState.minutes - 1 : prevState.minutes,
      }))
    }, 1000)
    this.setState({timerId: uniqueId})
  }

  onStart = () => {
    const {status, timerId, seconds, minutes} = this.state
    if (status === 'Paused') {
      this.setState({status: 'Running'})
      this.startTimer()
    } else {
      clearInterval(timerId)
      this.setState({status: 'Paused'})
    }
  }

  onReset = () => {
    const {timerId} = this.state
    clearInterval(timerId)
    this.setState({minutes: 25, seconds: 60, s2: '00', status: 'Paused'})
  }

  onIncTime = () => {
    const {status, seconds} = this.state
    if (status === 'Paused' && seconds === 60) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
      }))
    }
  }

  onDecTime = () => {
    const {status, seconds} = this.state
    if (status === 'Paused' && seconds === 60) {
      this.setState(prevState => ({
        minutes: prevState.minutes === 1 ? 1 : prevState.minutes - 1,
      }))
    }
  }

  render() {
    const {minutes, seconds, status, timerId} = this.state
    console.log(status, minutes, seconds)
    const displaySec = seconds >= 1 && seconds <= 59 ? seconds : '00'
    const modifiedSec =
      displaySec >= 1 && displaySec <= 9 ? `0${seconds}` : displaySec
    const modifiedMinutes = minutes === 0 && seconds === 60 ? '00' : minutes
    const timerEndCondition =
      minutes === 0 && seconds === 60 ? clearInterval(timerId) : null

    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="main-container">
          <div className="img-container">
            <div className="bg-img">
              <button type="button" className="time-container">
                <h1 className="time">{`${modifiedMinutes}:${modifiedSec}`}</h1>
                <p className="status">{status}</p>
              </button>
            </div>
          </div>
          <div className="option-container">
            <div className="start-stop-options">
              <div className="option">
                <img
                  src={
                    status === 'Paused'
                      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                  }
                  alt={status === 'Paused' ? 'play icon' : 'pause icon'}
                  className="option-icon"
                  onClick={this.onStart}
                />
                <button
                  type="button"
                  className="option-text"
                  onClick={this.onStart}
                >
                  {status === 'Paused' ? 'Start' : 'Pause'}
                </button>
              </div>
              <div className="option">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="option-icon"
                  alt="reset icon"
                  onClick={this.onReset}
                />
                <button className="option-text" onClick={this.onReset}>
                  Reset
                </button>
              </div>
            </div>
            <p className="heading-to-navigate">Set Timer limit</p>
            <div className="time-inc-dec">
              <button className="option-text" onClick={this.onDecTime}>
                -
              </button>
              <p className="minutes-btn">
                {status === 'Paused' ? minutes : 25}
              </p>
              <button className="option-text" onClick={this.onIncTime}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
