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
              id={this.props.cardObj.id}
              centered
              style={{
                boxShadow: "10px 10px 5px grey",
                margin: "20px",
              }}
            >
              <Image src={this.props.cardObj.image} wrapped ui={false} />
              <Card.Content>
                <Card.Header textAlign="center">
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
