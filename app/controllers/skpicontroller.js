// LIBRARY IMPORT
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const ExcelJS = require('exceljs');
const multer = require("multer");

// ORM
const prisma = new PrismaClient();

exports.findOne = async(req, res) => {
    try {
        const id = req.params.id;
        const skpi = await prisma.data_SKPI.findUnique({
            where: {
                UUID_DS: id,
            }
        });

        return res.status(200).json(skpi)

    } catch (error) {
        return res.status(500).json({message: "An error occured"});   
    }
}

exports.findAll = async(req, res) => {
    try {
        const skpi = await prisma.data_SKPI.findMany();

        return res.status(200).json(skpi);

    } catch (error) {
        return res.status(500).json({message : "An error occured"});
    }
}

exports.create = async(req, res) => {
    try {
        await prisma.data_SKPI.create({
            data: {
                UUID_DS: uuidv4(),
                Data_DS_IND: req.body.DataIND,
                Data_DS_EN: req.body.DataEN
            }
        });

        return res.status(201).send({
            message: "Data SKPI succesfully indexed!"
        })

    } catch (error) {
        return res.status(500).json({error : "An error occured"});
    }
}

exports.update = async(req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        if (updatedData.UUID_DS){
            res.status(403).json({message: "Forbidden Action"});
        } else {
            await prisma.data_SKPI.update({
                where: {
                    UUID_DS: id
                },
                data: updatedData
            })
    
            return res.status(200).send({
                message : "Keyword data updated successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({message : "An error occured"});
    }
}

exports.deleteAll = async(req, res) => {
    try {
        await prisma.data_SKPI.deleteMany({});

        return res.status(200).json({message: "All SKPI data successfully deleted"});
    
    } catch (error) {
        return res.status(500).json({error : "An error occured"});
    } 
}

exports.deleteOne = async(req, res) => {
    try {
        const id = req.params.id;

        await prisma.data_SKPI.delete({
            where: {
                UUID_DS: id,
            }
        });

        return res.status(200).send({
            message: "SKPI data deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({error : "An error occured"});
    }
}