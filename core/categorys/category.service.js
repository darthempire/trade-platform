const db = require('_helpers/db');
const Category = db.Category;

module.exports = {
    getAll,
    getById,
    create,
    addSub,
    update,
    delete: _delete
};

async function getAll() {
    return await Category.find().populate('subCategorys');
}

async function getById(id) {
    return await Category.findById(id).populate('subCategorys');
}

async function create(params) {
    // validate
    if (await Category.findOne({ categoryName: params.categoryName })) {
        throw 'Category Name "' + params.categoryName + '" is already taken';
    }

    const category = new Category(params);

    // save company
    await category.save();
    return category;
}

async function addSub(parrentid, params) {
    const subCategory = await create(params);
    const parrentCategory = await getById(parrentid);

    if (!parrentCategory.subCategorys.includes(subCategory))
        parrentCategory.subCategorys.push(subCategory);

    await update(parrentCategory._id, parrentCategory);
}

async function update(id, params) {
    const category = await Category.findById(id);

    // validate
    if (!category) throw 'Category not found';
    if (category.categoryName !== params.categoryName && await User.findOne({ categoryName: params.categoryName })) {
        throw 'Category Name "' + params.categoryName + '" is already taken';
    }

    params.updateDate = Date.now();

    // copy params properties to company
    Object.assign(category, params);

    await category.save();
    return category;
}

async function _delete(id) {
    await Category.findByIdAndRemove(id);
}
