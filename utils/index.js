const inputValidator = (req, res, next) => {
    try {
        const {username, password, birthdate, country} = req.body;
        if (!username || !password || !birthdate || !country) {
            return res.status(406).json({
                message: "All input fields required"
            })
        }
        next();
    } catch (error) {
        return error
    }
}

module.exports = {
    inputValidator
}