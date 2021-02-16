import React from "react"
import { connect } from "react-redux"
import { Grid, Header } from "semantic-ui-react"
import image1 from "../assets/images/videoGallery1.jpg"
import image2 from "../assets/images/videoGallery2.jpg"
import image3 from "../assets/images/videoGallery3.jpg"
import image4 from "../assets/images/videoGallery4.jpg"
import image5 from "../assets/images/videoGallery5.jpg"
import image6 from "../assets/images/videoGallery6.jpg"
import VideoCard from "../Components/VideoCard"

class VideoGalleryPage extends React.Component {
  arrayOfJournals = () => {
    const imageArray = [image1, image2, image3, image4, image5, image6]
    let i = 0
    return this.props.allVideos.map((card) => {
      if (i < imageArray.length - 1) {
        i++
      } else {
        i = 0
      }
      return (
        <Grid.Column>
          <VideoCard
            centered
            key={card.id}
            cardObj={card}
            image={imageArray[i]}
          />
        </Grid.Column>
      )
    })
  }
  render() {
    return (
      <>
        <div className="background pagePadding">
          {this.props.child ? (
            <Header className="pageHeader" size="huge" textAlign="center">
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
