import db from '../models/index.cjs';

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

export default { getHomePage };
