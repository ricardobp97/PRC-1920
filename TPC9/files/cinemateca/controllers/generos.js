const axios = require('axios')

const prefixes = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX noInferences: <http://www.ontotext.com/explicit>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX : <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = 'http://localhost:7200/repositories/cinema2020?query='

module.exports.getLista = async () => {
    var query = `SELECT distinct ?id ?nome (COUNT(?filme) AS ?numFilmes) WHERE {
        ?id rdf:type :Género .
        ?id :nome ?nome .
        ?id :éGéneroDe ?filme .
    }
    GROUP BY ?id ?nome
    ORDER BY DESC(?numFilmes)`

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    }
}

module.exports.getGenero = async (id) => {
    var query = `SELECT ?nome ?filmeId ?filmeNome ?filmePopularidade ?filmeDataLancamento WHERE {
        :genero_${id} :nome ?nome .
        :genero_${id} :éGéneroDe ?filmeId .
        ?filmeId :título ?filmeNome .
        ?filmeId :popularidade ?filmePopularidade .
        ?filmeId :dataLançamento ?filmeDataLancamento .
    } ORDER BY DESC(?filmePopularidade)`

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    }
}