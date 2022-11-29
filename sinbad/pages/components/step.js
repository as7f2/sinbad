import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "bootstrap/dist/css/bootstrap.css";
import FormLocal from "./forms/formLocal";
import FormAzure from "./forms/formAzure";
import FormAws from "./forms/formAws";
import FormGCP from "./forms/formGCP";
import Select from "react-select";

const options = [
  { value: 1, label: "Local" },
  { value: 2, label: "Microsoft Azure" },
  { value: 3, label: "Amazon Web Services" },
  { value: 4, label: "Google Cloud Platform" },
];

class SelectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local: false,
      azure: false,
      aws: false,
      gcp: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e);
    if (e.value == 1) {
      this.setState({ local: true, azure: false, aws: false, gcp: false });
    } else if (e.value == 2) {
      console.log("2 run");
      this.setState({ local: false, azure: true, aws: false, gcp: false });
    } else if (e.value == 3) {
      this.setState({ local: false, azure: false, aws: true, gcp: false });
      console.log("3 run");
    } else if (e.value == 4) {
      console.log("4 run");
      this.setState({ local: false, azure: false, aws: false, gcp: true });
    } else if (e.value == 5) {
      console.log("5 run");
    } else {
      console.log("none");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col justify-content-center">
            <Select onChange={this.handleChange} options={options} />
          </div>
        </div>
        <div class="row justify-content-center">
          {this.state.local && <FormLocal />}
          {this.state.azure && <FormAzure />}
          {this.state.aws && <FormAws />}
          {this.state.gcp && <FormGCP />}
        </div>
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ["Connect data source", "Connect data destination", "Schedule"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <SelectForm />;
    case 1:
      return <SelectForm />;
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return "Unknown step";
  }
}

export default function StepForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
