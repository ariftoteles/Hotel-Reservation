const bcrypt = require('bcryptjs')

function unhashPassword(plainPassword, hashedPasword) {
    return bcrypt.compareSync(plainPassword, hashedPasword)
}

module.exports = unhashPassword