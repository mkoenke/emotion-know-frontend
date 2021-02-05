import React from "react"
import Chart from "react-apexcharts"
import { connect } from "react-redux"

class MyChart extends React.Component {
  componentDidMount() {
    this.xAxis()
    this.chartData()
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     this.xAxis()
  //     this.chartData()
  //   }
  // }
  state = {
    options: {
      chart: {
        id: `${this.props.child}`,
      },
      xaxis: {
        type: "category",
        // categories: [],
      },
    },
    series: [],
  }

  xAxis = () => {
    if (this.props.allReports.length) {
      let xAxisCategories = this.props.allReports.map(
        (report) => `${report.created_at}`
      )
      console.log("X-axis: ", xAxisCategories)
      this.setState({
        options: {
          // ...this.state.options,
          xaxis: {
            // ...this.state.options.xaxis,
            categories: xAxisCategories,
            // labels: xAxisCategories,
          },
        },
      })
    } else {
      let xAxisCategories = this.props.parentsReports.map(
        (report) => `${report.date}`
      )
      console.log("X-axis: ", xAxisCategories)
      this.setState({
        options: {
          // ...this.state.options,
          xaxis: {
            // ...this.state.options.xaxis,
            categories: xAxisCategories,
            // labels: xAxisCategories,
          },
        },
      })
    }
  }
  chartData = () => {
    if (this.props.allReports.length) {
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
    } else {
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
  }

  render() {
    console.log("Reports in chart:", this.props.allReports)
    console.log("State in chart: ", this.state)
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
    parentsReports: state.parentsReports,
  }
}

export default connect(mapStateToProps)(MyChart)
