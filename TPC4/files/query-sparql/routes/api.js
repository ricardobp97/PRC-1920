var express = require('express');
var router = express.Router();
var axios = require('axios')

const prefix = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX noInferences: <http://www.ontotext.com/explicit>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
`

router.get('/', function(req, res) {
    axios.get("http://localhost:7200/repositories") // GET Repository
        .then(dados => {
            data = []
            for(let i = 0; i < dados.data.results.bindings.length; i++){
                data[i] = dados.data.results.bindings[i].id.value
            }
            res.jsonp(data)
        })
        .catch(erro => res.status(500).jsonp(erro))
})

router.get('/class', function(req, res) {
    let repositório = req.query.rep
    let id = req.query.id
    let link = `http://localhost:7200/repositories/${repositório}?query=`

    axios.get(`http://localhost:7200/repositories/${repositório}/namespaces`)
        .then(dados => {
            let prefixes = prefix + 'PREFIX : <' + dados.data.results.bindings[0].namespace.value + '>'
            axios.get(link + encodeURIComponent(prefixes + `SELECT * WHERE {
                                                                ?s ?p ?o .
                                                                FILTER(?s = :${id})
                                                            }`))
                .then(dados => {
                    res.jsonp(dados.data)
                })
                .catch(erro => res.status(500).jsonp(erro))
        })
        .catch(erro => res.status(500).jsonp(erro))
})

router.get('/query', function(req, res) {
    let repositório = req.query.rep
    let query = req.query.query
    let link = `http://localhost:7200/repositories/${repositório}?query=`

    axios.get(`http://localhost:7200/repositories/${repositório}/namespaces`)
        .then(dados => {
            let prefixes = prefix + 'PREFIX : <' + dados.data.results.bindings[0].namespace.value + '>'
            axios.get(link + encodeURIComponent(prefixes + query))
                .then(dados => {
                    /*
                    vars = dados.data.head.vars
                    values = dados.data.results.bindings.map(r => {
                        let result = {}
                        for(let i = 0; i < vars.length; i++){
                            let tmp = vars[i]
                            result[tmp] = r[tmp].value
                        }
                        return result
                    })
                    res.jsonp(values)
                    */
                    res.jsonp(dados.data)
                })
                .catch(erro => res.status(500).jsonp(erro))
        })
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;