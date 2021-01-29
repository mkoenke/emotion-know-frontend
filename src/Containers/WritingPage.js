import React from "react"
import { connect } from "react-redux"
import { Form, Grid, Header } from "semantic-ui-react"
import { fetchReportsfromChild, postJournal } from "../Redux/actions"

class WritingPage extends React.Component {
  state = {
    title: "",
    content: "",
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleFormSubmit = (event) => {
    event.preventDefault()
    // console.log("journal submit")
    let journal = {
      child_id: this.props.child.id,
      title: this.state.title,
      content: this.state.content,
    }
    this.props.dispatchJournal(journal)
    this.setState({ title: "", content: "" })
    /// redirect to written journal gallery
    /// fetch child again and set reports in state
    this.props.dispatchReports(this.props.child)
  }
  render() {
    console.log(this.state)
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
        <br />
        <Grid centered>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Title"
                placeholder="Title"
                onChange={this.changeHandler}
                name="title"
                value={this.state.title}
              />
            </Form.Group>

            <Form.TextArea
              label="Today I feel..."
              placeholder="Get it all out..."
              style={{ height: "600px", width: "500px" }}
              onChange={this.changeHandler}
              name="content"
              value={this.state.content}
            />

            <Form.Button>Submit</Form.Button>
          </Form>
        </Grid>
      </>
    )
  }
}
// function mapStateToProps(state) {
//     return {
//       child: state.child,
//     }
//   }

const mapStateToProps = (state) => ({
  child: state.child,
})

const mapDispatchToProps = (dispatch) => ({
  dispatchJournal: (journal) => dispatch(postJournal(journal)),
  dispatchReports: (child) => dispatch(fetchReportsfromChild(child)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WritingPage)
