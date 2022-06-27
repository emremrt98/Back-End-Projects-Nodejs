const admin = (req,res,next)=>{
    if(!req.user.isAdmin){
        return res.status(403).json({
            mesaj : "Erişim engellendi"
        })
    }
    next();
}

module.exports = admin;