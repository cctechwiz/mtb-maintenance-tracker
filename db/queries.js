import { db, User, Part, Build, } from './model.js'

const user = await User.findByPk(1, {
  attributes: ['id'],
  include: Build
});

console.log(`User:`, user)

db.close()