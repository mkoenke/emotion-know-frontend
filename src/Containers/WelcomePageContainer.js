import React from "react"
import { connect } from "react-redux"
import { Header } from "semantic-ui-react"
import WelcomePageGrid from "../Components/WelcomePageGrid"
// import SideNav from "../Components/SideNav"

class WelcomePageContainer extends React.Component {
  //   state = {
  //     sideNavView: false,
  //   }

  //   toggleSideNav = () => {
  //     console.log("here")
  //     this.setState({ sideNavView: true })
  //   }

  //   render() {
  //     console.log("State in Welcome page: ", this.state)
  //     return (
  //       <>
  //         <Icon name="bars" onClick={this.toggleSideNav} />
  //         {this.state.sideNavView && <SideNav />}
  //       </>
  //     )
  //   }

  render() {
    return (
      <>
        {this.props.child ? (
          <Header
            className="h1"
            size="huge"
            textAlign="center"
            style={{ color: "rgb(171, 218, 225)" }}
          >
            Welcome to EmotionKnow, {this.props.child.username}!
          </Header>
        ) : null}
        <WelcomePageGrid />
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
  }
}

export default connect(mapStateToProps)(WelcomePageContainer)
