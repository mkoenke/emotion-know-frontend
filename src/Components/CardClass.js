import React from "react"
import { NavLink } from "react-router-dom"
import { Card, Image } from "semantic-ui-react"

class CardClass extends React.Component {
  render() {
    return (
      <>
        <NavLink to={this.props.cardObj.url}>
          <Card id={this.props.cardObj.id} centered>
            <Image src={this.props.cardObj.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{this.props.cardObj.header}</Card.Header>

              <Card.Description>
                {this.props.cardObj.description}
              </Card.Description>
            </Card.Content>
          </Card>
        </NavLink>
      </>
    )
  }
}

export default CardClass
