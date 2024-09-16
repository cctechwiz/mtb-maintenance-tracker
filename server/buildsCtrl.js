import { User, Build, PartCategory, PartType, Part } from "../db/model.js";

export const buildFuncs = {
  getBuildsData: async (req, res) => {
    // QUESTION: should this be userId from Redux or the session?
    const userId = req.session.userId;

    const builds = await Build.findAll({
      where: {
        userId: userId,
      }
    });

    const partsData = await Promise.all(builds.map((build) => {
      return PartCategory.findAll({
        include: {
          model: PartType,
          include: {
            model: Part,
            include: {
              model: Build,
              where: { id: build.id }
            }
          }
        }
      })
    }))

    console.log(`partsData:`, partsData[0])

    if (!builds) {
      return res.send({
        message: 'Failed to get builds data',
        success: false
      });
    } else {
      return res.send({
        message: 'Got builds data successfully',
        success: true,
        builds: builds,
        parts: partsData[0]
      });
    };
  },

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