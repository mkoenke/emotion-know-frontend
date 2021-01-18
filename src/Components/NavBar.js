import React from "react"
// import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import LoginModal from "./LoginModal"

class NavBar extends React.Component {
  state = { modalView: false, activeItem: "home" }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLoginClick = () => {
    console.log("Login clicked")
    this.setState({ modalView: !this.state.modalView })
  }

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
              className="navbar"
            />
          </NavLink>
          <NavLink to="/">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
              className="navbar"
            />
          </NavLink>

          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={this.handleItemClick}
              onClick={this.handleLoginClick}
              className="navbar"
            />
            {this.state.modalView && (
              <LoginModal handleLoginClick={this.handleLoginClick} />
            )}

            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
              className="navbar"
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default NavBar
