const axios = require('axios')
const fs = require('fs')

// EXECUTION

// GETTING THE IDS OF THE BEST MOVIES AND WRITING IN FILE
/*
var ids = new Set()
let promises = []
for(let i = 1; i < 501; i++){
    promises.push(
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fc3018f9c4006cdefdfa2178b86c6c66&language=en-US&page=${i}`)
            .then(dados => {
                dados.data.results.map(m => ids.add(m.id))
            })
            .catch(erro => console.log('ERROR'))
    )
}
Promise.all(promises).then(response => {
    let promiss = []
    for(let i = 1; i < 501; i++){
        promiss.push(
            axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=fc3018f9c4006cdefdfa2178b86c6c66&language=en-US&page=${i}`)
                .then(dados => {
                    dados.data.results.map(m => ids.add(m.id))
                })
                .catch(erro => console.log('ERROR'))
        )
    }
    Promise.all(promiss).then(response => {
        console.log('REQUESTED',ids.size,'IDS')
        var json = JSON.stringify(Array.from(ids),null,4)
        fs.writeFile('./movie_ids.json', json, 'utf8', function(err) {
            if (err) throw err;
            console.log('complete');
        })
    })
})
*/

// GETTING THE INFO OF EACH MOVIE AND WRITE IT TO A FILE
/*
let data = fs.readFileSync('./movie_ids.json');
let ids = JSON.parse(data);
let promises = []
var movies = []
for(let i = 0; i < 5000; i++){
    promises.push(
        axios.get(`https://api.themoviedb.org/3/movie/${ids[i]}?api_key=fc3018f9c4006cdefdfa2178b86c6c66&language=en-US`)
            .then(dados => {
                movies.push({
                    id: ids[i],
                    title: dados.data.title,
                    release_date: dados.data.release_date,
                    runtime: dados.data.runtime,
                    overview: dados.data.overview,
                    genres: dados.data.genres.map(g => g.name),
                    languages: dados.data.spoken_languages.map(l => l.name),
                    countries: dados.data.production_countries.map(c => c.name)
                })
            })
            .catch(erro => console.log('ERROR'))
    )
}
Promise.all(promises).then(response => {
    console.log(movies.length)
    var json = JSON.stringify(movies,null,4)
    fs.writeFile('./movies_info.json', json, 'utf8', function(err) {
        if (err) throw err;
        console.log('complete');
    })
})
*/

// GETTING THE CAST OF EACH MOVIE
/*
let data = fs.readFileSync('./movies_info.json');
let movies = JSON.parse(data);
let promises = []
let newMovies = []
let count = 0
for(let i = 0; i < movies.length; i++){
    promises.push(
        axios.get(`https://api.themoviedb.org/3/movie/${movies[i].id}/credits?api_key=fc3018f9c4006cdefdfa2178b86c6c66`)
            .then(dados => {
                movies[i].cast = dados.data.cast.map(c => {
                    return {
                        character: c.character,
                        actor: c.name,
                        actor_id: c.id,
                        gender: c.gender
                    }
                })
                movies[i].producers = dados.data.crew.filter(c => c.job == 'Producer').map(c => {
                    return {
                        id: c.id,
                        name: c.name,
                        gender: c.gender
                    }
                })
                movies[i].directors = dados.data.crew.filter(c => c.job == 'Director').map(c => {
                    return {
                        id: c.id,
                        name: c.name,
                        gender: c.gender
                    }
                })
                movies[i].writers = dados.data.crew.filter(c => c.job == 'Idea').map(c => {
                    return {
                        id: c.id,
                        name: c.name,
                        gender: c.gender
                    }
                })
                newMovies.push(movies[i])
                count += 1
            })
            .catch(erro => console.log('ERROR'))
    )
}
Promise.all(promises).then(response => {
    console.log('UPDATED:',newMovies.length,'==',count)
    var json = JSON.stringify(newMovies,null,4)
    fs.writeFile('./movies.json', json, 'utf8', function(err) {
        if (err) throw err;
        console.log('complete');
    })
})
*/

let data = fs.readFileSync('./movies.json')
let movies = JSON.parse(data)
// LANGUAGES TO TTL
/*
let languages = new Set()
for(let i = 0; i < movies.length; i++){
    for(let j = 0; j < movies[i].languages.length; j++){
        languages.add(movies[i].languages[j])
    }
}
var l = Array.from(languages)
var sentence = ''
l.map(s => {
    string = s.replace(/ /g, "_")
    sentence += `###  http://www.di.uminho.pt/prc2020/2020/2/cinema#${string}
:${string} rdf:type owl:NamedIndividual ,
                      :Língua .\n\n`
})
console.log(sentence)
*/

