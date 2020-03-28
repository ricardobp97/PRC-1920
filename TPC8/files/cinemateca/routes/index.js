var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')
var Atores = require('../controllers/atores')
var Personagens = require('../controllers/personagens')
var Realizadores = require('../controllers/realizadores')
var Produtores = require('../controllers/produtores')
var Escritores = require('../controllers/escritores')
var Paises = require('../controllers/paises')
var Linguas = require('../controllers/linguas')
var Generos = require('../controllers/generos')

router.get('/filmes', function(req, res, next) {
  Filmes.getLista()
    .then(dados => {
      var movies = []
      dados.results.bindings.map(r => {
        movies.push({
          idFilme: r.idFilme.value.split("#")[1],
          titulo: r.titulo.value,
          duracao: r.duracao.value,
          dataLancamento: r.dataLancamento.value,
          popularidade: r.popularidade.value,
          lingua: r.lingua.value
        })
      })
      res.jsonp(movies)
    })
    .catch(erro => res.status(500).send(`Erro na listagem de filmes: ${erro}`))
})

router.get('/filmes/:id', function(req, res, next) {
  Filmes.getFilme(req.params.id)
    .then(dados => {
      var movieData = {
        titulo: dados.results.bindings[0].titulo.value,
        tituloOriginal: dados.results.bindings[0].tituloOriginal.value,
        dataLancamento: dados.results.bindings[0].dataLancamento.value,
        duracao: dados.results.bindings[0].duracao.value,
        popularidade: dados.results.bindings[0].popularidade.value,
        linguaOriginal: dados.results.bindings[0].linguaOriginal.value,
        resumo: dados.results.bindings[0].resumo.value
      }
      var generos = []
      var paises = []
      var linguas = []
      var realizadores = []
      var produtores = []
      var escritores = []
      var atores_personagens = []
      dados.results.bindings.map(r => {
        atores_personagens.push({
          personagem_id: r.personagemId.value.split("#")[1],
          personagem_nome: r.personagemNome.value,
          ator_id: r.atorId.value.split("#")[1],
          ator_nome: r.atorNome.value,
        })
        if(r.escritorId){
          escritores.push({
            id: r.escritorId.value.split("#")[1],
            nome: r.escritorNome.value
          })
        }
        produtores.push({
          id: r.produtorId.value.split("#")[1],
          nome: r.produtorNome.value
        })
        realizadores.push({
          id: r.realizadorId.value.split("#")[1],
          nome: r.realizadorNome.value
        })
        generos.push({
          id: r.generoId.value.split("#")[1],
          nome: r.generoNome.value
        })
        paises.push({
          id: r.paisId.value.split("#")[1],
          nome: r.paisNome.value
        })
        linguas.push({
          id: r.linguaId.value.split("#")[1],
          nome: r.linguaNome.value
        })
      })

      if(escritores.length > 0){
        movieData.escritores = Array.from(new Set(escritores.map(s => s.id))).map(id => {
          return {
            id: id,
            nome: escritores.find(s => s.id == id).nome
          }
        })
      }
      movieData.atores_personagens = Array.from(new Set(atores_personagens.map(s => s.ator_id))).map(id => {
        return {
          ator_id: id,
          ator_nome: atores_personagens.find(s => s.ator_id == id).ator_nome,
          personagem_id: atores_personagens.find(s => s.ator_id == id).personagem_id,
          personagem_nome: atores_personagens.find(s => s.ator_id == id).personagem_nome
        }
      })
      movieData.produtores = Array.from(new Set(produtores.map(s => s.id))).map(id => {
        return {
          id: id,
          nome: produtores.find(s => s.id == id).nome
        }
      })
      movieData.realizadores = Array.from(new Set(realizadores.map(s => s.id))).map(id => {
        return {
          id: id,
          nome: realizadores.find(s => s.id == id).nome
        }
      })
      movieData.generos = Array.from(new Set(generos.map(s => s.id))).map(id => {
        return {
          id: id,
          nome: generos.find(s => s.id == id).nome
        }
      })
      movieData.paises = Array.from(new Set(paises.map(s => s.id))).map(id => {
        return {
          id: id,
          nome: paises.find(s => s.id == id).nome
        }
      })
      movieData.linguas = Array.from(new Set(linguas.map(s => s.id))).map(id => {
        return {
          id: id,
          nome: linguas.find(s => s.id == id).nome
        }
      })
      res.jsonp(movieData)
    })
    .catch(erro => res.status(500).send(`Erro no pedido do filme: ${erro}`))
})

