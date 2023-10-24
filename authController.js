const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const prisma = new PrismaClient()
bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    user = {
        name: req.body.name,
        email: req.body.email,
        pwdHash: bcrypt.hashSync(req.body.pwd, 10),
    }
    const newUser = await prisma.User.create({
        data: user,
    })
    console.log(user)
    console.log('ok')
    return res.send({ message: "User was registered successfully!" });

}
exports.sign_in = async (req, res) => {
    const user = await prisma.User.findFirst({
        where: {
            email: req.body.email,
        }
    })
    if (user) {
        var correctPass = bcrypt.compareSync(req.body.pwd, user.pwdHash)
        console.log(correctPass)
        if (correctPass) {
            var token = jwt.sign({ email: user.email }, 'StRoNGs3crE7')

            res
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .status(200)
                .send({ access_token: token, id: user.id, name: user.name, email: user.email, photoUrl: user.photoUrl })
        }
        else
            res.status(401).json({ message: "Authentication failed: Wrong username or Password" })

    }
    else

        res.status(401).json({ message: "Authentication failed: Wrong username or Password" })

}

exports.authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, "StRoNGs3crE7");
        req.email = data.email;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};