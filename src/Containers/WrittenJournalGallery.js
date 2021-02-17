import JwPagination from "jw-react-pagination"
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
  state = {
    items: [],
    pageOfItems: [],
  }

  componentDidMount() {
    this.setState({ items: this.props.allJournals })
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems })
  }

  arrayOfJournals = () => {
    const imageArray = [image1, image2, image3, image4, image5, image6]
    let i = 0
    return this.state.pageOfItems.map((card) => {
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
    const customLabels = {
      first: "<<",
      last: ">>",
      previous: "<",
      next: ">",
    }
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
            <div className="paginateLarge">
              <JwPagination
                items={this.state.items}
                onChangePage={this.onChangePage}
                labels={customLabels}
                pageSize={9}
              />
            </div>
          </Grid>
          <div className="footer"></div>
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
