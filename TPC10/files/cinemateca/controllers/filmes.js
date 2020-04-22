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
        FILTER(?duracao > 0) .
    } ORDER BY DESC(?popularidade)`;

    var encoded = encodeURIComponent(prefixes + query);

    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getAtores = async (id) => {
    var query = `SELECT ?ator_id ?ator_nome ?personagem_id ?personagem_nome WHERE {
        :movie_${id} :temPersonagem ?personagem_id .
        ?personagem_id :nome ?personagem_nome .
        ?personagem_id :éRepresentadoPor ?ator_id .
        ?ator_id :nome ?ator_nome .
    }`;
    var encoded = encodeURIComponent(prefixes + query);
    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getRealizadores = async (id) => {
    var query = `SELECT ?id ?nome WHERE {
        :movie_${id} :temRealizador ?id .
        ?id :nome ?nome .
    }`;
    var encoded = encodeURIComponent(prefixes + query);
    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getProdutores = async (id) => {
    var query = `SELECT ?id ?nome WHERE {
        :movie_${id} :temProdutor ?id .
        ?id :nome ?nome .
    }`;
    var encoded = encodeURIComponent(prefixes + query);
    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getEscritores = async (id) => {
    var query = `SELECT ?id ?nome WHERE {
        :movie_${id} :foiEscrito ?id .
        ?id :nome ?nome .
    }`;
    var encoded = encodeURIComponent(prefixes + query);
    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getGeneros = async (id) => {
    var query = `SELECT ?id ?nome WHERE {
        :movie_${id} :temGénero ?id .
        ?id :nome ?nome .
    }`;
    var encoded = encodeURIComponent(prefixes + query);
    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getPaises = async (id) => {
    var query = `SELECT ?id ?nome WHERE {
        :movie_${id} :temPaísOrigem ?id .
        ?id :nome ?nome .
    }`;
    var encoded = encodeURIComponent(prefixes + query);
    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getLinguas = async (id) => {
    var query = `SELECT ?id ?nome WHERE {
        :movie_${id} :temLíngua ?id .
        ?id :nome ?nome .
    }`;
    var encoded = encodeURIComponent(prefixes + query);
    try {
        var response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

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
    }`;
    var encoded = encodeURIComponent(prefixes + query);
    try {
        var response = await axios.get(getLink + encoded);
        let res = response.data.results.bindings.map((r) => {
            return {
                titulo: r.titulo.value,
                tituloOriginal: r.tituloOriginal.value,
                duracao: r.duracao.value,
                dataLancamento: r.dataLancamento.value,
                popularidade: r.popularidade.value,
                linguaOriginal: r.linguaOriginal.value,
                resumo: r.resumo.value,
            };
        });
        return res[0];
    } catch (e) {
        throw e;
    }
};

module.exports.getFilme = async (id) => {
    try {
        var filme = await this.getInfo(id);
        filme["atores_personagens"] = await this.getAtores(id);
        filme["realizadores"] = await this.getRealizadores(id);
        filme["produtores"] = await this.getProdutores(id);
        filme["escritores"] = await this.getEscritores(id);
        filme["generos"] = await this.getGeneros(id);
        filme["paises"] = await this.getPaises(id);
        filme["linguas"] = await this.getLinguas(id);
        return filme;
    } catch (e) {
        throw e;
    }
};
