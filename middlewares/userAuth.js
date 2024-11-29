
//usesr checking 
const checkUser=(req,res,next)=>{
    if(req.session.user){
        res.redirect("/home")
    }else{
        next()
    }
}



module.exports={checkUser}