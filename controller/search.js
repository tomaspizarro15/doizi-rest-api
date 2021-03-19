const User = require('../model/user');
const Group = require('../model/group');
const path = require('path')
exports.postSearchResult = async (req, res, next) => {
    const userSearch = req.query.q;
    const usersByUsername = await User.where({
        username: { $regex: userSearch, $options: 'i' },
    }).select('email name lastname username')
  
    res.status(200).json({
        status: 200,
        users:  usersByUsername,
        url: ""
    })
}