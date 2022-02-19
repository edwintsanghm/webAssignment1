var express = require('express');
var router = express.Router();
const { needAuthenticated } = require('../middleware/authMiddleware');
const contact = require('../models/contact');

router.get('/',  needAuthenticated, function (req, res) {
    res.render('./pages/businessContacts', { 
        title: 'Business Contacts', 
        isLoggedIn: req.isAuthenticated() 
     })
});

router.get('/update/:id',  needAuthenticated, async function (req, res) {
    const id = req.params.id;
    const contactForUpdate = await contact.findById(id);
    
    res.render('./pages/updateContact', { 
        title: 'Update Contacts', 
        id: id,
        contact: contactForUpdate,
        isLoggedIn: req.isAuthenticated() 
     })
});

router.post('/update/:id',  needAuthenticated, async function (req, res) {
    const { name, phone, email } = req.body;
    const id = req.params.id;

    let newContactDoc = await contact.findByIdAndUpdate(id, {name:name, phone:phone, emailAddress:email})

    res.redirect('/businessContacts');
});

router.delete('/delete/:id',  needAuthenticated, async function (req, res) {
    const id = req.params.id;

    await contact.findByIdAndDelete(id)
    res.json('deleted');
});

router.get('/contacts',  needAuthenticated, async function (req, res) {
    const contacts = await contact.find({})
    res.json(contacts);
});


module.exports = router;