router.get('/atores', function(req, res, next) {
  Atores.getLista()
    .then(dados => {
      var atores = []
      dados.results.bindings.map(r => {
        atores.push({
          idAtor: r.ator.value.split("#")[1],
          nome: r.nome.value,
          sexo: r.sexo.value,
          numFilmes: r.numFilmes.value
        })
      })
      res.jsonp(atores)
    })
    .catch(erro => res.status(500).send(`Erro na listagem de filmes: ${erro}`))
})

router.get('/atores/:id', function(req, res, next) {
  Atores.getAtor(req.params.id)
    .then(dados => {
      var atorData = {
        nome: dados.results.bindings[0].nome.value,
        sexo: dados.results.bindings[0].sexo.value
      }
      var filmes = []
      var realizados = []
      var produzidos = []
      var escritos = []
      dados.results.bindings.map(r => {
        filmes.push({
          filme_id: r.filmeId.value.split("#")[1],
          filme_nome: r.filmeNome.value,
          filme_popularidade: r.filmePopularidade.value,
          filme_dataLancamento: r.filmeDataLancamento.value,
          personagem_id: r.personagemId.value.split("#")[1],
          personagem_nome: r.personagemNome.value
        })
        if(r.filmeRealizadoId){
          realizados.push({
            id: r.filmeRealizadoId.value.split("#")[1],
            nome: r.filmeRealizadoNome.value,
            popularidade: r.filmeRealizadoPopularidade.value,
            dataLancamento: r.filmeRealizadoDataLancamento.value
          })
        }
        if(r.filmeProduzidoId){
          produzidos.push({
            id: r.filmeProduzidoId.value.split("#")[1],
            nome: r.filmeProduzidoNome.value,
            popularidade: r.filmeProduzidoPopularidade.value,
            dataLancamento: r.filmeProduzidoDataLancamento.value
          })
        }
        if(r.filmeEscritoId){
          escritos.push({
            id: r.filmeEscritoId.value.split("#")[1],
            nome: r.filmeEscritoNome.value,
            popularidade: r.filmeEscritoPopularidade.value,
            dataLancamento: r.filmeEscritoDataLancamento.value
          })
        }
      })
      atorData.filmes = Array.from(new Set(filmes.map(s => s.filme_id))).map(id => {
        return {
          filme_id: id,
          filme_nome: filmes.find(s => s.filme_id == id).filme_nome,
          filme_popularidade: filmes.find(s => s.filme_id == id).filme_popularidade,
          filme_dataLancamento: filmes.find(s => s.filme_id == id).filme_dataLancamento,
          personagem_id: filmes.find(s => s.filme_id == id).personagem_id,
          personagem_nome: filmes.find(s => s.filme_id == id).personagem_nome
        }
      })
      if(realizados.length > 0){
        atorData.realizados = Array.from(new Set(realizados.map(s => s.id))).map(id => {
          return {
            id: id,
            nome: realizados.find(s => s.id == id).nome,
            popularidade: realizados.find(s => s.id == id).popularidade,
            dataLancamento: realizados.find(s => s.id == id).dataLancamento
          }
        })
      }
      if(produzidos.length > 0){
        atorData.produzidos = Array.from(new Set(produzidos.map(s => s.id))).map(id => {
          return {
            id: id,
            nome: produzidos.find(s => s.id == id).nome,
            popularidade: produzidos.find(s => s.id == id).popularidade,
            dataLancamento: produzidos.find(s => s.id == id).dataLancamento
          }
        })
      }
      if(escritos.length > 0){
        atorData.escritos = Array.from(new Set(escritos.map(s => s.id))).map(id => {
          return {
            id: id,
            nome: escritos.find(s => s.id == id).nome,
            popularidade: escritos.find(s => s.id == id).popularidade,
            dataLancamento: escritos.find(s => s.id == id).dataLancamento
          }
        })
      }
      res.jsonp(atorData)
    })
    .catch(erro => res.status(500).send(`Erro na listagem de filmes: ${erro}`))
})

