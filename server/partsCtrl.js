import { Build, Part, PartCategory, PartType, User } from "../db/model.js";

export const partFuncs = {
  getPartsData: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

    const userParts = await PartCategory.findAll({
      include: {
        model: PartType,
        include: {
          model: Part,
          where: {
            userId: userId
          },
          include: Build
        }
      }
    });

    if (!userParts) {
      return res.send({
        message: 'Failed to get parts data',
        success: false
      })
    };

    return res.send({
      message: 'Got parts data successfully',
      success: true,
      partsData: userParts
    });
  },

  newPart: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

    const {
      name,
      typeId,
      brand,
      partNum,
      serialNum,
      estHours,
      estMiles,
      hoursInt,
      milesInt,
      modelYear,
      notes
    } = req.body;

    let { buildId } = req.body;

    if (buildId === 'false') {
      buildId = false;
    };

    try {
      const newPart = await Part.create({
        userId,
        name,
        typeId: typeId === '' ? null : +typeId,
        milesInterval: milesInt === '' ? null : +milesInt,
        hoursInterval: hoursInt === '' ? null : +hoursInt,
        mfgPartNum: partNum === '' ? null : partNum,
        serialNum: serialNum === '' ? null : serialNum,
        brand: brand === '' ? null : brand,
        modelYear: modelYear === '' ? null : modelYear,
        lastServiced: null,
        notes: notes === '' ? null : notes
      });

      if (buildId) {
        try {
          const build = await Build.findByPk(buildId);

          newPart.addBuild(build);
        } catch (error) {
          return res.send({
            message: 'Failed to add to build',
            success: false
          });
        };
      };
    } catch(error) {
      return res.send({
        message: 'Failed to create new part',
        success: false
      })
    }

    return res.send({
      message: 'New part added successfully',
      success: true
    });
  },

  getPartTypes: async (req, res) => {
    const partTypes = await PartCategory.findAll({
      include: PartType
    });

    if (!partTypes) {
      return res.send({
        message: 'Failed to get part types',
        success: false
      });
    };

    return res.send({
      message: 'Got part types successfully',
      success: true,
      partTypes: partTypes
    });
  },

  editPart: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

    const {
      partId,
      name,
      milesInt,
      hoursInt,
      mfrPartNum,
      serialNum,
      brand,
      modelYear,
      notes
    } = req.body;

    let { buildId } = req.body;

    if (buildId === 'false') {
      buildId = false;
    };

    const part = await Part.findByPk(partId, {
      include: Build
    });
    // console.log('PART PRE EDIT', part)

    if (!part) {
      return res.send({
        message: 'Could not find part',
        success: false
      });
    };

    try {
      // Update Part
      await part.update({
        name,
        milesInt: milesInt === '' ? null : milesInt,
        hoursInt: hoursInt === '' ? null : hoursInt,
        mfrPartNum: mfrPartNum === '' ? null : mfrPartNum,
        serialNum: serialNum === '' ? null : serialNum,
        brand: brand === '' ? null : brand,
        modelYear: modelYear === '' ? null : modelYear,
        notes: notes === '' ? null : notes,
      });

      // If user changed build
      if (!buildId && part.builds.length > 0) {
        // user wants to uninstall part
        try {
          const partBuild = await Build.findByPk(part.builds[0].id);
          
          part.removeBuild(partBuild);

        } catch(error) {
          console.log();
          console.error(error);
          console.log();

          return res.send({
            message: 'Failed to remove part from build',
            success: false,
          });
        };

      } else if (buildId && part.builds.length === 0) {
        // user wants to install part on build
        try {
          const buildToAdd = await Build.findByPk(buildId);

          if (!buildToAdd) {
            return res.send({
              message: 'Failed to find build to add part to',
              success: false
            });
          };

          part.addBuild(buildToAdd);
        } catch(error) {
          console.log();
          console.error(error);
          console.log();

          return res.send({
            message: 'Failed to add part to build',
            success: false
          });
        };

      } else if (buildId && (buildId !== part.builds[0]?.id)) {
        // if user wants to switch part from one build to another
        try {
          const buildToRemove = await Build.findByPk(part.builds[0].id);

          if (!buildToRemove) {
            return res.send({
              message: 'Failed to find build to remove part from',
              success: false
            });
          };

          const buildToAdd = await Build.findByPk(buildId);

          if (!buildToAdd) {
            return res.send({
              message: 'Failed to find build to add part to',
              success: false
            });
          };

          part.removeBuild(buildToRemove);

          part.addBuild(buildToAdd);

        } catch(error) {
          console.log();
          console.error(error);
          console.log();

          return res.send({
            message: 'Failed to switch build',
            success: false
          });
        };

      } else {
        console.log();
        console.log('user did not change build, or error with condition logic');
        console.log();
      };
    } catch (error) {
      return res.send({
        message: 'Failed to update part',
        success: false
      });
    };

    return res.send({
      message: 'Part updated successfully',
      success: true
    });
  },

  deletePart: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

    const { partId } = req.params;

    let partToDelete;

    // Try to find part by partId
    try {
      partToDelete = await Part.findByPk(partId);
    } catch(error) {
      return res.send({
        message: 'Failed to find part by partId',
        success: false,
        error
      });
    };

    // Try to delete part
    try {
      partToDelete.destroy();

      return res.send({
        message: 'Deleted part successfully',
        success: true
      });
    } catch (error) {
      return res.send({
        message: 'Failed to delete part',
        success: false,
        error
      });
    };
  }
};