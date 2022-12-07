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
    let id = req.body.id; //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parameters!!',
            users: [],
        });
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users,
    });
};

export default { handleLogin, handleGetAllUsers };
