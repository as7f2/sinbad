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

export default SelectForm;
