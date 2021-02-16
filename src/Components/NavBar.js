import React from "react"
import { connect } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import { logout, setModal, setParentModal } from "../Redux/actions"
import LoginModal from "./LoginModal"
import ParentLoginModal from "./ParentLoginModal"

class NavBar extends React.Component {
  state = {
    activeItem: "home",
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleLoginClick = () => {
    if (!this.props.child) {
      this.props.dispatchModal(true)
    }
  }
  handleParentLoginClick = () => {
    if (!this.props.parent) {
      this.props.dispatchParentModal(true)
    }
  }

  handleLogOutClick = () => {
    localStorage.removeItem("token")
    this.props.logout()
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary className="navBarBackground">
          {this.props.child ? (
            <NavLink to="/welcome">
              <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={this.handleItemClick}
                className="navbar navitem"
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
          <NavLink to="/resources">
            <Menu.Item
              name="resources"
              active={activeItem === "resources"}
              onClick={this.handleItemClick}
              className="navbar"
            />
          </NavLink>

          <Menu.Menu position="right">
            {!this.props.child ? (
              <>
                <Menu.Item
                  name="childLogin"
                  active={activeItem === "childLogin"}
                  onClick={this.handleItemClick}
                  onClick={this.handleLoginClick}
                  className="navbar"
                />
                <Redirect to="/" />
              </>
            ) : null}
            {!this.props.parent && !this.props.child ? (
              <>
                <Menu.Item
                  name="parentLogin"
                  active={activeItem === "parentLogin"}
                  onClick={this.handleItemClick}
                  onClick={this.handleParentLoginClick}
                  className="navbar"
                />
                <Redirect to="/" />
              </>
            ) : null}

            {this.props.parentModalOpen && (
              <ParentLoginModal
                handleParentLoginClick={this.handleParentLoginClick}
              />
            )}
            {this.props.modalOpen && (
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
    modalOpen: state.modalOpen,
    parentModalOpen: state.parentModalOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    dispatchModal: (value) => dispatch(setModal(value)),
    dispatchParentModal: (value) => dispatch(setParentModal(value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
