import React from "react"
import Animista, { AnimistaTypes } from "react-animista"
import Flippy, { BackSide, FrontSide } from "react-flippy"
import { connect } from "react-redux"
// import { NavLink } from "react-router-dom"
import { Button, Card, Image, Popup } from "semantic-ui-react"
import { deleteJournal } from "../Redux/actions"

class JournalCard extends React.Component {
  handleDeleteClick = () => {
    console.log("Delete Click")
    this.props.deleteJournal(this.props.cardObj)
  }
  render() {
    return (
      <>
        <Animista type={AnimistaTypes.SCALE_UP_CENTER}>
          <Flippy flipOnClick={true}>
            <FrontSide>
              <Card id={this.props.cardObj.id} centered>
                <Card.Content>
                  <Card.Header textAlign="center">
                    {this.props.cardObj.title}
                  </Card.Header>
                  <Image
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mhaYy171K74k3WtSxfBZaQHaHJ%26pid%3DApi&f=1"
                    size="medium"
                    circular
                  />
                </Card.Content>
                <Popup
                  content="Warning!  This will delete this journal entry!"
                  trigger={
                    <Button icon="close" onClick={this.handleDeleteClick} />
                  }
                />
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
