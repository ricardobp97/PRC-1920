import React from 'react';
import axios from 'axios'
import Query from './Query'
import Results from './Results'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      reps: [],
      selected: '',
      query: '',
      vars: [],
      results: [],
      message: '',
      loading: '',
    }
    this.handleChangeSelected = this.handleChangeSelected.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
    this.export = this.export.bind(this);
    this.clean = this.clean.bind(this);
    this.changeId = this.changeId.bind(this);
  }

  handleChangeSelected(event) {
    this.setState({selected: event.target.value});
  }

  handleChangeQuery(event) {
    this.setState({query: event.target.value});
  }

  clean() {
    this.setState({loading: ''})
    this.setState({results: []})
  }

  export() {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.state.results)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "results.json";
    element.click();
  }

  changeId(event) {
    this.setState({loading: 'Loading...'})
    axios.get('http://localhost:7000/class?rep=' + this.state.selected + '&id=' + event.target.id, {'Access-Control-Allow-Origin': '*'})
      .then(dados => {
        this.setState({vars: dados.data.head.vars, results: dados.data.results.bindings, message: ''})
      })
      .catch(error => console.log(error))
  }

  makeQuery() {
    this.setState({loading: 'Loading...'})
    axios.get('http://localhost:7000/query?rep=' + this.state.selected + '&query=' + this.state.query, {'Access-Control-Allow-Origin': '*'})
      .then(dados => {
        this.setState({vars: dados.data.head.vars, results: dados.data.results.bindings, message: ''})
      })
      .catch(error => {this.setState({message: 'A query não está correta...', results: []})})
  }

  componentDidMount() {
    axios.get('http://localhost:7000', {'Access-Control-Allow-Origin': '*'})
      .then(dados => {
        this.setState({reps: dados.data, selected: dados.data[0]})
      })
      .catch(error => console.log(error))
  }


  render(){
    return (
      <div style={{textAlign: 'center', fontFamily: 'sans-serif'}}>
        <h1>Query Sparql {this.state.id}</h1>
        <table>
          <tr>
            <td style={{width: '600px', verticalAlign: 'top'}}>
              <Query
                reps={this.state.reps}
                selected={this.state.selected}
                query={this.state.query}
                handleChangeSelected={this.handleChangeSelected}
                handleChangeQuery={this.handleChangeQuery}
                makeQuery={this.makeQuery}
                />
            </td>
            <td style={{width: '900px', verticalAlign: 'top', maxWidth: '900px'}}>
              <Results loading={this.state.loading} clean={this.clean} message={this.state.message} export={this.export} changeId={this.changeId} vars={this.state.vars} results={this.state.results}/>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}

export default App