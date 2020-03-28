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
    var query = `select distinct ?personagemId ?personagemNome ?atorId ?atorNome ?filmeId ?filmeNome ?filmePopularidade ?filmeDataLancamento where {
        ?personagemId rdf:type :Personagem .
        ?personagemId :nome ?personagemNome .
        ?personagemId :éPersonagemDe ?filmeId .
        ?filmeId :título ?filmeNome .
        ?filmeId :popularidade ?filmePopularidade .
        ?filmeId :dataLançamento ?filmeDataLancamento .
        ?personagemId :éRepresentadoPor ?atorId .
        ?atorId :nome ?atorNome .
        FILTER(?filmeDataLancamento != '') .
        FILTER(?filmeDataLancamento < '2020-03-01') .
    }
    ORDER BY DESC(?filmePopularidade)
    LIMIT 50000`

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    }
}

module.exports.getPersonagem = async (id) => {
    var query = `select ?personagem_nome ?ator_id ?ator_nome ?filme_id ?filme_nome ?filme_popularidade ?filme_dataLancamento
    ?filme_duracao ?filme_resumo ?filme_generoId ?filme_generoNome where {
        :character_${id} :nome ?personagem_nome .
        :character_${id} :éRepresentadoPor ?ator_id .
        ?ator_id :nome ?ator_nome .
        :character_${id} :éPersonagemDe ?filme_id .
        ?filme_id :título ?filme_nome .
        ?filme_id :popularidade ?filme_popularidade .
        ?filme_id :dataLançamento ?filme_dataLancamento .
        ?filme_id :duração ?filme_duracao .
        ?filme_id :resumo ?filme_resumo .
        ?filme_id :temGénero ?filme_generoId .
        ?filme_generoId :nome ?filme_generoNome .
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