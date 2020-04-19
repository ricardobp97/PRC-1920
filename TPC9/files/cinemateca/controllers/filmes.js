const axios = require('axios')

const prefixes = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX noInferences: <http://www.ontotext.com/explicit>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX : <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = 'http://localhost:7200/repositories/cinema2020?query='

function normalize(array){
    return array.results.bindings.map(obj => {
        var new_obj = {};
        for (let [k,v] of Object.entries(obj)) {
            new_obj[k] = v.value;
        }
        return new_obj
    })
}

module.exports.getLista = async () => {
    var query = `SELECT distinct ?idFilme ?titulo ?duracao ?dataLancamento ?popularidade ?lingua ?resumo WHERE {
        ?idFilme rdf:type :Filme .
        ?idFilme :título ?titulo .
        ?idFilme :duração ?duracao .
        ?idFilme :dataLançamento ?dataLancamento .
        ?idFilme :línguaOriginal ?lingua .
        ?idFilme :popularidade ?popularidade .
        ?idFilme :resumo ?resumo .
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

module.exports.getAtores = async (id) => {
    var query = `SELECT ?atorId ?atorNome ?personagemId ?personagemNome WHERE {
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

module.exports.getRealizadores = async (id) => {
    var query = `SELECT ?realizadorId ?realizadorNome WHERE {
        :movie_${id} :temRealizador ?realizadorId .
        ?realizadorId :nome ?realizadorNome .
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

module.exports.getProdutores = async (id) => {
    var query = `SELECT ?produtorId ?produtorNome WHERE {
        :movie_${id} :temProdutor ?produtorId .
        ?produtorId :nome ?produtorNome .
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

module.exports.getEscritores = async (id) => {
    var query = `SELECT ?escritorId ?escritorNome WHERE {
        :movie_${id} :foiEscrito ?escritorId .
        ?escritorId :nome ?escritorNome .
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

module.exports.getGeneros = async (id) => {
    var query = `SELECT ?generoId ?generoNome WHERE {
        :movie_${id} :temGénero ?generoId .
        ?generoId :nome ?generoNome .
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

module.exports.getPaises = async (id) => {
    var query = `SELECT ?paisId ?paisNome WHERE {
        :movie_${id} :temPaísOrigem ?paisId .
        ?paisId :nome ?paisNome .
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

module.exports.getLinguas = async (id) => {
    var query = `SELECT ?linguaId ?linguaNome WHERE {
        :movie_${id} :temLíngua ?linguaId .
        ?linguaId :nome ?linguaNome .
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

module.exports.getInfo = async (id) => {
    var query = `SELECT ?titulo ?tituloOriginal ?dataLancamento ?duracao ?popularidade
    ?linguaOriginal ?resumo WHERE {
        :movie_${id} :título ?titulo .
        :movie_${id} :títuloOriginal ?tituloOriginal .
        :movie_${id} :dataLançamento ?dataLancamento .
        :movie_${id} :duração ?duracao .
        :movie_${id} :popularidade ?popularidade .
        :movie_${id} :línguaOriginal ?linguaOriginal .
        :movie_${id} :resumo ?resumo .
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

module.exports.getFilm = async (id) => {
    try{
        var atores = await this.getAtores(id)
        var realizadores = await this.getRealizadores(id)
        var produtores = await this.getProdutores(id)
        var escritores = await this.getEscritores(id)
        var generos = await this.getGeneros(id)
        var paises = await this.getPaises(id)
        var linguas = await this.getLinguas(id)
        var filme = await this.getInfo(id)
        filme['atores_personagens'] = normalize(atores)
        filme['realizadores'] = normalize(realizadores)
        filme['produtores'] = normalize(produtores)
        filme['escritores'] = normalize(escritores)
        filme['generos'] = normalize(generos)
        filme['paises'] = normalize(paises)
        filme['linguas'] = normalize(linguas)
        return filme
    }
    catch(e){
        throw(e)
    }
}

module.exports.getFilme = async (id) => {
    var query = `SELECT ?titulo ?tituloOriginal ?dataLancamento ?duracao ?popularidade ?linguaOriginal ?generoId ?generoNome
    ?paisId ?paisNome ?linguaId ?linguaNome ?resumo ?realizadorId ?realizadorNome ?produtorId ?produtorNome ?atorId
    ?atorNome ?personagemId ?personagemNome ?escritorId ?escritorNome WHERE {
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