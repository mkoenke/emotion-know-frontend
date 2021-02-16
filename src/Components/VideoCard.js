import React from "react"
import Animista, { AnimistaTypes } from "react-animista"
import Flippy, { BackSide, FrontSide } from "react-flippy"
import { connect } from "react-redux"
import { Button, Card, Image, Popup } from "semantic-ui-react"
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from "video-react"
import { deleteVideo } from "../Redux/actions"

class VideoCard extends React.Component {
  handleDeleteClick = () => {
    console.log("Delete Click")
    this.props.deleteAudio(this.props.cardObj)
  }
  render() {
    return (
      <>
        <Animista type={AnimistaTypes.SCALE_UP_CENTER}>
          <Flippy flipOnHover={true}>
            <FrontSide>
              <Card
                id={this.props.cardObj.id}
                centered
                className="pattern cardSize"
              >
                <Card.Content>
                  <Card.Header className="content">
                    {this.props.cardObj.date}
                  </Card.Header>
                  <Card.Header className="journalTitle">
                    {this.props.cardObj.title}
                  </Card.Header>
                  <Image src={this.props.image} size="medium" circular />
                </Card.Content>
              </Card>
            </FrontSide>
            <BackSide>
              <div className="background">
                <div className="videoCardDiv">
                  <Player>
                    <source src={this.props.cardObj.url} />
                    <ControlBar autoHide={false} />
                    <LoadingSpinner />
                    <BigPlayButton position="center" />
                  </Player>
                </div>

                <div className="buttonDiv">
                  <Popup
                    content="Warning!  This will delete this journal entry!"
                    trigger={
                      <Button
                        icon="close"
                        onClick={this.handleDeleteClick}
                        className="cardbutton delete"
                      />
                    }
                  />
                </div>
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
