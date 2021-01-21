import React from "react"
import { connect } from "react-redux"
import { Header, List } from "semantic-ui-react"
import MyChart from "../Components/MyChart"

class ReportGalleryPage extends React.Component {
  componentDidMount() {
    ///fetch all reports from database and display on page as images
  }
  listOfReports = () => {
    return this.props.allReports.map((report) => {
      return <List.Item>{report.title}</List.Item>
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
