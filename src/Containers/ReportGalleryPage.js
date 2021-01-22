import React from "react"
import { connect } from "react-redux"
import { Header, List } from "semantic-ui-react"
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
        <List.Item onClick={this.handleReportClick}>{report.title}</List.Item>
      )
    })
  }

  render() {
    return (
      <>
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

        {/* <Grid centered columns="three">
          <Grid.Row>{this.arrayOfJournals()}</Grid.Row>
        </Grid> */}
        <Header>Report List</Header>
        <List>{this.listOfReports()}</List>
        {this.state.beenClicked ? this.renderReportGraph() : null}
        <MyChart />
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
