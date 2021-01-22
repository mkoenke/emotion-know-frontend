import React from "react"
import Chart from "react-apexcharts"
import { connect } from "react-redux"

class Graph extends React.Component {
  state = {
    options: {
      plotOptions: {
        bar: {
          horizontal: false,
          startingShape: "flat",
          endingShape: "flat",
          columnWidth: "70%",
          barHeight: "70%",
          distributed: false,
          rangeBarOverlap: true,
          rangeBarGroupRows: false,
          colors: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: undefined,
              },
            ],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
          dataLabels: {
            position: "center",
            maxItems: 100,
            hideOverflowingLabels: true,
            orientation: "vertical",
          },
        },
      },
      chart: {
        id: `${this.props.report.title}`,
      },
      xaxis: {
        categories: ["Anger", "Disgust", "Fear", "Joy", "Sadness", "Surprise"],
      },
    },
    series: [
      {
        name: `${this.props.report.title}`,
        data: [
          parseFloat(this.props.report.anger),
          parseFloat(this.props.report.disgust),
          parseFloat(this.props.report.fear),
          parseFloat(this.props.report.joy),
          parseFloat(this.props.report.sadness),
          parseFloat(this.props.report.surprise),
        ],
      },
    ],
  }

  //   chartData = () => {
  //     let angerData = parseFloat(this.props.report.anger)
  //     let disgustData = parseFloat(this.props.report.disgust)
  //     let fearData = parseFloat(this.props.report.fear)
  //     let joyData = parseFloat(this.props.report.joy)
  //     let sadnessData = parseFloat(this.props.report.sadness)
  //     let surpriseData = parseFloat(this.props.report.surprise)

  //     this.setState({
  //       options: {
  //         ...this.state.options,
  //       },
  //       series: [
  //         ...this.state.series,
  //         { name: "Anger", data: angerData },
  //         { name: "Disgust", data: disgustData },
  //         { name: "Fear", data: fearData },
  //         { name: "Joy", data: joyData },
  //         { name: "Sadness", data: sadnessData },
  //         { name: "Surprise", data: surpriseData },
  //       ],
  //     })
  //   }

  render() {
    console.log("Props in graph: ", this.props)
    console.log("State in graph: ", this.state)
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
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

export default connect(mapStateToProps)(Graph)
