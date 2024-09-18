import { Part, PartCategory, PartType, User } from "../db/model.js";

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
          model: Part
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

  }
}