import React from "react"
import { connect } from "react-redux"
import { Grid, Header } from "semantic-ui-react"
import AudioCard from "../Components/AudioCard"

class AudioGalleryPage extends React.Component {
  arrayOfJournals = () => {
    return this.props.allAudios.map((card) => {
      return (
        <Grid.Column>
          <AudioCard centered key={card.id} cardObj={card} />
        </Grid.Column>
      )
    })
  }
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
            {this.props.child.username}'s Audio Journals
          </Header>
        ) : null}

        <Grid centered columns="three">
          <Grid.Row>{this.arrayOfJournals()}</Grid.Row>
        </Grid>
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
    allAudios: state.allAudios,
  }
}
export default connect(mapStateToProps)(AudioGalleryPage)
