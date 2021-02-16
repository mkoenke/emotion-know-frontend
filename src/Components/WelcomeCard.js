import React from "react"
import Animista, { AnimistaTypes } from "react-animista"
import { NavLink } from "react-router-dom"
import { Card, Image } from "semantic-ui-react"

class CardClass extends React.Component {
  render() {
    return (
      <>
        <Animista type={AnimistaTypes.ROTATE_SCALE_DOWN}>
          <NavLink to={this.props.cardObj.url}>
            <Card
              className="welcomeCard cardSize grow"
              fluid
              id={this.props.cardObj.id}
              centered
            >
              <Image className="cardImage" src={this.props.cardObj.image} />
              <Card.Content className="content">
                <Card.Header textAlign="center" className="content">
                  {this.props.cardObj.header}
                </Card.Header>

                <Card.Description textAlign="center">
                  {this.props.cardObj.description}
                </Card.Description>
              </Card.Content>
            </Card>
          </NavLink>
        </Animista>
      </>
    )
  }
}

export default CardClass
