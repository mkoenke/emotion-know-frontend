import React from "react"
import Animista, { AnimistaTypes } from "react-animista"
import Flippy, { BackSide, FrontSide } from "react-flippy"
import { connect } from "react-redux"
import { Button, Card, Image, Popup } from "semantic-ui-react"
import { Player } from "video-react"
import { deleteVideo } from "../Redux/actions"

class VideoCard extends React.Component {
  handleDeleteClick = () => {
    console.log("Delete Click")
    this.props.deleteAudio(this.props.cardObj)
  }
  render() {
    console.log(this.props.cardObj)

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
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.CB4J5t2sbJUeNqeHhNcovQHaEK%26pid%3DApi&f=1"
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
