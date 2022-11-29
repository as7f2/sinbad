import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import NoSsr from "@material-ui/core/NoSsr";
import CssBaseline from "@material-ui/core/CssBaseline";
import ExtendedTable from "./components/table";
import AppNavigation from "./components/navigation";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import SelectForm from "./components/select";

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

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function Page() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
          <Accordion
            square
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Create Source</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SelectForm />
            </AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>Manage Sources</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ExtendedTable
                endpoint="http://0.0.0.0:5000/api/v1/sources/"
                columns={["id", "created", "updated", "name", "action"]}
              />
            </AccordionDetails>
          </Accordion>
        </main>
      </div>
    </NoSsr>
  );
}
