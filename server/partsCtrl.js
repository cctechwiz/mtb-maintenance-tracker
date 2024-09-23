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

    const { partId, name } = req.body;

    const part = await Part.findByPk(partId);

    if (!part) {
      return res.send({
        message: 'Could not find part',
        success: false
      });
    };

    await part.update({
      name
    });

    // Is there a better way to confirm that the updated processed successfully? Do I need to check for all part properties being edited?
    const updatedPart = await Part.findByPk(partId);

    if (updatedPart.name !== name) {
      return res.send({
        message: 'Update failed',
        success: false
      });
    };

    return res.send({
      message: 'Part updated successfully',
      success: true
    });
  }
};