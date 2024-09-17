import { User, Build, PartCategory, PartType, Part } from "../db/model.js";

export const buildFuncs = {
  getBuildsData: async (req, res) => {
    // Get userId from session
    const userId = req.session.userId;

    // Get all builds for the user
    const userBuilds = await Build.findAll({
      where: {
        userId: userId,
      }
    });
    
    if (!userBuilds) {
      return res.send({
        message: 'Failed to get builds data',
        success: false
      });
    };

    // Get parts data associated with each build of 'userBuilds'
    const partsData = await Promise.all(userBuilds.map((build) => {
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

    if (!partsData) {
      return res.send({
        message: 'Failed to get parts data for builds',
        success: false
      });
    };

    // Restructures data
    const buildsData = [];

    // Builds loop
    for (let i = 0; i < partsData.length; i++) {
      const buildName = userBuilds[i].name;
      const buildId = userBuilds[i].id;

      buildsData.push({ buildName, buildId });

      // Category loop
      for (let j = 0; j < partsData[i].length; j++) {
        let categoryName = partsData[i][j].name;
        categoryName = categoryName[0].toUpperCase() + categoryName.substring(1);
        const categoryId = partsData[i][j].id;
        
        if (!buildsData[i].categories) {
          buildsData[i].categories = [];
        };
        
        buildsData[i].categories.push({ categoryName, categoryId });
        
        // Parts loop
        for (let k = 0; k < partsData[i][j].part_types.length; k++) {
          const partName = partsData[i][j].part_types[k].parts[0].name;
          const partId = partsData[i][j].part_types[k].parts[0].id;
          
          if (!buildsData[i].categories[j].parts) {
            buildsData[i].categories[j].parts = [];
          };

          buildsData[i].categories[j].parts.push({ partName, partId });
        };
      };
    };

    return res.send({
      message: 'Got builds data successfully',
      success: true,
      buildsData: buildsData,
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
        success: true,
        builds: user.builds
      });
    };
  }
}