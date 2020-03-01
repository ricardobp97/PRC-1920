import React from 'react';
import Button from '@material-ui/core/Button';
import StickyHeadTable from './components/StickyHeadTable'

export default function Results(props) {
  let display = props.results.length > 0 ? <div><Button style={{position: 'relative', right: '20px'}} variant="outlined" onClick={props.clean}>Limpar</Button><Button style={{position: 'relative', left: '20px'}} variant="outlined" onClick={props.export}>Exportar</Button></div> : ''

  return (
    <div>
        <h2>Watch the results:</h2>
        <p id='results'>{props.results.length > 0 ? <StickyHeadTable changeId={props.changeId} vars={props.vars} results={props.results} /> : ( props.message.length > 0 ? props.message : ( props.loading.length > 0 ? props.loading : 'No results to show'))}</p>
        {display}
    </div>
  );
}