router.get('/personagens', function(req, res, next) {
  Personagens.getLista()
    .then(dados => {
      var personagens = []
      dados.results.bindings.map(r => {
        personagens.push({
          personagem_id: r.personagemId.value.split("#")[1],
          personagem_nome: r.personagemNome.value,
          filme_id: r.filmeId.value.split("#")[1],
          filme_nome: r.filmeNome.value,
          filme_popularidade: r.filmePopularidade.value,
          filme_dataLancamento: r.filmeDataLancamento.value,
          ator_id: r.atorId.value.split("#")[1],
          ator_nome: r.atorNome.value
        })
      })
      res.jsonp(personagens)
    })
    .catch()
})

router.get('/personagens/:id', function(req, res, next) {
  Personagens.getPersonagem(req.params.id)
    .then(dados => {
      var personagem = {
        personagem_nome: dados.results.bindings[0].personagem_nome.value,
        filme_id: dados.results.bindings[0].filme_id.value.split("#")[1],
        filme_nome: dados.results.bindings[0].filme_nome.value,
        filme_popularidade: dados.results.bindings[0].filme_popularidade.value,
        filme_dataLancamento: dados.results.bindings[0].filme_dataLancamento.value,
        filme_duracao: dados.results.bindings[0].filme_duracao.value,
        filme_resumo: dados.results.bindings[0].filme_resumo.value,
        ator_id: dados.results.bindings[0].ator_id.value.split("#")[1],
        ator_nome: dados.results.bindings[0].ator_nome.value
      }
      var generos = []
      dados.results.bindings.map(r => {
        generos.push({
          id: r.filme_generoId.value.split("#")[1],
          nome: r.filme_generoNome.value
        })
      })
      personagem.filme_generos = Array.from(new Set(generos.map(s => s.id))).map(id => {
        return {
          id: id,
          nome: generos.find(s => s.id == id).nome
        }
      })
      res.jsonp(personagem)
    })
    .catch()
})

router.get('/realizadores', function(req, res, next) {
  Realizadores.getLista()
    .then(dados => {
      var realizadores = []
      dados.results.bindings.map(r => {
        realizadores.push({
          idRealizador: r.id.value.split("#")[1],
          nome: r.nome.value,
          sexo: r.sexo.value,
          numFilmes: r.numFilmes.value
        })
      })
      res.jsonp(realizadores)
    })
    .catch()
})

