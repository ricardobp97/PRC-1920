import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Query(props) {
    return (
        <div>
            <h2>Build your query:</h2>
            <FormControl variant="outlined">
                <p>Choose the repository: <Select
                                                style={{width: '250px'}}
                                                native
                                                value={props.selected}
                                                onChange={props.handleChangeSelected}
                                            >
                                                {props.reps.map(rep => {
                                                    return (
                                                        <option value={rep} key={rep}>{rep}</option>
                                                    )
                                                })}
                                            </Select>
                </p>
            </FormControl>
            <p style={{width: '75%', position:'relative', left: '90px'}}>Construct Block:
            <br />
            <TextField
                onChange={props.handleChangeConstruct}
                fullWidth={true}
                multiline
                rows="6"
                variant="outlined"
                value={props.construct}
            />
            </p>
            <p style={{width: '75%', position:'relative', left: '90px'}}>Where Block:
            <TextField
                onChange={props.handleChangeWhere}
                fullWidth={true}
                multiline
                rows="6"
                variant="outlined"
                value={props.where}
            />
            </p>
            <Button variant="outlined" style={{position:'relative', right: '30px'}} onClick={props.makeQuery}>
                Testar
            </Button>
            <Button variant="outlined" style={{position:'relative', left: '50px'}} onClick={props.insertData}>
                Inserir
            </Button>
        </div>
    )
}