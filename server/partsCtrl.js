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
    const { name, buildId, typeId, brand, partNum, serialNum, estHours, estMiles, hoursInt, milesInt, modelYear, notes } = req.body;

    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

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

    if (!newPart) {
      return res.send({
        message: 'Failed to add new part',
        success: false
      });
    };

    // if (buildId) {
    //   Part.addBuild({
    //     where: {
    //       id: buildId
    //     }
    //   });
    // };

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

      if (!buildId && part.builds.length > 0) {
        // user wants to uninstall part from build
        try {
          const partBuild = await Build.findByPk(part.builds[0].id);
          
          part.removeBuild(partBuild);

        } catch(error) {
          return res.send({
            message: 'Could not remove part from build',
            success: false,
            error
          });
        };
      } else if (buildId && part.builds.length === 0) {
        console.log();
        console.log('buildId is truthy, part was not installed');
        console.log(`user wants to change part from 'not installed' to 'installed'`);
        console.log();
      } else if (buildId && (buildId !== part.builds[0].id)) {
        console.log();
        console.log('buildId is truthy, part was installed on build');
        console.log(`user wants to change part from one build to another build`);
        console.log();
      } else {
        console.log();
        console.log('build did not change');
        console.log();
      }
    } catch (error) {
      return res.send({
        message: 'Failed to update part',
        success: false
      });
    }

    return res.send({
      message: 'Part updated successfully',
      success: true
    });
  }
};