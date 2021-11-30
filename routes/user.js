const express = require('express');
const router = express.Router();
const data = require('../data')
const ObjectId = require('mongodb').ObjectId;
const userData = data.users;

router.get('/private', async(req,res) => {
    if(req.session.user){
        let islogin = true;
        let username = req.session.user;
        let title = "Private";
        let userInfo = await userData.getUserByName(username);
        //console.log(userInfo)
        let firstName = userInfo.firstname;
        let lastName = userInfo.lastname;
        let email = userInfo.email;
        console.log(firstName)
        console.log(lastName)
        res.render('private',{
            userName:username,
            firstName:firstName,
            lastName:lastName,
            email:email,
            title:title,
            islogin:islogin
        });
    }
});

module.exports = router;