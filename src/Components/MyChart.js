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
    let happyDecimals = this.props.allReports.map((report) => report.happy)
    let sadDecimals = this.props.allReports.map((report) => report.sad)
    let angryDecimals = this.props.allReports.map((report) => report.angry)
    let excitedDecimals = this.props.allReports.map((report) => report.excited)
    let fearDecimals = this.props.allReports.map((report) => report.fear)
    let boredDecimals = this.props.allReports.map((report) => report.bored)

    this.setState({
      options: {
        ...this.state.options,
      },
      series: [
        ...this.state.series,
        { name: "Happy", data: happyDecimals },
        { name: "Sad", data: sadDecimals },
        { name: "Angry", data: angryDecimals },
        { name: "Excited", data: excitedDecimals },
        { name: "Fear", data: fearDecimals },
        { name: "Bored", data: boredDecimals },
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
