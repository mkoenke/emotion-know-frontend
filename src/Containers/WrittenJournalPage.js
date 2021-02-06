import emailjs from "emailjs-com"
import React from "react"
import { connect } from "react-redux"
import { Form, Grid, Header } from "semantic-ui-react"
import { postJournal } from "../Redux/actions"

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
    let journal = {
      child_id: this.props.child.id,
      title: this.state.title,
      content: this.state.content,
    }
    this.props.dispatchJournal(journal)
    this.setState({ title: "", content: "" })
    this.sendEmail()
    this.props.history.push("/journals")
  }

  sendEmail = () => {
    emailjs
      .send(
        "service_b4uxd6p",
        "template_skc2xnu",
        {
          parentEmail: this.props.child.parent_email,
          replyEmail: "EmotionKnowTeam@gmail.com",
        },
        "user_CN4ma3aQ7rwUtwDJc9mdp"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text)
        },
        function (error) {
          console.log("FAILED...", error)
        }
      )
  }

  render() {
    console.log(this.state)
    console.log("Props in written journal page: ", this.props)
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
})

export default connect(mapStateToProps, mapDispatchToProps)(WritingPage)
