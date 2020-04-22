const express = require("express");
const router = express.Router();
const Filmes = require("../controllers/filmes");
const Pessoas = require("../controllers/pessoas");
const Personagens = require("../controllers/personagens");
const Paises = require("../controllers/paises");
const Linguas = require("../controllers/linguas");
const Generos = require("../controllers/generos");

router.get("/filmes", function (req, res) {
    Filmes.getLista()
        .then((dados) => res.jsonp(dados))
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/filmes/:id", function (req, res) {
    Filmes.getFilme(req.params.id)
        .then((dados) => res.jsonp(dados))
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/atores", function (req, res) {
    Pessoas.getLista("Ator", "atuou")
        .then((dados) => res.jsonp(dados))
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/realizadores", function (req, res) {
    Pessoas.getLista("Realizador", "realizou")
        .then((dados) => res.jsonp(dados))
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/produtores", function (req, res) {
    Pessoas.getLista("Produtor", "produziu")
        .then((dados) => res.jsonp(dados))
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/escritores", function (req, res) {
    Pessoas.getLista("Escritor", "escreveu")
        .then((dados) => res.jsonp(dados))
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/pessoas/:id", function (req, res) {
    Pessoas.getPessoa(req.params.id)
        .then((dados) => res.jsonp(dados))
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/personagens", function (req, res) {
    Personagens.getLista()
        .then((dados) => {
            let personagens = [];
            dados.results.bindings.map((r) => {
                personagens.push({
                    personagem_id: r.personagemId.value.split("#")[1],
                    personagem_nome: r.personagemNome.value,
                    filme_id: r.filmeId.value.split("#")[1],
                    filme_nome: r.filmeNome.value,
                    filme_popularidade: r.filmePopularidade.value,
                    filme_dataLancamento: r.filmeDataLancamento.value,
                    ator_id: r.atorId.value.split("#")[1],
                    ator_nome: r.atorNome.value,
                });
            });
            res.jsonp(personagens);
        })
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/personagens/:id", function (req, res) {
    Personagens.getPersonagem(req.params.id)
        .then((dados) => {
            let personagem = {
                personagem_nome:
                    dados.results.bindings[0].personagem_nome.value,
                filme_id: dados.results.bindings[0].filme_id.value.split(
                    "#"
                )[1],
                filme_nome: dados.results.bindings[0].filme_nome.value,
                filme_popularidade:
                    dados.results.bindings[0].filme_popularidade.value,
                filme_dataLancamento:
                    dados.results.bindings[0].filme_dataLancamento.value,
                filme_duracao: dados.results.bindings[0].filme_duracao.value,
                filme_resumo: dados.results.bindings[0].filme_resumo.value,
                ator_id: dados.results.bindings[0].ator_id.value.split("#")[1],
                ator_nome: dados.results.bindings[0].ator_nome.value,
            };
            let generos = [];
            dados.results.bindings.map((r) => {
                generos.push({
                    id: r.filme_generoId.value.split("#")[1],
                    nome: r.filme_generoNome.value,
                });
            });
            personagem.filme_generos = Array.from(
                new Set(generos.map((s) => s.id))
            ).map((id) => {
                return {
                    id: id,
                    nome: generos.find((s) => s.id == id).nome,
                };
            });
            res.jsonp(personagem);
        })
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/paises", function (req, res) {
    Paises.getLista()
        .then((dados) => {
            let paises = [];
            dados.results.bindings.map((r) => {
                paises.push({
                    id: r.id.value.split("#")[1],
                    nome: r.nome.value,
                    numFilmes: r.numFilmes.value,
                });
            });
            res.jsonp(paises);
        })
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/paises/:id", function (req, res) {
    Paises.getPais(req.params.id)
        .then((dados) => {
            let pais = [];
            dados.results.bindings.map((r) => {
                pais.push({
                    nome: r.nome.value,
                    filme_id: r.filmeId.value.split("#")[1],
                    filme_nome: r.filmeNome.value,
                    filme_popularidade: r.filmePopularidade.value,
                    filme_dataLancamento: r.filmeDataLancamento.value,
                });
            });
            res.jsonp(pais);
        })
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/linguas", function (req, res) {
    Linguas.getLista()
        .then((dados) => {
            let linguas = [];
            dados.results.bindings.map((r) => {
                linguas.push({
                    id: r.id.value.split("#")[1],
                    nome: r.nome.value,
                    numFilmes: r.numFilmes.value,
                });
            });
            res.jsonp(linguas);
        })
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/linguas/:id", function (req, res) {
    Linguas.getLingua(req.params.id)
        .then((dados) => {
            let lingua = [];
            dados.results.bindings.map((r) => {
                lingua.push({
                    nome: r.nome.value,
                    filme_id: r.filmeId.value.split("#")[1],
                    filme_nome: r.filmeNome.value,
                    filme_popularidade: r.filmePopularidade.value,
                    filme_dataLancamento: r.filmeDataLancamento.value,
                });
            });
            res.jsonp(lingua);
        })
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/generos", function (req, res) {
    Generos.getLista()
        .then((dados) => {
            let generos = [];
            dados.results.bindings.map((r) => {
                generos.push({
                    id: r.id.value.split("#")[1],
                    nome: r.nome.value,
                    numFilmes: r.numFilmes.value,
                });
            });
            res.jsonp(generos);
        })
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

router.get("/generos/:id", function (req, res) {
    Generos.getGenero(req.params.id)
        .then((dados) => {
            let genero = [];
            dados.results.bindings.map((r) => {
                genero.push({
                    nome: r.nome.value,
                    filme_id: r.filmeId.value.split("#")[1],
                    filme_nome: r.filmeNome.value,
                    filme_popularidade: r.filmePopularidade.value,
                    filme_dataLancamento: r.filmeDataLancamento.value,
                });
            });
            res.jsonp(genero);
        })
        .catch((erro) => res.status(500).send(`Erro: ${erro}`));
});

module.exports = router;
