const express = require('express');
var permit = require("../../middlewares").permit;
const router = express.Router();
const companyService = require('./company.service');

// routes
router.post('/register', permit('admin'), register);
router.get('/', permit('owner'), getAll);
router.get('/current', permit('admin'), getCurrent);
router.get('/:id', getById);
router.put('/:id', permit('admin'), update);
router.delete('/:id',permit('admin'),  _delete);

module.exports = router;

function register(req, res, next) {
    req.body._creator = req.user._id;
    req.body._admins = [req.user._id];

    companyService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    companyService.getAll()
        .then(company => res.json(company))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    companyService.getById(req.user.sub)
        .then(company => company ? res.json(company) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    companyService.getById(req.params.id)
        .then(company => company ? res.json(company) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    companyService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    companyService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
