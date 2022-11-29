import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 750,
  },
});

const ExtendedTable = ({ endpoint, columns }) => {
  const classes = useStyles();

  const [items, setItems] = useState([]);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setItems(response.data);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const removeData = (id) => {
    // eslint-disable-next-line
    axios
      .delete(`${endpoint}${id}`)
      .then(() => {
        return axios.get(`$endpoint`);
      })
      .then((response) => {
        const items = response.data;
        setItems(items);
      });
  };

  const renderHeader = () => {
    let headerElement = columns;

    return headerElement.map((key, index) => {
      return <TableCell key={index}>{key.toUpperCase()}</TableCell>;
    });
  };

  const renderBody = () => {
    return (
      items &&
      items.map((item) => {
        return (
          <TableRow key={item.id}>
            <TableCell component="th" scope="row">
              {item.id}
            </TableCell>
            <TableCell align="left">{item.created}</TableCell>
            <TableCell align="left">{item.updated}</TableCell>
            <TableCell align="left">{item.name}</TableCell>
            <TableCell>
              <button className="button" onClick={() => removeData(item.id)}>
                Delete
              </button>
            </TableCell>
          </TableRow>
        );
      })
    );
  };

  return (
    <TableContainer className="viewer-container" component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>{renderHeader()}</TableRow>
        </TableHead>
        <TableBody>{renderBody()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExtendedTable;
