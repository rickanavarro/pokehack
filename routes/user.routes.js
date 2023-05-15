const express = require('express')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guards')
const router = express.Router()

const User = require('./../models/User.model')

// profile page
router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("user/profile", { user: req.session.currentUser })
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