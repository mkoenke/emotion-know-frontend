import React from "react"
import { connect } from "react-redux"
import { Header, Icon, Menu, Popup, Segment, Table } from "semantic-ui-react"
import Chart from "../Components/Chart"
import Graph from "../Components/Graph"

class ReportGalleryPage extends React.Component {
  state = {
    beenClicked: false,
    clickedReport: {},
  }

  handleReportClick = (event) => {
    let clickedReport = this.props.allReports.find(
      (report) => report.created_at === event.target.closest("tr").id
    )
    this.setState({
      beenClicked: !this.state.beenClicked,
      clickedReport: clickedReport,
    })
  }

  handleParentReportClick = (event) => {
    console.log("target: ", event.target)
    let clickedReport = this.props.parentsReports.find(
      (report) => report.created_at === event.target.closest("tr").id
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
      let date = new Date(report.created_at)
      let dateWithoutTime =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      return (
        <Table.Row id={report.created_at} onClick={this.handleReportClick}>
          <Table.Cell>{report.title}</Table.Cell>
          <Table.Cell>{dateWithoutTime}</Table.Cell>
        </Table.Row>
      )
    })
  }
  listOfParentsReports = () => {
    return this.props.parentsReports.map((report) => {
      let date = new Date(report.created_at)
      let dateWithoutTime =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      return (
        <Table.Row
          id={report.created_at}
          onClick={this.handleParentReportClick}
        >
          <Table.Cell>{report.title}</Table.Cell>
          <Table.Cell>{dateWithoutTime}</Table.Cell>
        </Table.Row>
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
              <Header>Individual Journal Emotional Reports</Header>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>{this.listOfReports()}</Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="3">
                      <Menu floated="right" pagination>
                        <Menu.Item as="a" icon>
                          <Icon name="chevron left" />
                        </Menu.Item>

                        <Menu.Item as="a" icon>
                          <Icon name="chevron right" />
                        </Menu.Item>
                      </Menu>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>

              <br />
              {this.state.beenClicked ? this.renderReportGraph() : null}
            </Segment>
            <Segment textAlign="center">
              <Header>Emotional Reports over Time</Header>
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
                      <Header>Individual Journal Emotional Reports</Header>

                      <br />
                      {this.state.beenClicked ? this.renderReportGraph() : null}
                    </Segment>
                  }
                  content="When your child starts using EmotionKnow and creates a journal entry, their individual journal entry emotional charts will appear here!"
                />
              ) : (
                <Segment textAlign="center">
                  <Header>Individual Journal Emotional Reports</Header>

                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.listOfParentsReports()}</Table.Body>

                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan="3">
                          <Menu floated="right" pagination>
                            <Menu.Item as="a" icon>
                              <Icon name="chevron left" />
                            </Menu.Item>

                            <Menu.Item as="a" icon>
                              <Icon name="chevron right" />
                            </Menu.Item>
                          </Menu>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>

                  <br />
                  {this.state.beenClicked ? this.renderReportGraph() : null}
                </Segment>
              )}
              {!this.props.parentsReports.length ? (
                <Popup
                  trigger={
                    <Segment textAlign="center">
                      <Header>Emotional Reports over Time</Header>

                      <br />

                      <Chart />
                    </Segment>
                  }
                  content="Your child's emotions over time will appear here!"
                />
              ) : (
                <Segment textAlign="center">
                  <Header>Emotional Reports over Time</Header>

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
