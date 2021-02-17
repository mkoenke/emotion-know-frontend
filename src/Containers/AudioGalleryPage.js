import JwPagination from "jw-react-pagination"
import React from "react"
import { connect } from "react-redux"
import { Grid, Header } from "semantic-ui-react"
import image6 from "../assets/images/audio2.jpg"
import image1 from "../assets/images/audioGallery1.jpg"
import image3 from "../assets/images/audioGallery3.jpg"
import image4 from "../assets/images/audioGallery4.jpg"
import image2 from "../assets/images/boyMic.jpg"
import image5 from "../assets/images/newAudio.jpg"
import AudioCard from "../Components/AudioCard"

class AudioGalleryPage extends React.Component {
  state = {
    items: [],
    pageOfItems: [],
  }

  componentDidMount() {
    this.setState({ items: this.props.allAudios })
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems })
  }
  arrayOfJournals = () => {
    const imageArray = [image1, image2, image3, image4, image5, image6]
    let i = 0
    return this.state.pageOfItems.map((card) => {
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
    const customLabels = {
      first: "<<",
      last: ">>",
      previous: "<",
      next: ">",
    }
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
            <div className="paginateLarge">
              <JwPagination
                items={this.state.items}
                onChangePage={this.onChangePage}
                labels={customLabels}
                pageSize={9}
              />
            </div>
          </Grid>
          <div className="footer"></div>
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
