import JwPagination from "jw-react-pagination"
import React from "react"
import { connect } from "react-redux"
import {
  Card,
  Container,
  Grid,
  Header,
  Menu,
  Popup,
  Table,
} from "semantic-ui-react"
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from "video-react"
import Graph from "../Components/Graph"
import Chart from "../Components/Rechart"

class ReportGalleryPage extends React.Component {
  state = {
    beenClicked: false,
    clickedReport: {},
    items: [],
    pageOfItems: [],
    clickedJournal: {},
  }

  componentDidMount() {
    if (this.props.allReports.length) {
      this.setState({ items: this.props.allReports })
    } else if (this.props.parentsReports.length) {
      this.setState({ items: this.props.parentsReports })
    }
  }

  handleReportClick = (event) => {
    let clickedReport = this.props.allReports.find(
      (report) => report.created_at === event.target.closest("tr").id
    )
    this.setState(
      {
        beenClicked: !this.state.beenClicked,
        clickedReport: clickedReport,
      },
      this.findJournal
    )
  }

  handleParentReportClick = (event) => {
    console.log("target: ", event.target)
    let clickedReport = this.props.parentsReports.find(
      (report) => report.created_at === event.target.closest("tr").id
    )
    console.log("clicked report:", clickedReport)
    this.setState(
      {
        beenClicked: !this.state.beenClicked,
        clickedReport: clickedReport,
      },
      this.findJournal
    )
  }

