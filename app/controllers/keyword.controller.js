// LIBRARY IMPORT
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

// ORM
const prisma = new PrismaClient();

// CONTROLLER
exports.create = async(req, res) => {    
    try {
        await prisma.data_Keyword.create({
            data: {
                UUID_DK: uuidv4(),
                Payload_DK: req.body.payload,
            }
        });

        return res.status(201).send({
            message: "Data keyword successfully indexed!"
        });

    } catch (error) {
        return res.status(500).json({error: "An error occured"});
    }
}

exports.findOne = async(req, res) => {
    try {
        const id = req.params.id;

        const keywords = await prisma.data_Keyword.findUnique({
            where : {
                UUID_DK : id,
            }
        });

        return res.status(200).json(keywords);

    } catch (error) {
        return res.status(500).json({error : "An error occured"});
    }
}

exports.findAll = async(req, res) => {
    try {
        const keywords = await prisma.data_Keyword.findMany({});

        return res.status(200).json(keywords);

    } catch (error) {
        return res.status(500).json({ error : "An error occured"});
    }
}

exports.update = async(req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        if (updatedData.UUID_DK){
            return res.status(403).json({message : "Forbidden Action"});
        }

        await prisma.data_Keyword.update({
            where: {
                UUID_DK: id
            },
            data: updatedData
        });

        return res.status(200).send({
            message: "Keyword data updated successfully"
        })
    } catch (error) {
        return res.status(500).json({message : "An error occured"});
    }
}

exports.deleteAll = async(req, res) => {
    try {
        await prisma.data_Keyword.deleteMany({});

        return res.status(200).json({message : "All keywords data successfully deleted"});
    } catch (error) {
        return res.status(500).json({error : "An error occured"});
    }
}

exports.deleteOne = async(req, res) => {
    try {
        const id = req.params.id;

        await prisma.data_Keyword.delete({
            where: {
                UUID_DK: id,
            }
        });

        return res.status(200).send({
            message: "Keyword data deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({error : "An error occured"});
    }
}