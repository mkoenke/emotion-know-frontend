import React from "react"
import { Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react"
import WelcomePage from "../Containers/WelcomePage"

class SideNav extends React.Component {
  state = {
    visible: true,
  }
  render() {
    return (
      <Grid>
        {/* <Grid.Column>
          <Checkbox
            checked={visible}
            label={{ children: <code>visible</code> }}
            onChange={(e, data) => setVisible(data.checked)}
          />
        </Grid.Column> */}

        <Grid.Column>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={() => this.setState({ visible: false })}
              vertical
              visible={this.state.visible}
              width="thin"
            >
              <Menu.Item as="a">
                <Icon name="home" />
                Home
              </Menu.Item>
              <Menu.Item as="a">
                <Icon name="gamepad" />
                Games
              </Menu.Item>
              <Menu.Item as="a">
                <Icon name="camera" />
                Channels
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
              <Segment basic>
                <WelcomePage />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SideNav