router.get('/realizadores/:id', function(req, res, next) {
  Realizadores.getRealizador(req.params.id)
    .then(dados => {
      var realizadorData = {
        nome: dados.results.bindings[0].nome.value,
        sexo: dados.results.bindings[0].sexo.value
      }
      var atuados = []
      var realizados = []
      var produzidos = []
      var escritos = []
      dados.results.bindings.map(r => {
        realizados.push({
          id: r.filmeRealizadoId.value.split("#")[1],
          nome: r.filmeRealizadoNome.value,
          popularidade: r.filmeRealizadoPopularidade.value,
          dataLancamento: r.filmeRealizadoDataLancamento.value
        })
        if(r.filmeId){
          atuados.push({
            filme_id: r.filmeId.value.split("#")[1],
            filme_nome: r.filmeNome.value,
            popularidade: r.filmePopularidade.value,
            dataLancamento: r.filmeDataLancamento.value,
            personagem_id: r.personagemId.value.split("#")[1],
            personagem_nome: r.personagemNome.value
          })
        }
        if(r.filmeProduzidoId){
          produzidos.push({
            id: r.filmeProduzidoId.value.split("#")[1],
            nome: r.filmeProduzidoNome.value,
            popularidade: r.filmeProduzidoPopularidade.value,
            dataLancamento: r.filmeProduzidoDataLancamento.value
          })
        }
        if(r.filmeEscritoId){
          escritos.push({
            id: r.filmeEscritoId.value.split("#")[1],
            nome: r.filmeEscritoNome.value,
            popularidade: r.filmeEscritoPopularidade.value,
            dataLancamento: r.filmeEscritoDataLancamento.value
          })
        }
      })
      realizadorData.realizados = Array.from(new Set(realizados.map(s => s.id))).map(id => {
        return {
          id: id,
          nome: realizados.find(s => s.id == id).nome,
          popularidade: realizados.find(s => s.id == id).popularidade,
          dataLancamento: realizados.find(s => s.id == id).dataLancamento
        }
      })
      if(atuados.length > 0){
        realizadorData.atuados = Array.from(new Set(atuados.map(s => s.filme_id))).map(id => {
          return {
            filme_id: id,
            filme_nome: atuados.find(s => s.filme_id == id).filme_nome,
            popularidade: atuados.find(s => s.filme_id == id).popularidade,
            dataLancamento: atuados.find(s => s.filme_id == id).dataLancamento,
            personagem_id: atuados.find(s => s.filme_id == id).personagem_id,
            personagem_nome: atuados.find(s => s.filme_id == id).personagem_nome
          }
        })
      }
      if(produzidos.length > 0){
        realizadorData.produzidos = Array.from(new Set(produzidos.map(s => s.id))).map(id => {
          return {
            id: id,
            nome: produzidos.find(s => s.id == id).nome,
            popularidade: produzidos.find(s => s.id == id).popularidade,
            dataLancamento: produzidos.find(s => s.id == id).dataLancamento
          }
        })
      }
      if(escritos.length > 0){
        realizadorData.escritos = Array.from(new Set(escritos.map(s => s.id))).map(id => {
          return {
            id: id,
            nome: escritos.find(s => s.id == id).nome,
            popularidade: escritos.find(s => s.id == id).popularidade,
            dataLancamento: escritos.find(s => s.id == id).dataLancamento
          }
        })
      }
      res.jsonp(realizadorData)
    })
    .catch()
})

router.get('/produtores', function(req, res, next) {
  Produtores.getLista()
    .then(dados => {
      var produtores = []
      dados.results.bindings.map(r => {
        produtores.push({
          idProdutor: r.id.value.split("#")[1],
          nome: r.nome.value,
          sexo: r.sexo.value,
          numFilmes: r.numFilmes.value
        })
      })
      res.jsonp(produtores)
    })
    .catch()
})

