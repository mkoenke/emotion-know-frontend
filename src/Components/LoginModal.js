import React from "react"
import { Button, Form, Modal } from "semantic-ui-react"

class LoginModal extends React.Component {
  state = {
    isOpen: true,
    username: "",
    password: "",
  }
  handleCancel = () => {
    this.setState({ isOpen: false })
    this.props.handleLoginClick()
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    console.log("login submit")
  }

  render() {
    console.log(this.state)
    return (
      <Modal
        onClose={() => this.setState({ isOpen: false })}
        onOpen={() => this.setState({ isOpen: true })}
        open={this.state.isOpen}
        closeOnDimmerClick={false}
      >
        <Modal.Header>Welcome back!</Modal.Header>
        <Modal.Content>
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

export default LoginModal
