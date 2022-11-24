import db from '../models/index.cjs';
import CRUDService from '../services/CRUDService.js';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage', {
            data: JSON.stringify(data),
        });
    } catch (err) {
        console.log(err);
    }
};

let getCRUD = (req, res) => {
    return res.render('crud');
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    return res.redirect('back');
};

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD', { data });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInforById(userId);
        return res.render('editCRUD', { userData });
    } else res.send('User not found!');
};

let putCRUD = async (req, res) => {
    let newData = req.body;
    let allUsers = await CRUDService.updateUserData(newData);
    return res.render('displayCRUD', { data: allUsers });
};

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDService.deleteUserById(userId);
        return res.send('delete user successfully!');
    } else {
        return res.send('user not found!');
    }
};

export default { getHomePage, getCRUD, postCRUD, displayCRUD, getEditCRUD, putCRUD, deleteCRUD };
