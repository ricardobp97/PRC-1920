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
    var query = `SELECT distinct ?idFilme ?titulo ?duracao ?dataLancamento ?popularidade ?lingua WHERE {
        ?idFilme rdf:type :Filme .
        ?idFilme :título ?titulo .
        ?idFilme :duração ?duracao .
        ?idFilme :dataLançamento ?dataLancamento .
        ?idFilme :línguaOriginal ?lingua .
        ?idFilme :popularidade ?popularidade .
        FILTER(?dataLancamento != '') .
        FILTER(?dataLancamento < '2020-03-01') .
        FILTER(?duracao > 0) .
    } ORDER BY DESC(?popularidade)`

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    }
}

module.exports.getFilme = async (id) => {
    var query = `SELECT ?titulo ?tituloOriginal ?dataLancamento ?duracao ?popularidade ?linguaOriginal ?generoId ?generoNome ?paisId ?paisNome ?linguaId ?linguaNome ?resumo ?realizadorId ?realizadorNome ?produtorId ?produtorNome ?atorId ?atorNome ?personagemId ?personagemNome ?escritorId ?escritorNome WHERE {
        :movie_${id} :título ?titulo .
        :movie_${id} :títuloOriginal ?tituloOriginal .
        :movie_${id} :dataLançamento ?dataLancamento .
        :movie_${id} :duração ?duracao .
        :movie_${id} :popularidade ?popularidade .
        :movie_${id} :línguaOriginal ?linguaOriginal .
        :movie_${id} :resumo ?resumo .
        :movie_${id} :temGénero ?generoId .
        :movie_${id} :temPaísOrigem ?paisId .
        ?paisId :nome ?paisNome .
        :movie_${id} :temLíngua ?linguaId .
        ?linguaId :nome ?linguaNome .
        ?generoId :nome ?generoNome .
        :movie_${id} :temRealizador ?realizadorId .
        ?realizadorId :nome ?realizadorNome .
        :movie_${id} :temProdutor ?produtorId .
        ?produtorId :nome ?produtorNome .
        optional {
            :movie_${id} :foiEscrito ?escritorId .
            ?escritorId :nome ?escritorNome .
        }
        :movie_${id} :temPersonagem ?personagemId .
        ?personagemId :nome ?personagemNome .
        ?personagemId :éRepresentadoPor ?atorId .
        ?atorId :nome ?atorNome .
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