import React from "react"
import Chart from "react-apexcharts"
import { connect } from "react-redux"

class MyChart extends React.Component {
  componentDidMount() {
    this.xAxis()
    this.chartData()
  }
  state = {
    options: {
      chart: {
        id: `${this.props.child}`,
      },
      xaxis: {
        categories: ["Journal 1", "Journal 2", "Journal 3"],
      },
    },
    series: [],
  }

  xAxis = () => {
    let xAxisCategories = this.props.allReports.map(
      (report) => `Journal ${report.id}`
    )
    console.log("X-axis: ", xAxisCategories)
    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          ...this.state.options.xaxis,
          categories: xAxisCategories,
        },
      },
    })
  }
  chartData = () => {
    let angerData = this.props.allReports.map((report) => report.anger)
    let disgustData = this.props.allReports.map((report) => report.disgust)
    let fearData = this.props.allReports.map((report) => report.fear)
    let joyData = this.props.allReports.map((report) => report.joy)
    let sadnessData = this.props.allReports.map((report) => report.sadness)
    let surpriseData = this.props.allReports.map((report) => report.surprise)

    this.setState({
      options: {
        ...this.state.options,
      },
      series: [
        ...this.state.series,
        { name: "Anger", data: angerData },
        { name: "Disgust", data: disgustData },
        { name: "Fear", data: fearData },
        { name: "Joy", data: joyData },
        { name: "Sadness", data: sadnessData },
        { name: "Surprise", data: surpriseData },
      ],
    })
  }

  render() {
    console.log("Reports in chart:", this.props.allReports)
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
        width={500}
        height={320}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    allReports: state.allReports,
  }
}

export default connect(mapStateToProps)(MyChart)
