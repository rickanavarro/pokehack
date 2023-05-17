const express = require('express')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guards')
const router = express.Router()

const User = require('./../models/User.model')

// profile page
router.get("/profile/:user_id", isLoggedIn, (req, res, next) => {

    const { user_id } = req.params
    const userRole = {
        isADMIN: req.session.currentUser?.role === 'ADMIN',
        islogged: req.session.currentUser?._id === user_id
    }

    User
        .findById(user_id)
        .then(user => res.render('user/profile', { user, userRole }))
        .catch(err => console.log(err))
})


// admin page (PROTECTED & ROLE BASED ACCESS -render-)
router.get("/admin", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

    User
        .find()
        .then(users => { res.render("user/admin-page", { users }) })
        .catch(error => { next(error) })
})

// admin page (PROTECTED & ROLE BASED ACCESS -BORRAR-)

router.post("/admin/delete-user", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    const userId = req.body.userId;

    User
        .findByIdAndRemove(userId)
        .then(() => { res.redirect("/admin") })
        .catch(error => { next(error) })
})




module.exports = router