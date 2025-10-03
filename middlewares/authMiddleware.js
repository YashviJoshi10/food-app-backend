const JWT = require("jsonwebtoken")

module.exports = async (req,res,next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success:false,
                    message:"Unauthorized USer"
                })
            }else{
                req.user = { id: decode.id };
                next()
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Please provide auth token",
            err
        })
    }
}