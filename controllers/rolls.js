const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId; // This will import objectid to work with the mongodb id

// Add ROll
const addRoll = async (req,res) => {
    try{
        const {
            id,
            length,
            width,
            color,
            mil,
            bin
        } = req.body;

        const roll = {
            id,
            length,
            width,
            color,
            mil,
            bin
        };

        const response = await mongodb
        .getDb()
        .db()
        .collection("rolls")
        .insertOne(roll);

        if (response.acknowledged) {
            res.status(201).json(response); // This is where it will show a successful creation
        } else {
            res.status(500).json(response.error || "Some Error Occured While Adding The Roll");
        }
    } catch (error) {
        res.status(500).json(error); // response if something goes bad, remember to console log if issues happen
    }
};

// Searching for rolls

const searchRolls = async (req,res) => {
    try{
        const {
            id,
            length,
            width,
            color,
            mil,
            bin
        } = req.query;
        const query = {}
        //This adds the parameters to the search object
        if (id) query.id = id;
        if (length) query.length = length;
        if (width) query.width = width;
        if (color) query.color = color;
        if (mil) query.mil = mil;
        if (bin) query.bin = bin;
        //This performs the search
        const result = await mongodb
        .getDb()
        .db()
        .collection('rolls')
        .find(query);
        //makes the search find an array andn sends it back as a jason response
        const rolls = await result.toArray();
        res.status(200).json(rolls);    //successful 
    } catch(error) {
        res.status(500).json(error);     //Error
    }
}

// Get roll by ID
const getRollById = async (req,res) => {
    try {
        const rollId = new ObjectId(req.params.id);
        const result = await mongodb
        .getDb()
        .db()
        .collection("rolls")
        .find({_id: rollId});

        //conversts the result to array then sends the result 
        const roll = await result.toArray();
        res.status(200).json(roll[0]);  //success
    } catch (error) {
        res.status(500).json(error);    //Error
    }
}

module.exports = {
    addRoll,
    searchRolls,
    getRollById
};