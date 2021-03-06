import React from "react"
import { connect } from "react-redux"
import { Button, Form, Message, Modal } from "semantic-ui-react"
import { loginParent, setError, setParentModal } from "../Redux/actions"

class ParentLoginModal extends React.Component {
  state = {
    isOpen: true,
    email: "",
    password: "",
  }
  handleCancel = () => {
    this.props.dispatchParentModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    let parent = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginParent(parent)
    this.props.handleParentLoginClick()
  }

  render() {
    return (
      <Modal
        onClose={() => this.setState({ isOpen: false })}
        onOpen={() => this.setState({ isOpen: true })}
        open={this.state.isOpen}
        closeOnDimmerClick={false}
        dimmer="blurring"
      >
        <Modal.Header className="background pageHeader">
          Welcome back!
        </Modal.Header>
        <Modal.Content className="background">
          {this.props.error ? (
            <Message negative>
              <Message.Header>{this.props.error}</Message.Header>
            </Message>
          ) : null}
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Field required>
              <label className="formLabel">Email</label>
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleFormChange}
                placeholder="Email"
              />
            </Form.Field>
            <Form.Field required>
              <label className="formLabel">Password</label>
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
  loginParent: (parentInfo) => dispatch(loginParent(parentInfo)),
  dispatchParentModal: (value) => dispatch(setParentModal(value)),
  dispatchError: (value) => dispatch(setError(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ParentLoginModal)
