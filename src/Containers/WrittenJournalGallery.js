import React from "react"
import { connect } from "react-redux"
import { Grid, Header } from "semantic-ui-react"
import image1 from "../assets/images/writtenGallery1.jpg"
import image2 from "../assets/images/writtenGallery2.jpg"
import image3 from "../assets/images/writtenGallery3.jpg"
import image4 from "../assets/images/writtenGallery4.jpg"
import image5 from "../assets/images/writtenGallery5.jpg"
import image6 from "../assets/images/writtenGallery6.jpg"
import JournalCard from "../Components/JournalCard"

class WrittenJournalGallery extends React.Component {
  arrayOfJournals = () => {
    const imageArray = [image1, image2, image3, image4, image5, image6]
    let i = 0
    return this.props.allJournals.map((card) => {
      if (i < imageArray.length - 1) {
        i++
      } else {
        i = 0
      }
      return (
        <Grid.Column>
          <JournalCard
            centered
            key={card.id}
            cardObj={card}
            image={imageArray[i]}
          />
        </Grid.Column>
      )
    })
  }
  render() {
    return (
      <>
        <div className="background pagePadding">
          {this.props.child ? (
            <Header className="pageHeader" size="huge" textAlign="center">
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
