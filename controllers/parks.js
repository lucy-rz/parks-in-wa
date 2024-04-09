const Park = require('../models/park');

module.exports = {
    index,
    show,
    new: newPark,
    create,
};

async function index(req, res) {
    const parks = await Park.find({});
    res.render('parks/index', { title: 'Parks', parks });
};

async function show(req, res) {
    try {
    const park = await Park.findById(req.params.id);
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

