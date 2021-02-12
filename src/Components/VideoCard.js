import React from "react"
import Animista, { AnimistaTypes } from "react-animista"
import Flippy, { BackSide, FrontSide } from "react-flippy"
import { connect } from "react-redux"
import { Button, Card, Image, Popup } from "semantic-ui-react"
import { Player } from "video-react"
import image1 from "../assets/images/videoGallery1.jpg"
import image2 from "../assets/images/videoGallery2.jpg"
import image3 from "../assets/images/videoGallery3.jpg"
import image4 from "../assets/images/videoGallery4.jpg"
import image5 from "../assets/images/videoGallery5.jpg"
import image6 from "../assets/images/videoGallery6.jpg"
import { deleteVideo } from "../Redux/actions"

class VideoCard extends React.Component {
  handleDeleteClick = () => {
    console.log("Delete Click")
    this.props.deleteAudio(this.props.cardObj)
  }
  render() {
    const imageArray = [image1, image2, image3, image4, image5, image6]

    return (
      <>
        <Animista type={AnimistaTypes.SCALE_UP_CENTER}>
          <Flippy flipOnHover={true}>
            <FrontSide>
              <Card id={this.props.cardObj.id} centered>
                <Card.Content>
                  <Card.Header textAlign="center">
                    {this.props.cardObj.title}
                  </Card.Header>
                  <Image
                    src={
                      imageArray[Math.floor(Math.random() * imageArray.length)]
                    }
                    size="medium"
                  />
                </Card.Content>
              </Card>
            </FrontSide>
            <BackSide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Player>
                  <source src={this.props.cardObj.url} />
                </Player>
                {/* <iframe
                  title={this.props.cardObj.id}
                  src={this.props.cardObj.url}
                /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Popup
                  content="Warning!  This will delete this journal entry!"
                  trigger={
                    <Button icon="close" onClick={this.handleDeleteClick} />
                  }
                />
              </div>
            </BackSide>
          </Flippy>
        </Animista>
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAudio: (journal) => dispatch(deleteVideo(journal)),
  }
}

export default connect(null, mapDispatchToProps)(VideoCard)
