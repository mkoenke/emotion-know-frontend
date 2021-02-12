import React from "react"
import { connect } from "react-redux"
import { Grid, Header } from "semantic-ui-react"
import JournalCard from "../Components/JournalCard"
// import image1 from "../assets/images/writtenGallery1.jpg"
// import image2 from "../assets/images/writtenGallery2.jpg"
// import image3 from "../assets/images/writtenGallery3.jpg"
// import image4 from "../assets/images/writtenGallery4.jpg"
// import image5 from "../assets/images/writtenGallery5.jpg"
// import image6 from "../assets/images/writtenGallery6.jpg"

class WrittenJournalGallery extends React.Component {
  arrayOfJournals = () => {
    return this.props.allJournals.map((card) => {
      return (
        <Grid.Column>
          <JournalCard centered key={card.id} cardObj={card} />
        </Grid.Column>
      )
    })
  }
  render() {
    return (
      <>
        <div className="background">
          {this.props.child ? (
            <Header
              className="pageHeader"
              size="huge"
              textAlign="center"
              style={{ color: "rgb(171, 218, 225)" }}
            >
              {this.props.child.username}'s Written Journals
            </Header>
          ) : null}

          <Grid centered columns="three">
            <Grid.Row>{this.arrayOfJournals()}</Grid.Row>
          </Grid>
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    allJournals: state.allJournals,
  }
}

export default connect(mapStateToProps)(WrittenJournalGallery)
