const express=require('express')
const logic=require('../controllers/logic')
const jwtMiddleware  = require('../middlewares/routerMiddleware')



//Create an object for Router class in express
const router=new express.Router()

//register
router.post('/bankuser/userRegister',logic.register)

//login
router.post('/bankuser/userLogin',logic.login)

//user profile
router.get('/bankuser/userProfile/:acno',jwtMiddleware,logic.getProfile)

//use balance
router.get('/bankuser/userBalance/:acno',jwtMiddleware,logic.getBalance)

//money transfer
router.post('/bankuser/moneyTransfer',jwtMiddleware,logic.moneyTransfer)

//transaction history
router.get('/bankuser/userHistory/:acno',jwtMiddleware,logic.history)

//delete account
router.delete('/bankuser/userDelete/:acno',jwtMiddleware,logic.deleteAc)

//export router
module.exports=router