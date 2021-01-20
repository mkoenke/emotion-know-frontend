import React from "react"
import { connect } from "react-redux"
import { Form, Grid, Header } from "semantic-ui-react"
import { setJournal } from "../Redux/actions"

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
    console.log("journal submit")
    let journal = {
      title: this.state.title,
      content: this.state.content,
    }

    console.log("Props:", this.props)
    this.props.dispatchJournal(journal)
  }
  render() {
    console.log(this.state)
    return (
      <>
        <Header textAlign="center">How are you feeling today?</Header>
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

const mapDispatchToProps = (dispatch) => ({
  dispatchJournal: (journal) => dispatch(setJournal(journal)),
})

export default connect(null, mapDispatchToProps)(WritingPage)
