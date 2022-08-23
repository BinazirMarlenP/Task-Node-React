import ApiError from '../error/ApiError.js';
import { hash, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import  { User }  from '../models/models.js';


const generateJwt = (id, email, role)=>{
    return sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('not correct email or password'))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate) {
            return next(ApiError.badRequest('Email already exists'))
        }
        const hashPassword = await hash(password, 5)
        const user = await User.create({email, role , password: hashPassword})
        const token = generateJwt(user.id, user.email , user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.internal("User doesnt exists"))
        }
        let comparePassword = compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal("Password error"))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token })
    }

    async check(req, res, next) {
     const token = generateJwt(req.user.id, req.user.email, req.user.role)
     return res.json({token})
    }
}

export default new UserController()