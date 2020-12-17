const bcrypt = require('bcryptjs')

function hashPassword(value) {
    const salt = bcrypt.genSaltSync(12)
    return bcrypt.hashSync(value, salt)
}

module.exports = hashPassword