router.get('/produtores/:id', function(req, res, next) {
  Produtores.getProdutor(req.params.id)
    .then(dados => {
      var data = {
        nome: dados.results.bindings[0].nome.value,
        sexo: dados.results.bindings[0].sexo.value
      }
      var atuados = []
      var realizados = []
      var produzidos = []
      var escritos = []
      dados.results.bindings.map(r => {
        produzidos.push({
          id: r.filmeProduzidoId.value.split("#")[1],
          nome: r.filmeProduzidoNome.value,
          popularidade: r.filmeProduzidoPopularidade.value,
          dataLancamento: r.filmeProduzidoDataLancamento.value
        })
        if(r.filmeId){
          atuados.push({
            filme_id: r.filmeId.value.split("#")[1],
            filme_nome: r.filmeNome.value,
            popularidade: r.filmePopularidade.value,
            dataLancamento: r.filmeDataLancamento.value,
            personagem_id: r.personagemId.value.split("#")[1],
            personagem_nome: r.personagemNome.value
          })
        }
        if(r.filmeRealizadoId){
          realizados.push({
            id: r.filmeRealizadoId.value.split("#")[1],
            nome: r.filmeRealizadoNome.value,
            popularidade: r.filmeRealizadoPopularidade.value,
            dataLancamento: r.filmeRealizadoDataLancamento.value
          })
        }
        if(r.filmeEscritoId){
          escritos.push({
            id: r.filmeEscritoId.value.split("#")[1],
            nome: r.filmeEscritoNome.value,
            popularidade: r.filmeEscritoPopularidade.value,
            dataLancamento: r.filmeEscritoDataLancamento.value
          })
        }
      })
      data.produzidos = Array.from(new Set(produzidos.map(s => s.id))).map(id => {
        return {
          id: id,
          nome: produzidos.find(s => s.id == id).nome,
          popularidade: produzidos.find(s => s.id == id).popularidade,
          dataLancamento: produzidos.find(s => s.id == id).dataLancamento
        }
      })
      if(atuados.length > 0){
        data.atuados = Array.from(new Set(atuados.map(s => s.filme_id))).map(id => {
          return {
            filme_id: id,
            filme_nome: atuados.find(s => s.filme_id == id).filme_nome,
            popularidade: atuados.find(s => s.filme_id == id).popularidade,
            dataLancamento: atuados.find(s => s.filme_id == id).dataLancamento,
            personagem_id: atuados.find(s => s.filme_id == id).personagem_id,
            personagem_nome: atuados.find(s => s.filme_id == id).personagem_nome
          }
        })
      }
      if(realizados.length > 0){
        data.realizados = Array.from(new Set(realizados.map(s => s.id))).map(id => {
          return {
            id: id,
            nome: realizados.find(s => s.id == id).nome,
            popularidade: realizados.find(s => s.id == id).popularidade,
            dataLancamento: realizados.find(s => s.id == id).dataLancamento
          }
        })
      }
      if(escritos.length > 0){
        data.escritos = Array.from(new Set(escritos.map(s => s.id))).map(id => {
          return {
            id: id,
            nome: escritos.find(s => s.id == id).nome,
            popularidade: escritos.find(s => s.id == id).popularidade,
            dataLancamento: escritos.find(s => s.id == id).dataLancamento
          }
        })
      }
      res.jsonp(data)
    })
    .catch()
})

router.get('/escritores', function(req, res, next) {
  Escritores.getLista()
    .then(dados => {
      var escritores = []
      dados.results.bindings.map(r => {
        escritores.push({
          idProdutor: r.id.value.split("#")[1],
          nome: r.nome.value,
          sexo: r.sexo.value,
          numFilmes: r.numFilmes.value
        })
      })
      res.jsonp(escritores)
    })
    .catch()
})

router.get('/escritores/:id', function(req, res, next) {
  Escritores.getEscritor(req.params.id)
    .then(dados => {
      var data = {
        nome: dados.results.bindings[0].nome.value,
        sexo: dados.results.bindings[0].sexo.value
      }
      var atuados = []
      var realizados = []
      var produzidos = []
      var escritos = []
      dados.results.bindings.map(r => {
        escritos.push({
          id: r.filmeEscritoId.value.split("#")[1],
          nome: r.filmeEscritoNome.value,
          popularidade: r.filmeEscritoPopularidade.value,
          dataLancamento: r.filmeEscritoDataLancamento.value
        })
        if(r.filmeId){
          atuados.push({
            filme_id: r.filmeId.value.split("#")[1],
            filme_nome: r.filmeNome.value,
            popularidade: r.filmePopularidade.value,
            dataLancamento: r.filmeDataLancamento.value,
            personagem_id: r.personagemId.value.split("#")[1],
            personagem_nome: r.personagemNome.value
          })
        }
        if(r.filmeRealizadoId){
          realizados.push({
            id: r.filmeRealizadoId.value.split("#")[1],
            nome: r.filmeRealizadoNome.value,
            popularidade: r.filmeRealizadoPopularidade.value,
            dataLancamento: r.filmeRealizadoDataLancamento.value
          })
        }
        if(r.filmeProduzidoId){
          produzidos.push({
            id: r.filmeProduzidoId.value.split("#")[1],
            nome: r.filmeProduzidoNome.value,
            popularidade: r.filmeProduzidoPopularidade.value,
            dataLancamento: r.filmeProduzidoDataLancamento.value
          })
        }
      })
      data.escritos = Array.from(new Set(escritos.map(s => s.id))).map(id => {
        return {
          id: id,
          nome: escritos.find(s => s.id == id).nome,
          popularidade: escritos.find(s => s.id == id).popularidade,
          dataLancamento: escritos.find(s => s.id == id).dataLancamento
        }
      })
      if(atuados.length > 0){
        data.atuados = Array.from(new Set(atuados.map(s => s.filme_id))).map(id => {
          return {
            filme_id: id,
            filme_nome: atuados.find(s => s.filme_id == id).filme_nome,
            popularidade: atuados.find(s => s.filme_id == id).popularidade,
            dataLancamento: atuados.find(s => s.filme_id == id).dataLancamento,
            personagem_id: atuados.find(s => s.filme_id == id).personagem_id,
            personagem_nome: atuados.find(s => s.filme_id == id).personagem_nome
          }
        })
      }
      if(realizados.length > 0){
        data.realizados = Array.from(new Set(realizados.map(s => s.id))).map(id => {
          return {
            id: id,
            nome: realizados.find(s => s.id == id).nome,
            popularidade: realizados.find(s => s.id == id).popularidade,
            dataLancamento: realizados.find(s => s.id == id).dataLancamento
          }
        })
      }
      if(produzidos.length > 0){
        data.produzidos = Array.from(new Set(produzidos.map(s => s.id))).map(id => {
          return {
            id: id,
            nome: produzidos.find(s => s.id == id).nome,
            popularidade: produzidos.find(s => s.id == id).popularidade,
            dataLancamento: produzidos.find(s => s.id == id).dataLancamento
          }
        })
      }
      res.jsonp(data)
    })
    .catch()
})

