import React from "react"
import { connect } from "react-redux"
import { Button, Form, Message, Modal } from "semantic-ui-react"
import { login, setError, setModal } from "../Redux/actions"

class LoginModal extends React.Component {
  state = {
    isOpen: true,
    username: "",
    password: "",
  }
  handleCancel = () => {
    this.props.dispatchModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    console.log("login submit")
    let child = {
      username: this.state.username,
      password: this.state.password,
    }
    console.log("Props:", this.props)
    this.props.login(child)
    this.props.handleLoginClick()
  }

  render() {
    console.log(this.state)
    return (
      <Modal
        onClose={() => this.setState({ isOpen: false })}
        onOpen={() => this.setState({ isOpen: true })}
        open={this.state.isOpen}
        closeOnDimmerClick={false}
        dimmer="blurring"
      >
        <Modal.Header>Welcome back!</Modal.Header>
        <Modal.Content>
          {this.props.error ? (
            <Message negative>
              <Message.Header>{this.props.error}</Message.Header>
            </Message>
          ) : null}
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Field required>
              <label>Username</label>
              <input
                name="username"
                value={this.state.username}
                onChange={this.handleFormChange}
                placeholder="Username"
              />
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleFormChange}
                placeholder="Password"
              />
            </Form.Field>

            <Button type="submit">Submit</Button>
            <Button onClick={this.handleCancel} type="cancel">
              Cancel
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
})

const mapDispatchToProps = (dispatch) => ({
  login: (childInfo) => dispatch(login(childInfo)),
  dispatchModal: (value) => dispatch(setModal(value)),
  dispatchError: (value) => dispatch(setError(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
