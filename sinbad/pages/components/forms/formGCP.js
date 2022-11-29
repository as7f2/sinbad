//https://codesandbox.io/s/ccnxm?file=/src/form.jsx:0-856
//https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
//https://www.jondjones.com/frontend/react/npm-packages-for-react-developers/how-to-build-a-form-in-react-using-react-json-schema-form/
import React, { Component } from "react";
import JSONSchemaForm from "@rjsf/material-ui";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
const URL = "http://localhost:5000/api/v1/sources/";

const postSchema = {
  type: "object",
  properties: {
    gcp_auth_file_contents: {
      title: "gcp_auth_file_contents",
      type: "string",
    },
    bucket_name: {
      title: "bucket_name",
      type: "string",
    },
    prefix: {
      title: "prefix",
      type: "string",
    },
    extension: {
      title: "extension",
      type: "string",
    },
    filename: {
      title: "filename",
      type: "string",
    },
  },
  required: ["gcp_auth_file_contents", "bucket_name"],
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ formData }) {
    console.log(formData);
    axios
      .post(URL, {
        data: { formData },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col justify-content-center">
            <JSONSchemaForm onSubmit={this.handleSubmit} schema={postSchema} />
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
