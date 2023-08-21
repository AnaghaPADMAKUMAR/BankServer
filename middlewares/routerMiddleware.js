const jwt=require('jsonwebtoken')
//middleware
// application specific middleware-->for general purpose
//router specific middleware--> only for specific request

//middleware-a function with 3 arguments-->req,res,next
//normal functions il control purathek varum but middleware il control purathek automatically varilla 
//so control purathek kond varan vendi use cheyunataan 'next'

const jwtMiddleware=(req,res,next)=>{
  try{
    //access token from request header
    const token=req.headers["access_token"]  //'access_token' nammal front end'il header'il append cheyta token name aanu
                                             //token access cheyt kitteetilla enkil run time error varum(like aunthenticated allatha user datas'ine access cheyan nokeetundenkil )
                                            //so we have to solve run time error for that we use 'try-catch'. error vannal try il varum solve cheyandath catch'il(try eppazhum wrok cheyum but catch work cheyunath try'il error vannal mathram)
    //validate token - jwt-verify 
    jwt.verify(token,"secretkey123")  //either true or false
     
    next()
  }
    catch{
         res.status(404).json("Please Login")
     }
}

module.exports=jwtMiddleware;