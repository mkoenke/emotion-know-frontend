import React from "react"
import { connect } from "react-redux"
import { Button, Form, Modal } from "semantic-ui-react"
import { setChild } from "../Redux/actions"

class SignUpModal extends React.Component {
  state = {
    isOpen: true,
    username: "",
    password: "",
    email: "",
    parentPassword: "",
  }
  handleCancel = () => {
    this.setState({ isOpen: false })
    this.props.setViewModalStateToFalse()
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    console.log("Sign up")
    let parentData = {
      email: this.state.email,
      password: this.state.parentPassword,
    }
    console.log("Parent data: ", parentData)
    fetch("http://localhost:3000/parents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success new parent:", data.parent)
        let childData = {
          username: this.state.username,
          password: this.state.password,
          parent_id: data.parent.id,
        }
        console.log("child data:", childData)
        fetch("http://localhost:3000/children", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(childData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data)
            localStorage.setItem("token", data.jwt)
            console.log("props: ", this.props)
            this.props.dispatchChild(data.child)
            this.props.setViewModalStateToFalse()
          })
          .catch((error) => {
            console.error("Error:", error)
          })
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  render() {
    console.log("state:", this.state)
    return (
      <Modal
        onClose={() => this.setState({ isOpen: false })}
        onOpen={() => this.setState({ isOpen: true })}
        open={this.state.isOpen}
        closeOnDimmerClick={false}
        dimmer="blurring"
      >
        <Modal.Header>Welcome</Modal.Header>
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
                type="password"
                value={this.state.password}
                onChange={this.handleFormChange}
                placeholder="Password"
              />
            </Form.Field>
            <Form.Field required>
              <label>Parent's email</label>
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleFormChange}
                placeholder="Parent's Email"
              />
            </Form.Field>{" "}
            <Form.Field required>
              <label>Parent's Password</label>
              <input
                name="parentPassword"
                type="password"
                value={this.state.parentPassword}
                onChange={this.handleFormChange}
                placeholder="Parent's Password"
              />{" "}
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

function mapDispatchToProps(dispatch) {
  return {
    dispatchChild: (child) => dispatch(setChild(child)),
  }
}

export default connect(null, mapDispatchToProps)(SignUpModal)
