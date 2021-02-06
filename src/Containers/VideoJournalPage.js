import React from "react"
import { connect } from "react-redux"
import { Header } from "semantic-ui-react"
import RecordView from "../Components/CameraView"

class CameraPage extends React.Component {
  render() {
    console.log("Props: ", this.props)
    return (
      <>
        {this.props.child ? (
          <Header
            className="h1"
            size="huge"
            textAlign="center"
            style={{ color: "rgb(171, 218, 225)" }}
          >
            How are you feeling today, {this.props.child.username}?
          </Header>
        ) : null}

        <RecordView history={this.props.history} />
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
  }
}

export default connect(mapStateToProps)(CameraPage)
