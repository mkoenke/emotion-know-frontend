import React from "react"
import { connect } from "react-redux"
import { Header, List, Popup, Segment } from "semantic-ui-react"
// import Chart from "../Components/HoldComponents/Chart"
import Chart from "../Components/Chart"
// import Graph from "../Components/HoldComponents/Graph"
import Graph from "../Components/Graph"

class ReportGalleryPage extends React.Component {
  state = {
    beenClicked: false,
    clickedReport: {},
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

  handleParentReportClick = (event) => {
    console.log("target: ", event.target)
    let clickedReport = this.props.parentsReports.find(
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

    let date = new Date(this.state.clickedReport.created_at)
    let dateWithoutTime =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()

    return <Graph report={this.state.clickedReport} date={dateWithoutTime} />
  }

  listOfReports = () => {
    return this.props.allReports.map((report) => {
      console.log("Report: ", report)
      return (
        <List.Item alignItems="center" onClick={this.handleReportClick}>
          {report.title}
        </List.Item>
      )
    })
  }
  listOfParentsReports = () => {
    console.log("List of parents reports: ", this.props.parentsReports)
    return this.props.parentsReports.map((report) => {
      console.log("Report: ", report)
      return (
        <List.Item alignItems="center" onClick={this.handleParentReportClick}>
          {report.title}
        </List.Item>
      )
    })
  }

  render() {
    console.log("Props: ", this.props)
    return (
      <>
        {this.props.child && !this.props.parent ? (
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
              <Chart />
            </Segment>
          </>
        ) : (
          this.props.parent && (
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
              {!this.props.parentsReports.length ? (
                <Popup
                  trigger={
                    <Segment textAlign="center">
                      <Header>Individual Journal Data Reports</Header>
                      <List bulleted>{this.listOfParentsReports()}</List>

                      <br />
                      {this.state.beenClicked ? this.renderReportGraph() : null}
                    </Segment>
                  }
                  content="When your child starts using EmotionKnow and creates a journal entry, their individual journal entry data charts will appear here!"
                />
              ) : (
                <Segment textAlign="center">
                  <Header>Individual Journal Data Reports</Header>
                  <List bulleted>{this.listOfParentsReports()}</List>

                  <br />
                  {this.state.beenClicked ? this.renderReportGraph() : null}
                </Segment>
              )}
              {!this.props.parentsReports.length ? (
                <Popup
                  trigger={
                    <Segment textAlign="center">
                      <Header>Data Reports over Time</Header>

                      <br />

                      <Chart />
                    </Segment>
                  }
                  content="Your child's journal entry data over time will appear here!"
                />
              ) : (
                <Segment textAlign="center">
                  <Header>Data Reports over Time</Header>

                  <br />

                  <Chart />
                </Segment>
              )}
            </>
          )
        )}
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
    parent: state.parent,
    allReports: state.allReports,
    parentsReports: state.parentsReports,
  }
}

export default connect(mapStateToProps)(ReportGalleryPage)
