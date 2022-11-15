const bcrypt = require('bcryptjs')

export const generateHash = (pass: string) => {
  const salt = bcrypt.genSaltSync(12)
  return bcrypt.hashSync(pass, salt)
}
