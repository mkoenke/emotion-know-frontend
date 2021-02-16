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
    return (
      <>
        <div className="pattern">
          {this.props.child ? (
            <Header className="pageHeader" size="huge" textAlign="center">
              How are you feeling today, {this.props.child.username}?
            </Header>
          ) : null}
          <br />
          <Grid centered>
            <div className="journal">
              <Form
                className="content journalForm"
                onSubmit={this.handleFormSubmit}
              >
                <Form.Group widths="equal">
                  <Form.Field>
                    <label className="formLabel journalForm">Title</label>
                    <input
                      placeholder="Create Title"
                      onChange={this.changeHandler}
                      name="title"
                      value={this.state.title}
                    ></input>
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <label className="formLabel journalForm">
                    Today I feel...
                  </label>
                  <textarea
                    placeholder="Get it all out..."
                    className="formSize"
                    onChange={this.changeHandler}
                    name="content"
                    value={this.state.content}
                  ></textarea>
                </Form.Field>

                <Form.Button>Submit</Form.Button>
              </Form>
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchJournal: (journal) => dispatch(postJournal(journal)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WritingPage)
