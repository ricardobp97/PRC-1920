var express = require('express');
var router = express.Router();
var axios = require('axios')

const prefix = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX noInferences: <http://www.ontotext.com/explicit>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
`

const encode = (prefixes,query) => {
    return encodeURIComponent(prefixes + query)
}

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

router.get('/query', function(req, res) {
    let repositório = req.query.rep
    let query = req.query.query
    let preQuery = 'select ?n where {?n rdf:type owl:Class.} limit 1'
    let link = `http://localhost:7200/repositories/${repositório}?query=`

    axios.get(link + encode(prefix,preQuery)) // GET URI of chosen repository
        .then(dados => {
            let uri = '<' + dados.data.results.bindings[0].n.value.split("#")[0] + '#>'
            let prefixes = prefix + 'PREFIX : ' + uri
            axios.get(link + encode(prefixes,query)) // GET data with query
                .then(dados => {
                    data = []
                    for(let i = 0; i < dados.data.results.bindings.length; i++)
                        data[i] = dados.data.results.bindings[i]
                    res.jsonp(data)
                })
                .catch(erro => res.status(500).jsonp(erro))
        })
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;