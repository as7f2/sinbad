import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import NoSsr from "@material-ui/core/NoSsr";
import CssBaseline from "@material-ui/core/CssBaseline";
import SelectForm from "./components/select";
import AppNavigation from "./components/navigation";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: "20px",
  },
}));

export default function Page() {
  const classes = useStyles();

  return (
    <NoSsr>
      <div className={classes.root}>
        <CssBaseline />
        <AppNavigation />
        <main className={classes.content}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          settings page
        </main>
      </div>
    </NoSsr>
  );
}
