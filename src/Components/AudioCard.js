import React from "react"
import Animista, { AnimistaTypes } from "react-animista"
import Flippy, { BackSide, FrontSide } from "react-flippy"
import { connect } from "react-redux"
import { Button, Card, Image, Popup } from "semantic-ui-react"
import image1 from "../assets/images/audioGallery1.jpg"
import image2 from "../assets/images/audioGallery2.jpg"
import image3 from "../assets/images/audioGallery3.jpg"
import image4 from "../assets/images/audioGallery4.jpg"
import image5 from "../assets/images/audioGallery5.jpg"
import image6 from "../assets/images/audioGallery6.jpg"
import { deleteAudio } from "../Redux/actions"

class AudioCard extends React.Component {
  handleDeleteClick = () => {
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
                    circular
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
                <audio controls src={this.props.cardObj.url} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px",
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
    deleteAudio: (journal) => dispatch(deleteAudio(journal)),
  }
}

export default connect(null, mapDispatchToProps)(AudioCard)
