import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import { logout } from "../Redux/actions"
import LoginModal from "./LoginModal"

class NavBar extends React.Component {
  state = {
    modalView: false,
    // sideNavView: false,
    activeItem: "home",
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLoginClick = () => {
    console.log("Login clicked")
    this.setState({ modalView: !this.state.modalView })
  }
  // toggleSideNav = () => {
  //   this.setState({ sideNavView: true })
  // }
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
          {/* <NavLink to="/">
            <Menu.Item
              name="menu"
              active={activeItem === "menu"}
              onClick={this.handleItemClick}
              onClick={this.toggleSideNav}
              className="navbar"
            />
            {this.state.sideNavView && <SideNav />}
          </NavLink> */}
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
            {this.props.child ? (
              <Menu.Item
                name="logout"
                active={activeItem === "logout"}
                onClick={this.handleItemClick}
                onClick={this.handleLogOutClick}
                className="navbar"
              />
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
