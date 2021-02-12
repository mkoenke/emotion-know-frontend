import React from "react"
import { connect } from "react-redux"
import { Grid, Header } from "semantic-ui-react"
import AudioCard from "../Components/AudioCard"
// import image1 from "../assets/images/audioGallery1.jpg"
// import image2 from "../assets/images/audioGallery2.jpg"
// import image3 from "../assets/images/audioGallery3.jpg"
// import image4 from "../assets/images/audioGallery4.jpg"
// import image5 from "../assets/images/audioGallery5.jpg"
// import image6 from "../assets/images/audioGallery6.jpg"

class AudioGalleryPage extends React.Component {
  arrayOfJournals = () => {
    return this.props.allAudios.map((card) => {
      return (
        <Grid.Column>
          <AudioCard centered key={card.id} cardObj={card} />
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
              {this.props.child.username}'s Audio Journals
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
    allAudios: state.allAudios,
  }
}
export default connect(mapStateToProps)(AudioGalleryPage)