router.get('/paises', function(req, res, next) {
  Paises.getLista()
    .then(dados => {
      var paises = []
      dados.results.bindings.map(r => {
        paises.push({
          id: r.id.value.split("#")[1],
          nome: r.nome.value,
          numFilmes: r.numFilmes.value
        })
      })
      res.jsonp(paises)
    })
    .catch()
})

router.get('/paises/:id', function(req, res, next) {
  Paises.getPais(req.params.id)
    .then(dados => {
      var pais = []
      dados.results.bindings.map(r => {
        pais.push({
          nome: r.nome.value,
          filme_id: r.filmeId.value.split("#")[1],
          filme_nome: r.filmeNome.value,
          filme_popularidade: r.filmePopularidade.value,
          filme_dataLancamento: r.filmeDataLancamento.value
        })
      })
      res.jsonp(pais)
    })
    .catch()
})

router.get('/linguas', function(req, res, next) {
  Linguas.getLista()
    .then(dados => {
      var linguas = []
      dados.results.bindings.map(r => {
        linguas.push({
          id: r.id.value.split("#")[1],
          nome: r.nome.value,
          numFilmes: r.numFilmes.value
        })
      })
      res.jsonp(linguas)
    })
    .catch()
})

router.get('/linguas/:id', function(req, res, next) {
  Linguas.getLingua(req.params.id)
    .then(dados => {
      var lingua = []
      dados.results.bindings.map(r => {
        lingua.push({
          nome: r.nome.value,
          filme_id: r.filmeId.value.split("#")[1],
          filme_nome: r.filmeNome.value,
          filme_popularidade: r.filmePopularidade.value,
          filme_dataLancamento: r.filmeDataLancamento.value
        })
      })
      res.jsonp(lingua)
    })
    .catch()
})

router.get('/generos', function(req, res, next) {
  Generos.getLista()
    .then(dados => {
      var generos = []
      dados.results.bindings.map(r => {
        generos.push({
          id: r.id.value.split("#")[1],
          nome: r.nome.value,
          numFilmes: r.numFilmes.value
        })
      })
      res.jsonp(generos)
    })
    .catch()
})

router.get('/generos/:id', function(req, res, next) {
  Generos.getGenero(req.params.id)
    .then(dados => {
      var genero = []
      dados.results.bindings.map(r => {
        genero.push({
          nome: r.nome.value,
          filme_id: r.filmeId.value.split("#")[1],
          filme_nome: r.filmeNome.value,
          filme_popularidade: r.filmePopularidade.value,
          filme_dataLancamento: r.filmeDataLancamento.value
        })
      })
      res.jsonp(genero)
    })
    .catch()
})

module.exports = router
