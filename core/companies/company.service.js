const db = require('_helpers/db');
const Company = db.Company;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Company.find();
}

async function getById(id) {
    return await Company.findById(id);
}

async function create(params) {
    // validate
    if (await Company.findOne({ companyName: params.companyName })) {
        throw 'Company Name "' + params.companyName + '" is already taken';
    }

    const company = new Company(params);

    // save company
    await company.save();
}

async function update(id, params) {
    const company = await Company.findById(id);

    // validate
    if (!company) throw 'Company not found';
    if (company.username !== params.companyName && await User.findOne({ companyName: params.companyName })) {
        throw 'Company Name "' + params.companyName + '" is already taken';
    }

    // copy params properties to company
    Object.assign(company, params);

    await Company.save();
}

async function _delete(id) {
    await Company.findByIdAndRemove(id);
}
