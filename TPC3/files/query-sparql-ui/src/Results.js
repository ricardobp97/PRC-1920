import React from 'react';
import Button from '@material-ui/core/Button';

export default function Results(props) {
  let display = props.results.length > 0 ? <div><Button style={{position: 'relative', right: '20px'}} variant="outlined" onClick={props.clean}>Limpar</Button><Button style={{position: 'relative', left: '20px'}} variant="outlined" onClick={props.export}>Exportar</Button></div> : ''

  return (
    <div>
        <h2>Watch the results:</h2>
        <p id='results'style={{overflow: 'auto', maxHeight: '400px'}}>{props.results.length > 0 ? JSON.stringify(props.results) : ( props.message.length > 0 ? props.message : 'No results to show')}</p>
        {display}
    </div>
  );
}