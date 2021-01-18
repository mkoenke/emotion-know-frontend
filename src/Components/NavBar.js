import React from "react"
// import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"

class NavBar extends React.Component {
  state = { activeItem: "home" }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu
          pointing
          secondary
          style={{ backgroundColor: "rgb(171, 218, 225)" }}
        >
          <NavLink to="/">
            <Menu.Item
              name="menu"
              active={activeItem === "menu"}
              onClick={this.handleItemClick}
            />
          </NavLink>
          <NavLink to="/">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
          </NavLink>

          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={this.handleItemClick}
            />

            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default NavBar
