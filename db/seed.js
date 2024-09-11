import { db, User } from "./model.js";
import bcryptjs from 'bcryptjs';

await db.sync({ force: true });

let users = ['user1@test.com']

const hashedPassword = bcryptjs.hashSync('test', bcryptjs.genSaltSync(10));

for (const user of users) {
  await User.create({
    email: user.toLowerCase(),
    password: hashedPassword
  })
}

await db.close();