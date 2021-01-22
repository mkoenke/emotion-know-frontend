import React from "react"
import { connect } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import { logout } from "../Redux/actions"
import LoginModal from "./LoginModal"
import ParentLoginModal from "./ParentLoginModal"

class NavBar extends React.Component {
  state = {
    modalView: false,
    parentModalView: false,
    activeItem: "home",
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLoginClick = () => {
    console.log("Login clicked")
    this.setState({ modalView: !this.state.modalView })
  }
  handleParentLoginClick = () => {
    console.log("Parent Login clicked")
    this.setState({ parentModalView: !this.state.parentModalView })
  }

  handleLogOutClick = () => {
    localStorage.removeItem("token")
    this.props.logout()
  }

  render() {
    console.log("Child in nav bar:", this.props.child)
    const { activeItem } = this.state

    return (
      <div>
        <Menu
          pointing
          secondary
          style={{ backgroundColor: "rgb(171, 218, 225)" }}
        >
          {this.props.child ? (
            <NavLink to="/welcome">
              <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={this.handleItemClick}
                className="navbar"
              />
            </NavLink>
          ) : (
            <NavLink to="/">
              <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={this.handleItemClick}
                className="navbar"
              />
            </NavLink>
          )}

          <Menu.Menu position="right">
            {!this.props.child ? (
              <>
                <Menu.Item
                  name="login"
                  active={activeItem === "login"}
                  onClick={this.handleItemClick}
                  onClick={this.handleLoginClick}
                  className="navbar"
                />
                <Redirect to="/" />
              </>
            ) : null}
            {!this.props.parent ? (
              <>
                <Menu.Item
                  name="parents"
                  active={activeItem === "parents"}
                  onClick={this.handleItemClick}
                  onClick={this.handleParentLoginClick}
                  className="navbar"
                />
                <Redirect to="/" />
              </>
            ) : null}

            {this.state.parentModalView && (
              <ParentLoginModal
                handleLoginClick={this.handleParentLoginClick}
              />
            )}
            {this.state.modalView && (
              <LoginModal handleLoginClick={this.handleLoginClick} />
            )}
            {this.props.child || this.props.parent ? (
              <>
                <Menu.Item
                  name="logout"
                  active={activeItem === "logout"}
                  onClick={this.handleItemClick}
                  onClick={this.handleLogOutClick}
                  className="navbar"
                />
                <Redirect to="/welcome" />
              </>
            ) : null}
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    parent: state.parent,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
