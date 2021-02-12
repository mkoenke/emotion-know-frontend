import React from "react"
import Animista, { AnimistaTypes } from "react-animista"
import Flippy, { BackSide, FrontSide } from "react-flippy"
import { connect } from "react-redux"
import { Button, Card, Image, Popup } from "semantic-ui-react"
import image1 from "../assets/images/writtenGallery1.jpg"
import image2 from "../assets/images/writtenGallery2.jpg"
import image3 from "../assets/images/writtenGallery3.jpg"
import image4 from "../assets/images/writtenGallery4.jpg"
import image5 from "../assets/images/writtenGallery5.jpg"
import image6 from "../assets/images/writtenGallery6.jpg"
import { deleteJournal } from "../Redux/actions"

class JournalCard extends React.Component {
  handleDeleteClick = () => {
    this.props.deleteJournal(this.props.cardObj)
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
              <Card centered>
                <Card.Content>
                  <Card.Description textAlign="center">
                    {this.props.cardObj.content}
                  </Card.Description>
                </Card.Content>
              </Card>
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
    deleteJournal: (journal) => dispatch(deleteJournal(journal)),
  }
}

export default connect(null, mapDispatchToProps)(JournalCard)
