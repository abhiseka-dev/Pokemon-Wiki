import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon/"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/search", async (req, res) => {
    const pokemonName = req.body.name.toLowerCase();
    
    try {
        const response = await axios.get(API_URL + pokemonName);
        const result = response.data;  
        const pokemonData = {
            id: result.id,
            name: result.name,
            types: result.types.map(t => t.type.name),
            imageUrl: result.sprites.other["official-artwork"].front_default,
            height: result.height / 10,
            weight: result.weight / 10,
            abilities: result.abilities.map(a => a.ability.name),
            stats: result.stats.map(s => ({
                name: s.stat.name,
                value: s.base_stat
            }))
    };
        console.log(pokemonData);
        res.render("data.ejs", pokemonData);
    } catch (error) {
        if (error.response) {
            // API ngasih response error (ex: 404 pokemon ga ada)
            res.render("index.ejs", {
                error: "Pokemon tidak ditemukan bro 😔"
            });
        } else if (error.request) {
            // request terkirim tapi ga ada response
            res.render("index.ejs", {
                error: "Server PokeAPI ga respon ⚠️"
            });
        } else {
            // error coding / server sendiri
            res.render("index.ejs", {
                error: "Server error 😵"
            });
        }
        console.error(error);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})