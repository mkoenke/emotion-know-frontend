import { Bar } from "@reactchartjs/react-chart.js"
import React from "react"
import { connect } from "react-redux"

class BarGraph extends React.Component {
  state = {
    data: {
      labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness", "Surprise"],
      datasets: [
        {
          label: `${this.props.report.title} on ${this.props.date}`,
          data: [
            parseFloat(this.props.report.anger),
            parseFloat(this.props.report.disgust),
            parseFloat(this.props.report.fear),
            parseFloat(this.props.report.joy),
            parseFloat(this.props.report.sadness),
            parseFloat(this.props.report.surprise),
          ],
          backgroundColor: [
            "rgb(255, 0, 0)",
            "rgb(255, 128, 0)",
            "rgb(0, 255, 0)",
            "rgb(255, 255, 0)",
            "rgb(0, 0, 255)",
            "rgb(127, 0, 255)",
          ],
          borderColor: [
            "rgba(255, 0, 0, 0.2)",
            "rgba(255, 128, 0, 0.2)",
            "rgba(0, 255, 0, 0.2)",
            "rgba(255, 255, 0, 0.2)",
            "rgba(0, 0, 255, 0.2)",
            "rgba(127, 0, 255, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    },
  }

  render() {
    return <Bar data={this.state.data} />
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    allReports: state.allReports,
  }
}

export default connect(mapStateToProps)(BarGraph)
