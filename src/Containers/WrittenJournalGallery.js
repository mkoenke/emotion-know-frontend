import React from "react"
import { connect } from "react-redux"
import { Grid, Header } from "semantic-ui-react"
import JournalCard from "../Components/JournalCard"

class WrittenJournalGallery extends React.Component {
  componentDidMount() {
    // get all journal entries from redux?  or fetch from backend?
  }
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
    // console.log(this.props.child.journal_entries)
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
