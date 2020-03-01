import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.vars.map(column => (
                <TableCell align='center'>
                    {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.results.map(row => {
              return (
                <TableRow>
                    {props.vars.map(column => {
                    const type = row[column].type
                    const value = row[column].value;
                    return (
                      <TableCell align='center'>
                        <p style={type === 'uri' ? {color: '#018ae1', cursor: 'pointer'} : {}} id={type === 'uri' ? value.split('#')[1] : value} onClick={type === 'uri' ? props.changeId : (() => {})} >{type === 'uri' ? (':' + value.split('#')[1]) : value}</p>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}