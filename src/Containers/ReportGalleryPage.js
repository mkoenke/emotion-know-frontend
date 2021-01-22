import React from "react"
import { connect } from "react-redux"
import { Header, List, Segment } from "semantic-ui-react"
import Graph from "../Components/Graph"
import MyChart from "../Components/MyChart"

class ReportGalleryPage extends React.Component {
  state = {
    beenClicked: false,
    clickedReport: {},
  }
  componentDidMount() {
    ///fetch all reports from database and display on page as images
  }

  handleReportClick = (event) => {
    console.log("target: ", event.target)
    let clickedReport = this.props.allReports.find(
      (report) => report.title === event.target.textContent
    )
    console.log("clicked report:", clickedReport)
    this.setState({
      beenClicked: !this.state.beenClicked,
      clickedReport: clickedReport,
    })
  }

  renderReportGraph = () => {
    console.log("Report in render report graph: ", this.state.clickedReport)
    return <Graph report={this.state.clickedReport} />
  }

  listOfReports = () => {
    return this.props.allReports.map((report) => {
      return (
        <List.Item alignItems="center" onClick={this.handleReportClick}>
          {report.title}
        </List.Item>
      )
    })
  }

  render() {
    return (
      <>
        <Segment raised padded>
          {this.props.child ? (
            <Header
              className="h1"
              size="huge"
              textAlign="center"
              style={{ color: "rgb(171, 218, 225)" }}
            >
              {this.props.child.username}'s Reports
            </Header>
          ) : null}
        </Segment>
        <Segment textAlign="center">
          <Header>Individual Journal Data Reports</Header>
          <List bulleted>{this.listOfReports()}</List>
          <br />
          {this.state.beenClicked ? this.renderReportGraph() : null}
        </Segment>
        <Segment textAlign="center">
          <Header>Data Reports over Time</Header>
          <br />
          <MyChart />
        </Segment>
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
    allReports: state.allReports,
  }
}

export default connect(mapStateToProps)(ReportGalleryPage)