  findJournal = () => {
    if (this.state.clickedReport.journal_entry_id) {
      let journal = this.props.allJournals.find(
        (journal) => journal.id === this.state.clickedReport.journal_entry_id
      )
      console.log("Found journal: ", journal)
      this.setState({ clickedJournal: journal })
    } else if (this.state.clickedReport.audio_entry_id) {
      let journal = this.props.allAudios.find(
        (journal) => journal.id === this.state.clickedReport.audio_entry_id
      )
      console.log("Found journal: ", journal)
      this.setState({ clickedJournal: journal })
    } else if (this.state.clickedReport.video_entry_id) {
      let journal = this.props.allVideos.find(
        (journal) => journal.id === this.state.clickedReport.video_entry_id
      )
      console.log("Found journal: ", journal)
      this.setState({ clickedJournal: journal })
    }
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems })
  }

  renderReportGraph = () => {
    console.log("Report in render report graph: ", this.state.clickedReport)

    let date = new Date(this.state.clickedReport.created_at)
    let dateWithoutTime =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()

    return (
      <Grid centered columns="two">
        <Grid.Row>
          <Grid.Column>
            <div
              className="bargraph smallGraph"
              style={{ paddingTop: "117px" }}
            >
              <Graph report={this.state.clickedReport} date={dateWithoutTime} />
            </div>
          </Grid.Column>
          <Grid.Column>
            <div className="bargraph smallGraph">
              <Header textAlign="center" className="reportHeader">
                {this.state.clickedJournal.title}
              </Header>

              {this.state.clickedJournal.clip ? (
                <div className="smallAudio">
                  <audio src={this.state.clickedJournal.url} controls></audio>
                </div>
              ) : this.state.clickedJournal.video ? (
                <Player>
                  <source src={this.state.clickedJournal.url} />
                  <ControlBar autoHide={false} />
                  <LoadingSpinner />
                  <BigPlayButton position="center" />
                </Player>
              ) : (
                <Card centered>
                  <Card.Content>
                    <Card.Description textAlign="center">
                      {this.state.clickedJournal.content}
                    </Card.Description>
                  </Card.Content>
                </Card>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  renderParentReportGraph = () => {
    console.log("Report in render report graph: ", this.state.clickedReport)

    let date = new Date(this.state.clickedReport.created_at)
    let dateWithoutTime =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()

    return (
      <Grid centered columns="one">
        <Grid.Row>
          <Grid.Column>
            <div className="bargraph smallGraph" style={{ padding: "50px" }}>
              <Graph report={this.state.clickedReport} date={dateWithoutTime} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  listOfReports = () => {
    return this.state.pageOfItems.map((report) => {
      let date = new Date(report.created_at)
      let dateWithoutTime =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      return (
        <Table.Row
          className="link"
          id={report.created_at}
          onClick={this.handleReportClick}
        >
          <Table.Cell>{report.title}</Table.Cell>
          <Table.Cell>{dateWithoutTime}</Table.Cell>
        </Table.Row>
      )
    })
  }
  listOfParentsReports = () => {
    return this.state.pageOfItems.map((report) => {
      let date = new Date(report.created_at)
      let dateWithoutTime =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      return (
        <Table.Row
          className="link"
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
    console.log("State: ", this.state)
    const customLabels = {
      first: "<<",
      last: ">>",
      previous: "<",
      next: ">",
    }

    return (
      <>
        {this.props.child && !this.props.parent ? (
          <>
            <div className="background">
              <Container>
                {this.props.child ? (
                  <Header
                    className=" pageHeader"
                    size="huge"
                    textAlign="center"
                  >
                    {this.props.child.username}'s Reports
                  </Header>
                ) : null}
              </Container>
              <Container textAlign="center">
                <Header as="h2" className="content" style={{ margin: "30px" }}>
                  Individual Journal Emotional Reports
                </Header>
                <Table celled className="table content">
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
                        <Menu floated="right">
                          <JwPagination
                            items={this.state.items}
                            onChangePage={this.onChangePage}
                            labels={customLabels}
                          />
                        </Menu>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>

                <br />
                {this.state.beenClicked ? this.renderReportGraph() : null}
              </Container>
              <Container textAlign="center">
                <Header as="h2" className="content" style={{ margin: "30px" }}>
                  Emotional Reports over Time
                </Header>
                <br />
                <div className="lineGraph">
                  <Chart />
                </div>
              </Container>
              <div className="footer"></div>
            </div>
          </>
        ) : (
          this.props.parent && (
            <>
              <div className="background">
                <Container>
                  {this.props.child ? (
                    <Header
                      className=" pageHeader"
                      size="huge"
                      textAlign="center"
                      // style={{ color: "rgb(171, 218, 225)" }}
                    >
                      {this.props.child.username}'s Reports
                    </Header>
                  ) : null}
                </Container>
                {!this.props.parentsReports.length ? (
                  <Popup
                    trigger={
                      <Container textAlign="center">
                        <Header
                          as="h2"
                          className="content"
                          style={{ margin: "30px" }}
                        >
                          Individual Journal Emotional Reports
                        </Header>

                        <br />
                        {this.state.beenClicked
                          ? this.renderParentReportGraph()
                          : null}
                      </Container>
                    }
                    content="When your child starts using EmotionKnow and creates a journal entry, their individual journal entry emotional charts will appear here!"
                  />
                ) : (
                  <Container textAlign="center">
                    <Header
                      as="h2"
                      className="content"
                      style={{ margin: "30px" }}
                    >
                      Individual Journal Emotional Reports
                    </Header>

                    <Table celled className="table content">
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
                            <Menu floated="right">
                              <JwPagination
                                items={this.state.items}
                                onChangePage={this.onChangePage}
                                labels={customLabels}
                              />
                            </Menu>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                    <br />
                    {this.state.beenClicked
                      ? this.renderParentReportGraph()
                      : null}
                  </Container>
                )}
                {!this.props.parentsReports.length ? (
                  <Popup
                    trigger={
                      <Container textAlign="center">
                        <Header
                          as="h2"
                          className="content"
                          style={{ margin: "30px" }}
                        >
                          Emotional Reports over Time
                        </Header>

                        <br />

                        <Chart />
                      </Container>
                    }
                    content="Your child's emotions over time will appear here!"
                  />
                ) : (
                  <Container textAlign="center">
                    <Header
                      as="h2"
                      className="content"
                      style={{ margin: "30px" }}
                    >
                      Emotional Reports over Time
                    </Header>

                    <br />
                    <div className="lineGraph">
                      <Chart />
                    </div>
                  </Container>
                )}
                <div className="footer"></div>
              </div>
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
    allJournals: state.allJournals,
    allAudios: state.allAudios,
    allVideos: state.allVideos,
  }
}

export default connect(mapStateToProps)(ReportGalleryPage)
