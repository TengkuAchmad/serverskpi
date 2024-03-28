// LIBRARY IMPORT
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

// ORM
const prisma = new PrismaClient();

// CONTROLLER
exports.create = async(req, res) => {    
    try {
        if (!req.body.email){
            res.status(400).send({
                message: "Invalid request on body"
            });
            return;
        };

        const hashPassword = await argon2.hash(req.body.password);

        await prisma.user_Account.create({
            data: {
                UUID_UA: uuidv4(),
                Name_UA: req.body.username,
                Email_UA: req.body.email,
                Password_UA: hashPassword
            }
        });

        return res.status(201).send({
            message: "Account successfully registered!"
        })

    } catch (error) {
        return res.status(500).json({error: "An error occured"});
    }
}

exports.auth = async(req, res) => {
    try {
        if(!req.body.email){
            res.status(400).send({
                message: "Invalid request on body"
            });
            return;
        }
        
        const user = await prisma.user_Account.findUnique({
            where: {
                Email_UA : req.body.email,
            }
        })

        if (!user){
            return res.status(404).send({
                message: "Email not registered!"
            });
        }

        if (await argon2.verify(user.Password_UA, req.body.password)) {
            const accessToken = jwt.sign({ userID: user.UUID_UA }, 'skpiapilactelkom', { expiresIn: '1d' });

            res.cookie('access_token', accessToken, { 
                maxAge: 24 * 60 * 60 * 1000, 
                httpOnly: true, 
                secure: true
            });

            return res.status(200).json({ success: true, accessToken });

        } else {
            return res.status(401).json({ success: false, message: "Invalid password"});
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

exports.findOne = async(req, res) => {
    try {
        const id = req.params.id
        const users = await prisma.user_Account.findUnique({
            where : {
                UUID_UA: id,
            }
        });

        return res.status(200).json(users);

    } catch (error){
        return res.status(500).json({error: "An error occured"});
    }

}

exports.findAll = async(req, res) => {
    try {
        const users = await prisma.user_Account.findMany();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({error : "An error occured"});
    }
}

exports.update = async(req, res) => {
    try {
        const id  = req.params.id;
        const updatedData = req.body;

        if (updatedData.Password_UA){
            updatedData.Password_UA = await argon2.hash(updatedData.Password_UA);
        }

        if (updatedData.UUID_UA){
            return res.status(403).json({message: "Forbidden Action"});
        }

        await prisma.user_Account.update({
            where: {
                UUID_UA: id
            },
            data: updatedData
        });

        return res.status(200).send({
            message: "User data updated succesfully"
        });
    } catch (error) {
        return res.status(500).json({message: "An error occured"});
    }
}

exports.deleteAll = async(req, res) => {
    try {
        await prisma.user_Account.deleteMany({});

        return res.status(200).json({message : "All user account successfully deleted"});
    
    } catch (error) {
        return res.status(500).json({error : "An error occured"});
    }
}

exports.deleteOne = async(req, res) => {
    try {
        const id = req.params.id;

        await prisma.user_Account.delete({
            where: {
                UUID_UA: id,
            },
        });

        return res.status(200).send({
            message: "User Account deleted successfully"
        });
    } catch (error){
        return res.status(500).json({error : "An error occured"});
    }
}