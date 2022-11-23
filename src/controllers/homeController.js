import db from '../models/index.cjs';
import CRUDService from '../services/CRUDService.js';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        res.render('homepage', {
            data: JSON.stringify(data),
        });
    } catch (err) {
        console.log(err);
    }
};

let getCRUD = (req, res) => {
    res.render('crud');
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    res.redirect('back');
};

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    res.render('displayCRUD', { data });
};

export default { getHomePage, getCRUD, postCRUD, displayCRUD };
