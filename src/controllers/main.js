const Model = require('../models/model')

module.exports = {
    index(req, res) {
        return res.render("index")
    },
    createPoint(req, res) {
        return res.render("create-point")
    },
    savePoint(req, res) {
        Model.savePoint(req.body, (status) => {
            return res.render("create-point", { saved: status })
        })
    },
    search(req, res) {
        const search = req.query.search

        if(search == "") {
            return res.render("search-results", { total: 0 })
        }
        Model.search(req.query.search, (places) => {
            const total = places.length
            
            return res.render("search-results", { places, total })
        })
    }
}