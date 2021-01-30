import React from "react"
import { connect } from "react-redux"
import { Grid, Header } from "semantic-ui-react"
import VideoCard from "../Components/VideoCard"

class VideoGalleryPage extends React.Component {
  arrayOfJournals = () => {
    return this.props.allVideos.map((card) => {
      return (
        <Grid.Column>
          <VideoCard centered key={card.id} cardObj={card} />
        </Grid.Column>
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
            {this.props.child.username}'s Video Journals
          </Header>
        ) : null}

        <Grid centered columns="three">
          <Grid.Row>{this.arrayOfJournals()}</Grid.Row>
        </Grid>
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
    allVideos: state.allVideos,
  }
}
export default connect(mapStateToProps)(VideoGalleryPage)
