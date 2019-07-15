const express = require("express");
// const knex = require("knex");

const db = require("./data/dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => {
    db("accounts")
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.post('/', (req, res) => {
    // insert into posts () values ()

    const account = req.body

    db('accounts')
    .insert(account, "id")
    .then(arrayOfIds => {
        const idOfLastRecordInserted = arrayOfIds[0]
        res.status(201).json(idOfLastRecordInserted)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.get('/:id', (req, res) => {
    db("accounts")
    .where({ id: req.params.id})
    .first() //unwraps the array for the first object
    .then(account => {
        res.status(200).json(account)
    })
    .catch(error => {
        res.status(500).json(error)    
    })
});

router.delete('/:id', (req, res) => {
    db("accounts")
    .where({ id: req.params.id})
    .del()
    .then(count => {
        res.status(200).json({ message: `${count} record(s) deleted`})
    })
    .catch(error => {
        res.status(500).json(error)    
    })
});

router.put('/:id', (req, res) => {
    db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if (count>0){
        res.status(200).json({ message: `${count} record(s) updated`})
        } else {
            res.status(404).json({ message: "ID does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

module.exports = router