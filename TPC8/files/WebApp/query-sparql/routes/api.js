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
    axios.get("http://localhost:7200/repositories")
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
    let link = `http://localhost:7200/repositories/${repositório}?query=`

    axios.get(`http://localhost:7200/repositories/${repositório}/namespaces`)
        .then(dados => {
            let prefixes = prefix + 'PREFIX : <' + dados.data.results.bindings[0].namespace.value + '>'
            axios.get(link + encodeURIComponent(prefixes + query))
                .then(dados => {
                    var triplos = dados.data.split(".\n").map(t => t.split(" ").filter(s => s.length > 0)).filter(s => s.length > 0)
                    var send = triplos.map(l => {
                        return {
                            s: l[0],
                            p: l[1],
                            o: l[2]
                        }
                    })
                    if(!send[0].s)
                        send = []
                    res.jsonp(send)
                })
                .catch(erro => res.status(500).jsonp(erro))
        })
        .catch(erro => res.status(500).jsonp(erro))
})

router.get('/insert', function(req, res) {
    let repositório = req.query.rep
    let query = req.query.query
    let link = `http://localhost:7200/repositories/${repositório}?query=`
    var postLink = `http://localhost:7200/repositories/${repositório}/statements`

    axios.get(`http://localhost:7200/repositories/${repositório}/namespaces`)
        .then(dados => {
            let prefixes = prefix + 'PREFIX : <' + dados.data.results.bindings[0].namespace.value + '>'
            axios.get(link + encodeURIComponent(prefixes + query))
                .then(dados => {
                    var insertQuery = `INSERT DATA{
                        ${dados.data}
                    }`
                    var encoded = encodeURIComponent(prefixes + insertQuery)
                    axios.post(postLink, `update=${encoded}`)
                        .then(dadosPost => {
                            console.log(dadosPost.data)
                            res.jsonp(dados.data.split("\n").length-1)
                        })
                        .catch(e => res.status(500).jsonp(e))
                })
                .catch(erro => res.status(500).jsonp(erro))
        })
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;