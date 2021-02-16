import React from "react"
import Animista, { AnimistaTypes } from "react-animista"
import Flippy, { BackSide, FrontSide } from "react-flippy"
import { connect } from "react-redux"
import { Button, Card, Image, Popup } from "semantic-ui-react"
import { deleteAudio } from "../Redux/actions"

class AudioCard extends React.Component {
  handleDeleteClick = () => {
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
                  <Image
                    src={this.props.image}
                    size="medium"
                    circular
                    className="journalCardImage"
                  />
                </Card.Content>
              </Card>
            </FrontSide>
            <BackSide>
              <div className="smallAudio">
                <audio controls src={this.props.cardObj.url} />
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
