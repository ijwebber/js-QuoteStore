const quoteModel = require('../models/quotes');

function getById(req, res, next) {
    console.log(req.body);
    quoteModel.findById(req.params.quoteId, function (err, quoteInfo) {
        if (err) {
            next(err);
        } else {
            res.json({ status: "success", message: "quote found!", data: { quotes: quoteInfo } });
        }
    });
}


function getAll(req, res, next) {
    let quotesList = [];
    quoteModel.find({}, function (err, quotes) {
        if (err) {
            next(err);
        } else {
            for (let quote of quotes) {
                quotesList.push({ id: quote._id, text: quote.text, source: quote.source, notes: quotes.notes });
            }
            res.json({ status: "success", message: "quotes list found!", data: { quotes: quotesList } });

        }
    });
}

function updateById(req, res, next) {
    quoteModel.findByIdAndUpdate(req.params.quoteId, { text: req.body.text, source: req.body.source, quote: req.body.notes }, function (err, quoteInfo) {
        if (err)
            next(err);
        else {
            res.json({ status: "success", message: "quote updated successfully!", data: null });
        }
    });
}

function deleteById(req, res, next) {
    quoteModel.findByIdAndRemove(req.params.quoteId, function (err, quoteInfo) {
        if (err)
            next(err);
        else {
            res.json({ status: "success", message: "quote deleted successfully!", data: null });
        }
    });
}

function create(req, res, next) {
    quoteModel.create({ text: req.body.text, source: req.body.source, notes: req.body.notes }, function (err, result) {
        if (err)
            next(err);
        else
            res.json({ status: "success", message: "quote added successfully!", data: null });

    });
}

module.exports = { getById, getAll, updateById, deleteById, create };