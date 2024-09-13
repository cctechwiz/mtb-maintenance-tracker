import { User, Build } from "../db/model.js";

export const buildFuncs = {
  newBuild: async (req, res) => {
    const { buildName, userId } = req.body;

    // console.log()
    // console.log(`buildName/userId:`, buildName, userId)

    // Get users build names
    let user = await User.findByPk(userId, {
      include: {
        model: Build,
        attributes: ['name']
      }
    });

    // Compare user build names to the new build name 
    for (const { name } of user.builds) {
      if (name === buildName) {
        return res.send({
          message: 'Build name already exists',
          success: false
        })
      }
    }

    const newBuild = await Build.create({
      name: buildName,
      userId: userId
    });

    // Get all of user's builds
    user = await User.findByPk(userId, {
      include: Build
    });

    if (newBuild) {
      return res.send({
        message: 'New build added successfully',
        success: true,
        builds: user.builds
      })
    }
  }

}