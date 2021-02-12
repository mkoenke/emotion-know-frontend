import React from "react"
import Animista, { AnimistaTypes } from "react-animista"
import Flippy, { BackSide, FrontSide } from "react-flippy"
import { connect } from "react-redux"
import { Button, Card, Image, Popup } from "semantic-ui-react"
import { BigPlayButton, Player } from "video-react"
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
                className="journalCard cardSize"
              >
                <Card.Content>
                  <Card.Header className="journalTitle">
                    {this.props.cardObj.title}
                  </Card.Header>
                  <Image src={this.props.image} size="medium" circular />
                </Card.Content>
              </Card>
            </FrontSide>
            <BackSide>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    objectFit: "contain",
                    overflow: "scroll",
                  }}
                >
                  <Player style={{ height: "80%", width: "80%" }}>
                    <source src={this.props.cardObj.url} />
                    <BigPlayButton position="center" />
                  </Player>
                </div>

                <div className="delete">
                  <Popup
                    content="Warning!  This will delete this journal entry!"
                    trigger={
                      <Button
                        icon="close"
                        onClick={this.handleDeleteClick}
                        className="cardbutton"
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
