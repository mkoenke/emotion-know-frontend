import Chart from "r-chart"
import React from "react"
import { connect } from "react-redux"

class LineGraph extends React.Component {
  componentDidMount() {
    this.chartData()
  }

  state = {
    //   data: {
    //     labels: [],
    //     datasets: [],
    //   },
    data: [
      {
        type: "line",
        color: "green",
        title: "Fear",
        points: [],
      },
      {
        type: "line",
        title: "Anger",
        color: "red",
        points: [
          { key: "January", value: 10 },
          { key: "February", value: 15 },
          { key: "March", value: 25 },
          { key: "April", value: 30 },
          { key: "May", value: 40 },
          { key: "June", value: 35 },
          { key: "July", value: 40 },
          { key: "August", value: 60 },
          { key: "September", value: 60 },
          { key: "October", value: 75 },
          { key: "November", value: 80 },
          { key: "December", value: 100 },
        ],
      },
      {
        type: "line",
        color: "yellow",
        title: "Joy",
        points: [],
      },
      {
        type: "line",
        color: "blue",
        title: "Sadness",
        points: [],
      },
      {
        type: "line",
        color: "purple",
        title: "Surprise",
        points: [],
      },
      {
        type: "line",
        color: "orange",
        title: "Disgust",
        points: [],
      },
    ],
    keys: [],
  }

  chartData = () => {
    if (this.props.allReports.length) {
      let xAxisCategories = this.props.allReports.map((report) => {
        let date = new Date(report.created_at)
        let dateWithoutTime =
          date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
        return `${dateWithoutTime}`
      })
      let angerData = this.props.allReports.map((report) => report.anger)
      let disgustData = this.props.allReports.map((report) => report.disgust)
      let fearData = this.props.allReports.map((report) => report.fear)
      let joyData = this.props.allReports.map((report) => report.joy)
      let sadnessData = this.props.allReports.map((report) => report.sadness)
      let surpriseData = this.props.allReports.map((report) => report.surprise)

      this.setState({
        data: {
          
         [
            {
              label: "Anger",
              data: angerData,
              fill: false,
              backgroundColor: "rgb(255, 0, 0)",
              borderColor: "rgba(255, 0, 0, 0.2)",
            },
            {
              label: "Disgust",
              data: disgustData,
              fill: false,
              backgroundColor: "rgb(255, 128, 0)",
              borderColor: "rgba(255, 128, 0, 0.2)",
            },
            {
              label: "Fear",
              data: fearData,
              fill: false,
              backgroundColor: "rgb(0, 255, 0)",
              borderColor: "rgba(0, 255, 0, 0.2)",
            },
            {
              label: "Joy",
              data: joyData,
              fill: false,
              backgroundColor: "rgb(255, 255, 0)",
              borderColor: "rgba(255, 255, 0, 0.2)",
            },
            {
              label: "Sadness",
              data: sadnessData,
              fill: false,
              backgroundColor: "rgb(0, 0, 255)",
              borderColor: "rgba(0, 0, 255, 0.2)",
            },
            {
              label: "Surprise",
              data: surpriseData,
              fill: false,
              backgroundColor: "rgb(127, 0, 255)",
              borderColor: "rgba(127, 0, 255, 0.2)",
            },
          ],
        },
      })
    } else {
      let xAxisCategories = this.props.parentsReports.map(
        (report) => `${new Date(report.created_at)}`
      )
      let angerData = this.props.parentsReports.map((report) => report.anger)
      let disgustData = this.props.parentsReports.map(
        (report) => report.disgust
      )
      let fearData = this.props.parentsReports.map((report) => report.fear)
      let joyData = this.props.parentsReports.map((report) => report.joy)
      let sadnessData = this.props.parentsReports.map(
        (report) => report.sadness
      )
      let surpriseData = this.props.parentsReports.map(
        (report) => report.surprise
      )

      this.setState({
        data: {
          labels: xAxisCategories,
          datasets: [
            {
              label: "Anger",
              data: angerData,
              fill: false,
              backgroundColor: "rgb(255, 0, 0)",
              borderColor: "rgba(255, 0, 0, 0.2)",
            },
            {
              label: "Disgust",
              data: disgustData,
              fill: false,
              backgroundColor: "rgb(255, 128, 0)",
              borderColor: "rgba(255, 128, 0, 0.2)",
            },
            {
              label: "Fear",
              data: fearData,
              fill: false,
              backgroundColor: "rgb(0, 255, 0)",
              borderColor: "rgba(0, 255, 0, 0.2)",
            },
            {
              label: "Joy",
              data: joyData,
              fill: false,
              backgroundColor: "rgb(255, 255, 0)",
              borderColor: "rgba(255, 255, 0, 0.2)",
            },
            {
              label: "Sadness",
              data: sadnessData,
              fill: false,
              backgroundColor: "rgb(0, 0, 255)",
              borderColor: "rgba(0, 0, 255, 0.2)",
            },
            {
              label: "Surprise",
              data: surpriseData,
              fill: false,
              backgroundColor: "rgb(127, 0, 255)",
              borderColor: "rgba(127, 0, 255, 0.2)",
            },
          ],
        },
      })
    }
  }

  render() {
    console.log("Reports in chart:", this.props.allReports)
    console.log("State in chart: ", this.state)
    return (
      <Chart
        data={this.state.data}
        keys={this.state.keys}
        key_zoom={true}
        value_zoom={true}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    allReports: state.allReports,
    parentsReports: state.parentsReports,
  }
}

export default connect(mapStateToProps)(LineGraph)
