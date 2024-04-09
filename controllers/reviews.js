const Park = require('../models/park');

module.exports = {
    create,
    delete: deleteReview,
};

async function create(req, res) {
    const park = await Park.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.useAvatar = req.user.avatar;

    park.reviews.push(req.body);
    try {
        await park.save();
    } catch (error) {
        console.log(error);
    }
    res.redirect(`/parks/${park._id}`)
};

async function deleteReview(req, res) {
    const park = await Park.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id});
    if (!park) return res.redirect('/parks');
    park.reviews.remove(req.params.id);
    await park.save();
    res.redirect(`/parks/${park._id}`);
}