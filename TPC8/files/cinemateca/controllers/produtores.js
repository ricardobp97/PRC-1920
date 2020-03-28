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
    var query = `SELECT distinct ?id ?nome ?sexo (COUNT(?filme) AS ?numFilmes) WHERE {
        ?id rdf:type :Produtor .
        ?id :nome ?nome .
        ?id :sexo ?sexo .
        ?id :produziu ?filme .
    }
    GROUP BY ?id ?nome ?sexo
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

module.exports.getProdutor = async (id) => {
    var query = `SELECT ?nome ?sexo ?filmeProduzidoId ?filmeProduzidoNome ?filmeProduzidoPopularidade ?filmeProduzidoDataLancamento
    ?filmeRealizadoId ?filmeRealizadoNome ?filmeRealizadoPopularidade ?filmeRealizadoDataLancamento ?filmeId ?filmeNome
    ?filmePopularidade ?filmeDataLancamento ?personagemNome ?personagemId ?filmeEscritoId ?filmeEscritoNome
    ?filmeEscritoPopularidade ?filmeEscritoDataLancamento WHERE {
        :person_${id} :nome ?nome .
        :person_${id} :sexo ?sexo .
        :person_${id} :produziu ?filmeProduzidoId .
        ?filmeProduzidoId :título ?filmeProduzidoNome .
        ?filmeProduzidoId :popularidade ?filmeProduzidoPopularidade .
        ?filmeProduzidoId :dataLançamento ?filmeProduzidoDataLancamento .
        optional {
            :person_${id} :atuou ?filmeId .
            ?filmeId :título ?filmeNome .
            ?filmeId :popularidade ?filmePopularidade .
            ?filmeId :dataLançamento ?filmeDataLancamento .
            :person_${id} :representa ?personagemId .
            ?personagemId :nome ?personagemNome .
            ?personagemId :éPersonagemDe ?filmeId .
        }
        optional {
            :person_${id} :realizou ?filmeRealizadoId .
            ?filmeRealizadoId :título ?filmeRealizadoNome .
            ?filmeRealizadoId :popularidade ?filmeRealizadoPopularidade .
            ?filmeRealizadoId :dataLançamento ?filmeRealizadoDataLancamento .
        }
        optional {
            :person_${id} :escreveu ?filmeEscritoId .
            ?filmeEscritoId :título ?filmeEscritoNome .
            ?filmeEscritoId :popularidade ?filmeEscritoPopularidade .
            ?filmeEscritoId :dataLançamento ?filmeEscritoDataLancamento .
        }
    }`

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    }
}