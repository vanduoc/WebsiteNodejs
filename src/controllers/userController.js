import res from 'express/lib/response.js';
import userService from '../services/userService.js';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'missing input parameter!',
        });
    } else {
        let userData = await userService.handleUserLogin(email, password);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
        });
    }
};

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 0,
            message: 'Missing required parameters!!',
            users: [],
        });
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users,
    });
};

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
    let userId = req.body.id;
    if (!userId) {
        return res.status(500).json({
            errCode: '1',
            message: 'Invalid input parameters!',
        });
    }
    let message = await userService.deleteUser(userId);
    return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(500).json({
            errCode: '1',
            message: 'Invalid input data!',
        });
    }
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status.json(data);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

export default { handleLogin, handleGetAllUsers, handleCreateNewUser, handleDeleteUser, handleEditUser, getAllCode };
