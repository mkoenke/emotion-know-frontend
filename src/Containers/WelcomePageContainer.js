import React from "react"
import { connect } from "react-redux"
import { Header } from "semantic-ui-react"
import WelcomePageGrid from "../Components/WelcomePageGrid"
import ReportGalleryPage from "./ReportGalleryPage"

class WelcomePageContainer extends React.Component {
  render() {
    console.log("props: ", this.props.parent)
    return (
      <>
        {!this.props.parent && this.props.child ? (
          <>
            <div className="background">
              <Header
                className="pageHeader"
                // size="huge"
                textAlign="center"
                // style={{ color: "rgb(171, 218, 225)" }}
              >
                Welcome to EmotionKnow, {this.props.child.username}!
              </Header>

              <WelcomePageGrid />
            </div>
          </>
        ) : null}
        {this.props.parent ? <ReportGalleryPage /> : null}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    parent: state.parent,
  }
}

export default connect(mapStateToProps)(WelcomePageContainer)
