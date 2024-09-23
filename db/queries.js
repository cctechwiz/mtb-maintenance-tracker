import { db, User, Part, Build, } from './model.js'

// const user = await User.findByPk(1, {
//   attributes: ['id'],
//   include: Build
// });

// console.log(`User:`, user)

const part = await Part.findByPk(1);

console.log('Part 1:', part);

db.close()