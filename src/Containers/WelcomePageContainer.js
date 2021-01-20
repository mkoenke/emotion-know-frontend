import React from "react"
import { Icon } from "semantic-ui-react"
import SideNav from "../Components/SideNav"

class WelcomePageContainer extends React.Component {
  state = {
    sideNavView: false,
  }

  toggleSideNav = () => {
    console.log("here")
    this.setState({ sideNavView: true })
  }

  render() {
    console.log("State in Welcome page: ", this.state)
    return (
      <>
        <Icon name="bars" onClick={this.toggleSideNav} />
        {this.state.sideNavView && <SideNav />}
      </>
    )
  }
}

export default WelcomePageContainer
