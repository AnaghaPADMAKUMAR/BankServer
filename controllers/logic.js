//import josn web token(jwt)
const jwt=require('jsonwebtoken')

//import model
const users = require("../models/modelcollection")

//logic for register
const register=(req,res)=>{       //body={acno:123,uname="anu",psw:"abc123"}

    //access data from body        //destructuring --> const{acno,uname,psw}=req.body
    const acno=req.body.acno
    const uname=req.body.uname
    const psw=req.body.psw

    //check acno is present in users collection
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(401).send("User already exists")
        }
        else{
            //register user- create a new object for user
            var newUser=new users({
                acno,
                uname,
                psw,
                balance:0,
                transactions:[]
            })

            //save the object in collection
            newUser.save()

            //send response     //json()-convert js data into json type and send
            res.status(200).json(newUser)
        }
    })

}

//logic for login
const login=(req,res)=>{
     const{acno,psw}=req.body
     users.findOne({acno,psw}).then(user=>{
        if(user){
            var token=jwt.sign({acno},"secretkey123") //create/generate token
            
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,
                token
            })
            
        }
        else{
            res.status(401).json("Incorrect Username or Password")
        }
     })
}

//logic to get profile details
const getProfile=(req,res)=>{
    //access acno param from url req
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname
            })
        }
        else{
            res.status(401).json("User not exist")
        }
    })
}

const getBalance=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({uname:user.uname,balance:user.balance,acno:user.acno})
        }
        else{
            res.status(401).json("User not exist")
        }
    })
}

const moneyTransfer=(req,res)=>{
    //access all data from request
    const {fromAcno,toAcno,psw,amount,date}=req.body

    //convert amount to number
    var amnt=parseInt(amount)

    users.findOne({acno:fromAcno,psw}).then(fromUser=>{
        if(fromUser){
           users.findOne({acno:toAcno}).then(toUser=>{
            if(toUser){
                if(amnt<=fromUser.balance){
                    fromUser.balance-=amnt
                    fromUser.transactions.push({type:"DEBIT",amount:amnt,date,user:toUser.uname})
                    fromUser.save()

                    toUser.balance+=amnt
                    toUser.transactions.push({type:"CREDIT",amount:amnt,date,user:fromUser.uname})
                    toUser.save()

                    res.status(200).json({message:"Transaction Successfull"})
                }
                else{
                    res.status(401).json({message:"Insufficient balance"})
                }
            }
            else{
                res.status(401).json({message:"Invalid debit credentials"}) 
            }
           })
        }
        else{
            res.status(401).json({message:"Invalid debit credentials"})
        }
    })
}

//logic totransaction history
const history=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json(user.transactions)
        }
        else{
            res.status(401).json("User not exist")
        }
    })
}

//logic to delete account
const deleteAc=(req,res)=>{
    const {acno}=req.params
    users.deleteOne({acno}).then(user=>{       //delete count
        if(user){
            res.status(200).json("Account deleted Successfully")
        }
        else{
            res.status(401).json("User not exist")
        }
    })
}

module.exports={
    register,login,getProfile,getBalance,moneyTransfer,history,deleteAc
}