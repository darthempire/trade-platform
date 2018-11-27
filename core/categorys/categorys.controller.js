const express = require('express');
var permit = require("../../middlewares").permit;
const router = express.Router();
const categoryService = require('./category.service');

// routes
router.post('/add', permit('owner'), add);
router.put('/add/sub/:id', permit('owner'), addSub);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', permit('owner'), update);
router.delete('/:id', permit('owner'),  _delete);

module.exports = router;

function add(req, res, next) {
    req.body._creator = req.user._id;
    categoryService.create(req.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function addSub(req, res, next) {
    req.body._creator = req.user._id;

    categoryService.addSub(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    categoryService.getAll()
        .then(company => res.json(company))
        .catch(err => next(err));
}

function getById(req, res, next) {
    categoryService.getById(req.params.id)
        .then(company => company ? res.json(company) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    categoryService.update(req.params.id, req.body)
    .then((data) => res.json(data))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    categoryService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
