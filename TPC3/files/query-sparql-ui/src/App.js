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
      results: [],
      message: ''
    }
    this.handleChangeSelected = this.handleChangeSelected.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
    this.export = this.export.bind(this);
    this.clean = this.clean.bind(this);
  }

  handleChangeSelected(event) {
    this.setState({selected: event.target.value});
  }

  handleChangeQuery(event) {
    this.setState({query: event.target.value});
  }

  clean() {
    this.setState({results: []})
  }

  export() {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.state.results)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "results.json";
    element.click();
  }

  makeQuery() {
    axios.get('http://localhost:7000/query?rep=' + this.state.selected + '&query=' + this.state.query, {'Access-Control-Allow-Origin': '*'})
      .then(dados => {
        this.setState({results: dados.data, message: ''})
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
        <h1>Query Sparql</h1>
        <table>
          <tr style={{width: '100%'}}>
            <td style={{width: '800px', verticalAlign: 'top'}}>
              <Query
                reps={this.state.reps}
                selected={this.state.selected}
                query={this.state.query}
                handleChangeSelected={this.handleChangeSelected}
                handleChangeQuery={this.handleChangeQuery}
                makeQuery={this.makeQuery}
                />
            </td>
            <td style={{width: '50%', verticalAlign: 'top'}}>
              <Results clean={this.clean} message={this.state.message} export={this.export} results={this.state.results}/>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}

export default App