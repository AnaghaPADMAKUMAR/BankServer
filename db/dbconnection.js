//database server integration
const mongoose=require('mongoose')

//connect with mongodb atlas
mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("________Mongodb Atlas Connected________");
}).catch(()=>{
    console.log("....Mongodb Connection Error....");
})