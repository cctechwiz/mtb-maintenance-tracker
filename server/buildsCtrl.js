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
    let userBuilds;

    try {
      userBuilds = await Build.findAll({
        where: {
          userId: userId,
        },
        include: {
          model: Part,
          include: {
            model: PartType,
            include: {
              model: PartCategory
            }
          }
        }
      });
    } catch(error) {
      return res.send({
        message: 'Failed to get user builds data',
        success: false,
        error
      });
    };

    // Get parts data associated with each build of 'userBuilds'
    let partCategories;

    try {
      partCategories = await PartCategory.findAll();
    } catch (error) {
      return res.send({
        message: 'Failed to get part categories',
        success: false,
        error
      });
    }

    // console.log('partsData:', partsData)

    // // Restructures data
    // const buildsData = [];

    // // Builds loop
    // for (let i = 0; i < partsData.length; i++) {
    //   const buildName = userBuilds[i].name;
    //   const buildId = userBuilds[i].id;

    //   buildsData.push({ buildName, buildId });

    //   // Category loop
    //   for (let j = 0; j < partsData[i].length; j++) {
    //     let categoryName = partsData[i][j].name;
    //     categoryName = categoryName[0].toUpperCase() + categoryName.substring(1);
    //     const categoryId = partsData[i][j].id;
        
    //     if (!buildsData[i].categories) {
    //       buildsData[i].categories = [];
    //     };
        
    //     buildsData[i].categories.push({ categoryName, categoryId });
        
    //     // Parts loop
    //     for (let k = 0; k < partsData[i][j].part_types.length; k++) {
    //       const partName = partsData[i][j].part_types[k].parts[0].name;
    //       const partId = partsData[i][j].part_types[k].parts[0].id;
          
    //       if (!buildsData[i].categories[j].parts) {
    //         buildsData[i].categories[j].parts = [];
    //       };

    //       buildsData[i].categories[j].parts.push({ partName, partId });
    //     };
    //   };
    // };

    return res.send({
      message: 'Got builds data successfully',
      success: true,
      userBuilds,
      partCategories,
    });
  },

  newBuild: async (req, res) => {
    const { buildName, userId, createNewParts } = req.body;

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

    // Creates a new generic part for each part type if box was checked at submission
    if (createNewParts) {
      const partTypes = await PartType.findAll();

      // Formats name string 'partType.name' from snake_case to Title Case
      for (const partObj of partTypes) {
        partObj.name = partObj.name.split('_').map((word) => {
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

    const { buildId } = req.params;

    const buildToDelete = await Build.findByPk(buildId);

    try {
      buildToDelete.destroy();

      return res.send({
        message: 'Build deleted successfully',
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