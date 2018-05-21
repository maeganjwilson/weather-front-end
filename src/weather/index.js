import React, { Component } from "react";
import axios from "axios";
import Current from "./current";
import HighLowTemp from "./current/highlowtemp";
import MoreDetails from "./current/moredetails";
import HourlyDetails from "./current/hourlydetails";
import WeeklyForecast from "./current/weeklyforecast";

axios.defaults.baseURL = "http://0.0.0.0:3001/";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      current: "",
      hourly: "",
      daily: "",
      show: 0
    };
    this.show = this.show.bind(this);
  }
  setCurrent() {
    let current = this.state.data.currently;
    let hourly = this.state.data.hourly;
    let daily = this.state.data.daily;
    this.setState({ current: current });
    this.setState({ hourly: hourly });
    this.setState({ daily: daily });
  }

  getWeather(latlng) {
    axios
      .get("/api/" + latlng)
      .then(response => {
        this.setState({
          data: response.data,
          current: response.data.currently,
          hourly: response.data.hourly,
          daily: response.data.daily
        });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    //this.setCurrent();
    console.log(this.state);
  }

  /* componentWillMount() {
    this.getWeather(this.props.latlng);
  } */

  show(num) {
    if (num === this.state.show) {
      this.setState({ show: 0 });
    } else this.setState({ show: num });
  }

  componentWillReceiveProps(nextProps) {
    this.getWeather(this.props.latlng);
  }

  render() {
    return (
      <div className="m weather">
        <div className="w">
          <Current
            temp={this.state.current.apparentTemperature}
            summary={this.state.current.summary}
            icon={this.state.current.icon}
          />
          <div className="bttn-group">
            <button className="bttn-lrg" onClick={() => this.show(1)}>
              SHOW MORE DETAILS
            </button>
            {this.state.show === 1 ? (
              <MoreDetails current={this.state.current} />
            ) : (
              <span />
            )}
            <button className="bttn-lrg" onClick={() => this.show(2)}>
              SHOW HOURLY FORECAST
            </button>
            {this.state.show === 2 ? (
              <HourlyDetails hourly={this.state.hourly} />
            ) : (
              <span />
            )}
            <button className="bttn-lrg" onClick={() => this.show(3)}>
              SHOW WEEKLY FORECAST
            </button>
            {this.state.show === 3 ? (
              <WeeklyForecast daily={this.state.daily} />
            ) : (
              <span />
            )}
          </div>
        </div>
        <div className="a">
          <div>{this.props.address}</div>
          <HighLowTemp data={this.state.daily.data} />
        </div>
      </div>
    );
  }
}

export default Weather;
