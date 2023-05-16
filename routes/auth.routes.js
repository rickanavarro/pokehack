const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require('./../models/User.model')
const { isLoggedOut } = require('../middlewares/route-guards')


//signup form (render)
router.get('/signup', isLoggedOut, (req, res, next) => {

    res.render('auth/signup')
})

//signup form (handler)

router.post('/signup', (req, res, next) => {


    const { username, name, surname, email, plainPassword, phoneNumber,
        'address.street': street,
        'address.city': city,
        'address.state': state,
        'address.zipCode': zipCode, avatar } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(hashedPassword => User.create({
            username, name, surname, email, password: hashedPassword, phoneNumber,
            address: { street, city, state, zipCode }, avatar
        }))
        .then(() => res.redirect('/'))  // ver a dónde redirigimos tras hacer el sign up
        .catch(err => next(err))

})

//login form (render)
router.get('/login', isLoggedOut, (req, res, next) => {
    res.render('auth/login')
})

//login form (handler)
router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
        res.render('auth/login', { errorMessage: 'All fields are required' })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.render('auth/login', { errorMessage: 'User not found' })
                return
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                res.render('auth/login', { errorMessage: 'Incorrect Password' })
                return
            }

            req.session.currentUser = foundUser
            res.redirect('/')
        })
})

//  Log out
router.get('/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})





module.exports = router