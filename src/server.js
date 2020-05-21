const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override') 

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.static("public"))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true
})

    
server.get("/", function(req, res){
    const about = {
        avatar_url:"https://instagram.ffln11-1.fna.fbcdn.net/v/t51.2885-19/s320x320/85070765_1824520987682219_7661841328120004608_n.jpg?_nc_ht=instagram.ffln11-1.fna.fbcdn.net&_nc_ohc=aI5Y588po3IAX-7UQKm&oh=a05558d35b6dbd741a0cceea649869b2&oe=5EDD8887",
        name:"Bruno Souza",
        role:"Aluno - Rocketseat",
        description:'Programador iniciante, mas muito focado. Aluno da <a href="http://rocketseat.com.br" target="_blank">RocketSeat</a>',
        links: [
            { name: "Github", url:"https://github.com/BrunoSRH/"},
            { name: "Twiter", url:"https://twiter.com/maykbrito/"},
            { name: "Linkedin", url:"https://linkedin.com/in/maykbrito/"}
        ]
    }


    return res.render("about", { about })
})

server.get("/portifolio", function(req, res){

    return res.render("portifolio", {items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("video not found")
    }

    return res.render("video", { item: video })
})

server.listen(5000,function(){
    console.log("server is running")
})