// COUNTRIES TO TTL
/*
let countries = new Set()
for(let i = 0; i < movies.length; i++){
    for(let j = 0; j < movies[i].countries.length; j++){
        countries.add(movies[i].countries[j])
    }
}
var l = Array.from(countries)
var sentence = ''
l.map(s => {
    string = s.replace(/ /g, "_")
    sentence += `###  http://www.di.uminho.pt/prc2020/2020/2/cinema#${string}
:${string} rdf:type owl:NamedIndividual ,
                      :País .\n\n`
})
console.log(sentence)
*/

// PERSONAGENS TO TTL

let chars = ''
let actors = ''
let directors = ''
let writers = ''
let producers = ''
let films = ''
for(let i = 0; i < movies.length; i++){
    let m = movies[i].title.replace(/\W/g, "_")
    for(let j = 0; j < movies[i].cast.length; j++){
        let a = movies[i].cast[j].actor.replace(/\W/g, "_")
        let sex = movies[i].cast[j].gender === 1 ? 'F' : 'M'
        if('character' in movies[i].cast[j]){
            name = movies[i].cast[j].character.replace(/\W/g, "_")
            chars += `
###  http://www.di.uminho.pt/prc2020/2020/2/cinema#${name}
:${name} rdf:type owl:NamedIndividual ,
                :Personagem ;
        :éPersonagemDe :${m} ;
        :éRepresentadoPor :${a} .\n\n`
        }
        actors += `
###  http://www.di.uminho.pt/prc2020/2020/2/cinema#${a}
:${a} rdf:type owl:NamedIndividual ,
                        :Pessoa ;
                :atuou :${m} ;
                :sexo "${sex}" .\n\n`
    }
    for(let j = 0; j < movies[i].directors.length; j++){
        let name = movies[i].directors[j].name.replace(/\W/g, "_")
        directors += `
###  http://www.di.uminho.pt/prc2020/2020/2/cinema#${name}
:${name} rdf:type owl:NamedIndividual ,
                                :Pessoa ;
                        :realizou :${m} .\n\n`
    }
    for(let j = 0; j < movies[i].writers.length; j++){
        let name = movies[i].writers[j].name.replace(/\W/g, "_")
        writers += `
###  http://www.di.uminho.pt/prc2020/2020/2/cinema#${name}
:${name} rdf:type owl:NamedIndividual ,
                            :Pessoa ;
                    :escreveu :${m} .\n\n`
    }
    for(let j = 0; j < movies[i].producers.length; j++){
        let name = movies[i].producers[j].name.replace(/\W/g, "_")
        producers += `
###  http://www.di.uminho.pt/prc2020/2020/2/cinema#${name}
:${name} rdf:type owl:NamedIndividual ,
                            :Pessoa ;
                    :produziu :${m} .\n\n`
    }

    let genres = ''
    let gen = ''
    if(movies[i].genres.length > 0){
        gen += '\n            :temGénero'
        for(let j = 0; j < movies[i].genres.length; j++){
            g = movies[i].genres[j].replace(/\W/g, "_")
            gen += '\n\t\t\t:' + g + ' ,'
        }
        genres = gen.slice(0, -1) + ';'
    }

    let languages = ''
    let lan = ''
    if(movies[i].languages.length > 0){
        lan += '\n            :temLíngua'
        for(let j = 0; j < movies[i].languages.length; j++){
            l = movies[i].languages[j].replace(/\W/g, "_")
            lan += '\n\t\t\t:' + l + ' ,'
        }
        languages = lan.slice(0, -1) + ';'
    }

    let p = ''
    if(movies[i].countries.length > 0){
        p += '\n            :temPaísOrigem :' + movies[i].countries[0].replace(/\W/g, "_") + ' ;'
    }

    let time = movies[i].runtime === null ? '' : ('\n            :duração ' + movies[i].runtime + ' ;')

    films += `
###  http://www.di.uminho.pt/prc2020/2020/2/cinema#${m}
:${m} rdf:type owl:NamedIndividual ,
                    :Filme ;${genres}${languages}${p}
            :dataLançamento "${movies[i].release_date}" ;${time}
            :título "${movies[i].title}" .\n\n`
}


let text = chars + actors + directors + writers + producers + films
fs.writeFile('./data.ttl', text, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
})
