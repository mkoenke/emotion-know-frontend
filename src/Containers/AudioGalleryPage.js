import React from "react"
import { connect } from "react-redux"
import { Grid, Header } from "semantic-ui-react"
import image5 from "../assets/images/audio1.jpg"
import image6 from "../assets/images/audio2.jpg"
import image1 from "../assets/images/audioGallery1.jpg"
import image2 from "../assets/images/audioGallery2.jpg"
import image3 from "../assets/images/audioGallery3.jpg"
import image4 from "../assets/images/audioGallery4.jpg"
import AudioCard from "../Components/AudioCard"

class AudioGalleryPage extends React.Component {
  arrayOfJournals = () => {
    const imageArray = [image1, image2, image3, image4, image5, image6]
    let i = 0
    return this.props.allAudios.map((card) => {
      if (i < imageArray.length - 1) {
        i++
      } else {
        i = 0
      }
      return (
        <Grid.Column>
          <AudioCard
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
