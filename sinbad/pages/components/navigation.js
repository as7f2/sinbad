import React from "react";
import clsx from "clsx";
import Link from "next/link";
// styling css
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// styling js
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import NoSsr from "@material-ui/core/NoSsr";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import WorkIcon from "@material-ui/icons/Work";
import Toolbar from "@material-ui/core/Toolbar";
import StoreIcon from "@material-ui/icons/Store";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import StorageIcon from "@material-ui/icons/Storage";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
// auth
// import { signIn, signOut, useSession } from "next-auth/react";
// constants
const drawerWidth = 240;
// define inline styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  icon: {
    color: "black",
  },
  appBar: {
    backgroundColor: "white",
    minHeight: "10px",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    backgroundColor: "black",
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: "20px",
  },
}));
// component to render navbar + drawer
export default function AppNavigation() {
  const session = false
  // const [session, loading] = useSession();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NoSsr>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>

            <Grid container justify={"center"}>
              <h1 class="blackText Logo">connector.</h1>
            </Grid>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              ooo
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {!session && (
                <>
                  {" "}
                  <MenuItem onClick={handleClose}>
                    <div onClick={() => signIn()}>Login</div>
                  </MenuItem>{" "}
                </>
              )}
              {session && (
                <>
                  {" "}
                  {session.user.email}{" "}
                  <MenuItem onClick={handleClose}>
                    <div onClick={() => signOut()}>Logout</div>
                  </MenuItem>{" "}
                </>
              )}
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <List>
            <Link href={{ pathname: "/" }}>
              <ListItem button key={"connections"}>
                <ListItemIcon>
                  <SettingsEthernetIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"CONNECTIONS"} />
              </ListItem>
            </Link>
            <Link href={{ pathname: "/sources" }}>
              <ListItem button key={"sources"}>
                <ListItemIcon>
                  <StorageIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"SOURCES"} />
              </ListItem>
            </Link>
            <Link href={{ pathname: "/destinations" }}>
              <ListItem button key={"destinations"}>
                <ListItemIcon>
                  <StoreIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"DESTINATIONS"} />
              </ListItem>
            </Link>
            <Link href={{ pathname: "/notifications" }}>
              <ListItem button key={"notifications"}>
                <ListItemIcon>
                  <NotificationsIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"NOTIFICATIONS"} />
              </ListItem>
            </Link>
            <Link href={{ pathname: "/settings" }}>
              <ListItem button key={"settings"}>
                <ListItemIcon>
                  <SettingsIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"SETTINGS"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </div>
    </NoSsr>
  );
}
