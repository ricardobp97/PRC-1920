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
      construct: '',
      where: '',
      results: [],
      message: '',
      loading: '',
    }
    this.handleChangeSelected = this.handleChangeSelected.bind(this);
    this.handleChangeConstruct = this.handleChangeConstruct.bind(this);
    this.handleChangeWhere = this.handleChangeWhere.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
    this.insertData = this.insertData.bind(this);
    this.clean = this.clean.bind(this);
  }

  handleChangeSelected(event) {
    this.setState({selected: event.target.value});
  }

  handleChangeConstruct(event) {
    this.setState({construct: event.target.value});
  }

  handleChangeWhere(event) {
    this.setState({where: event.target.value});
  }

  clean() {
    this.setState({loading: ''})
    this.setState({results: []})
  }

  insertData(){
    this.setState({loading: 'Loading...'})
    axios.get('http://localhost:7000/insert?rep=' + this.state.selected + '&query=CONSTRUCT { ' + this.state.construct + ' } WHERE { ' + this.state.where + ' }', {'Access-Control-Allow-Origin': '*'})
      .then(dados => {
        this.setState({results: [], message: `Foram inseridos ${dados.data} novos triplos na DB: ${this.state.selected}!!`})
      })
      .catch(error => {this.setState({message: 'A query não está correta...', results: []})})
  }

  makeQuery() {
    this.setState({loading: 'Loading...'})
    axios.get('http://localhost:7000/query?rep=' + this.state.selected + '&query=CONSTRUCT { ' + this.state.construct + ' } WHERE { ' + this.state.where + ' }', {'Access-Control-Allow-Origin': '*'})
      .then(dados => {
        if(dados.data.length > 0){
          this.setState({results: dados.data, message: ''})
        }
        else{
          this.setState({message: 'Não existem resultados...', results: []})
        }
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
        <h1>Query Construct Sparql</h1>
        <table>
          <tr>
            <td style={{width: '600px', verticalAlign: 'top'}}>
              <Query
                reps={this.state.reps}
                selected={this.state.selected}
                construct={this.state.construct}
                where={this.state.where}
                handleChangeSelected={this.handleChangeSelected}
                handleChangeConstruct={this.handleChangeConstruct}
                handleChangeWhere={this.handleChangeWhere}
                makeQuery={this.makeQuery}
                insertData={this.insertData}
                />
            </td>
            <td style={{width: '900px', verticalAlign: 'top', maxWidth: '900px'}}>
              <Results loading={this.state.loading} clean={this.clean} message={this.state.message} results={this.state.results}/>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}

export default App