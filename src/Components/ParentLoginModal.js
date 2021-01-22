import React from "react"
import { connect } from "react-redux"
import { Button, Form, Modal } from "semantic-ui-react"
import { loginParent } from "../Redux/actions"

class ParentLoginModal extends React.Component {
  state = {
    isOpen: true,
    email: "",
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
    let parent = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log("Parent in submit: ", parent)
    console.log("Props:", this.props)
    this.props.loginParent(parent)
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
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Field required>
              <label>Email</label>
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleFormChange}
                placeholder="Email"
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

const mapDispatchToProps = (dispatch) => ({
  loginParent: (parentInfo) => dispatch(loginParent(parentInfo)),
})

export default connect(null, mapDispatchToProps)(ParentLoginModal)
