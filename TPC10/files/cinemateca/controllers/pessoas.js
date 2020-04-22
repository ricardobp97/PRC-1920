const axios = require("axios");

const prefixes = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX noInferences: <http://www.ontotext.com/explicit>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX : <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`;

var getLink = "http://localhost:7200/repositories/cinema2020?query=";

function normalize(array) {
    return array.results.bindings.map((obj) => {
        var new_obj = {};
        for (let [k, v] of Object.entries(obj)) {
            if (v.type == "uri") new_obj[k] = v.value.split("#")[1];
            else {
                new_obj[k] = v.value;
            }
        }
        return new_obj;
    });
}

module.exports.getLista = async (tipo, relacao) => {
    var query = `SELECT distinct ?id ?nome ?sexo (COUNT(?filme) AS ?numFilmes) WHERE {
        ?id rdf:type :${tipo} .
        ?id :nome ?nome .
        ?id :sexo ?sexo .
        ?id :${relacao} ?filme .
    }
    GROUP BY ?id ?nome ?sexo
    ORDER BY DESC(?numFilmes)`;

    var encoded = encodeURIComponent(prefixes + query);

    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getInfo = async (id) => {
    var query = `SELECT ?nome ?sexo WHERE {
        :person_${id} :nome ?nome .
        :person_${id} :sexo ?sexo .
    }`;

    var encoded = encodeURIComponent(prefixes + query);

    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data)[0];
    } catch (e) {
        throw e;
    }
};

module.exports.getFilmesAtuados = async (id) => {
    var query = `SELECT ?filme_id ?filme_nome ?filme_popularidade ?filme_dataLancamento ?personagem_nome ?personagem_id WHERE {
        :person_${id} :atuou ?filme_id .
        ?filme_id :título ?filme_nome .
        ?filme_id :popularidade ?filme_popularidade .
        ?filme_id :dataLançamento ?filme_dataLancamento .
        :person_${id} :representa ?personagem_id .
        ?personagem_id :nome ?personagem_nome .
        ?personagem_id :éPersonagemDe ?filme_id .
    }`;

    var encoded = encodeURIComponent(prefixes + query);

    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getRealizados = async (id) => {
    var query = `SELECT ?filme_id ?nome ?popularidade ?dataLancamento WHERE {
        :person_${id} :realizou ?filme_id .
        ?filme_id :título ?nome .
        ?filme_id :popularidade ?popularidade .
        ?filme_id :dataLançamento ?dataLancamento .
    }`;

    var encoded = encodeURIComponent(prefixes + query);

    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getProduzidos = async (id) => {
    var query = `SELECT ?filme_id ?nome ?popularidade ?dataLancamento WHERE {
        :person_${id} :produziu ?filme_id .
        ?filme_id :título ?nome .
        ?filme_id :popularidade ?popularidade .
        ?filme_id :dataLançamento ?dataLancamento .
    }`;

    var encoded = encodeURIComponent(prefixes + query);

    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getEscritos = async (id) => {
    var query = `SELECT ?filme_id ?nome ?popularidade ?dataLancamento WHERE {
        :person_${id} :escreveu ?filme_id .
        ?filme_id :título ?nome .
        ?filme_id :popularidade ?popularidade .
        ?filme_id :dataLançamento ?dataLancamento .
    }`;

    var encoded = encodeURIComponent(prefixes + query);

    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getPessoa = async (id) => {
    try {
        var pessoa = await this.getInfo(id);
        pessoa["atuados"] = await this.getFilmesAtuados(id);
        pessoa["realizados"] = await this.getRealizados(id);
        pessoa["produzidos"] = await this.getProduzidos(id);
        pessoa["escritos"] = await this.getEscritos(id);
        return pessoa;
    } catch (e) {
        throw e;
    }
};
