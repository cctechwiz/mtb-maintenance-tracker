import { User, Build, PartCategory, PartType, Part } from "../db/model.js";

export const buildFuncs = {
  getBuildsData: async (req, res) => {
    // Get userId from session
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

    // Get all builds for the user
    const userBuilds = await Build.findAll({
      where: {
        userId: userId,
      },
      order: ['id'],
      include: {
        model: Part,
        order: ['id'],
        include: {
          model: PartType,
          order: ['id'],
          include: {
            model: PartCategory,
            order: ['id'],
          }
        }
      }
    });

    if (!userBuilds) {
      return res.send({
        message: 'Failed to get user builds data',
        success: false
      });
    };

    console.log();
    console.log('userBuilds:', userBuilds);
    console.log();

    // Get parts data associated with each build of 'userBuilds'
    const partCategories = await PartCategory.findAll({
      order: ['id']
    });
    
    if (!partCategories) {
      return res.send({
        message: 'Failed to get part categories',
        success: false
      });
    };

    return res.send({
      message: 'Got builds data successfully',
      success: true,
      userBuilds,
      partCategories,
    });
  },

  newBuild: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

    const { buildName, createNewParts } = req.body;

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

    if (!newBuild) {
      return res.send({
        message: 'Failed to create new build',
        success: false
      });
    };

    // Creates a new generic part for each part type if box was checked at submission
    if (createNewParts) {
      const partTypes = await PartType.findAll();

      // Formats name string 'partType.name' from snake_case to Title Case
      for (const partObj of partTypes) {
        partObj.name = buildName + ' ' + partObj.name.split('_').map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        }).join(' ');
      };

      // Create a new part for each object in 'partTypes
      const newBuildParts = await Promise.all(partTypes.map( async (partType) => {
        return Part.create({
          name: partType.name,
          typeId: partType.id,
          userId: req.session.userId,
        });
      }));

      // Adds new parts to new build through installations table
      for (const part of newBuildParts) {
        newBuild.addPart(part)
      };
    };

    // Get all of user's builds
    user = await User.findByPk(userId, {
      include: Build
    });

    // TODO: Do I need to return associated parts data too?
    if (newBuild) {
      return res.send({
        message: 'New build added successfully',
        success: true
      });
    };
  },

  getUserBuilds: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return req.send({
        message: 'No user in session',
        success: false
      });
    };

    const userBuilds = await Build.findAll({
      where: {
        userId: userId
      },
      attributes: ['id', 'name']
    });

    // console.log();
    // console.log(`userBuilds:`, userBuilds);
    // console.log();

    if (!userBuilds) {
      return res.send({
        message: 'Failed to get user builds',
        success: false
      });
    };

    return res.send({
      message: 'Got user builds successfully',
      success: true,
      builds: userBuilds
    });
  },

  editBuild: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return req.send({
        message: 'No user in session',
        success: false,
      });
    };

    const { buildId, name } = req.body;

    const buildToEdit = await Build.findByPk(buildId);

    if (!buildToEdit) {
      return res.send({
        message: 'Could not find build in db',
        success: false,
      });
    };

    try {
      buildToEdit.update({
        name
      });

      return res.send({
        message: 'Updated build successfully',
        success: true
      });
    } catch(error) {
      return res.send({
        message: 'Failed to update build',
        success: false,
        error
      });
    };
  },

  deleteBuild: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

    const { buildId, deleteParts } = req.params;

    const buildToDelete = await Build.findByPk(buildId);

    if (!buildToDelete) {
      return res.send({
        message: 'Failed to find build',
        success: false
      });
    };

    if (deleteParts) {
      try {
        const parts = await buildToDelete.getParts();

        if (!parts) {
          return res.send({
            message: 'Failed to find parts',
            success: false,
          });
        };

        parts.forEach(async (part) => await part.destroy());

      } catch(error) {
        console.log();
        console.error(error);
        console.log();

        return res.send({
          message: 'Failed to delete parts, Did not delete build',
          success: false,
        });
      };
    };

    try {
      await buildToDelete.destroy();

      return res.send({
        message: 'Build (and parts, if applicable) deleted successfully',
        success: true
      });
    } catch(error) {
      return res.send({
        message: 'Failed to delete build',
        success: false,
        error
      });
    };
  }
};