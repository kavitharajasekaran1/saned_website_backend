function getUserId(req) {
    const token = req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.verify(token, config.secret);
            return decoded.usr[0]._id
        } catch (err) {
            return false;
        }
    } else {
        return failed;
    }
}

function getUser(req) {
    const token = req.query.token;
    if (token) {
        try {
            var decoded = jwt.verify(token, config.secret);
            return decoded.users[0].rapidID
        } catch (err) {
            return false;
        }
    } else {
        return failed;
    }
}

function checkToken(req) {

    const token = req.headers['x-access-token'];

    if (token) {

        try {

            var decoded = jwt.verify(token, config.secret);
            return true

        } catch (err) {

            return false;
        }

    } else {

        return false;
    }
}