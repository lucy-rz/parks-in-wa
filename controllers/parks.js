const Park = require('../models/park');
require('dotenv').config();

module.exports = {
    index,
    show,
    new: newPark,
    create,
    search,
};

async function search(req, res) {
    console.log(req.query)
    try {
        const searchResult = await fetch("https://developer.nps.gov/api/v1/parks?stateCode=WA&q=" + req.query["search-string"] + "&api_key=" + process.env.NPS_SECRET)
        const jsonSearch = await searchResult.json()
        console.log(jsonSearch)
        res.render('parks/search', { title: 'Search', jsonSearch})
    }
    catch (error) {
        console.log(error)
    }
};


async function index(req, res) {
    const parks = await Park.find({});
    res.render('parks/index', { title: 'Parks', parks });
};

async function show(req, res) {
    try {
    const park = await Park.findById(req.params.id);
    const apiResult = await fetch("https://developer.nps.gov/api/v1/parks?parkCode=" + park.parkCode + "&stateCode=WA&api_key=" + process.env.NPS_SECRET)
    const jsonResult = await apiResult.json()
    console.log(jsonResult)
    park.parkDescription = jsonResult.data[0].description
    res.render('parks/show', { title: 'Park detail', park });
    }
    catch (error) {
        console.log(error)
    }
};

function newPark(req, res) {
    res.render('parks/new', { title: 'Add park', errorMsg: ''});
};

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    try {
        await Park.create(req.body);
        res.redirect('/parks');
    }
    catch (error) {
        console.log(error)
        res.render('parks/new', { errorMsg: error.message })
    }
};

