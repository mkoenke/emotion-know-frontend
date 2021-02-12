import React from "react"
import { connect } from "react-redux"
import { Grid, Header } from "semantic-ui-react"
import VideoCard from "../Components/VideoCard"
// import image1 from "../assets/images/videoGallery1.jpg"
// import image2 from "../assets/images/videoGallery2.jpg"
// import image3 from "../assets/images/videoGallery3.jpg"
// import image4 from "../assets/images/videoGallery4.jpg"
// import image5 from "../assets/images/videoGallery5.jpg"
// import image6 from "../assets/images/videoGallery6.jpg"

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
        <div className="background">
          {this.props.child ? (
            <Header
              className="pageHeader"
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
        </div>
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
