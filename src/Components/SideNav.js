import React from "react"
import { Checkbox, Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react"
import Homepage from "../Containers/Homepage"

const SidebarExampleSidebar = () => {
  const [visible, setVisible] = React.useState(false)

  handleHomeClick = () => {}

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Checkbox
          checked={visible}
          label={{ children: <code>visible</code> }}
          onChange={(e, data) => setVisible(data.checked)}
        />
      </Grid.Column>

      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
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

          {/* <Sidebar.Pusher> */}
          {/* <Segment basic> */}
          <Homepage />
          {/* </Segment> */}
          {/* </Sidebar.Pusher> */}
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  )
}

export default SidebarExampleSidebar
