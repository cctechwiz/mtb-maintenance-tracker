import { Service, User, Part, Build } from "../db/model.js";

export const maintFuncs = {
  getMaintData: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

    const maintData = await Service.findAll({
      include: {
        model: Part,
        where: {
          userId
        },
        include: Build
      }
    });

    if (!maintData) {
      return res.send({
        message: 'Failed to get maintenance data',
        success: false
      });
    };

    return res.send({
      message: 'Found maintenance data successfully',
      success: true,
      maintData
    });
  },

  addService: async (req, res) => {
    const userId = req.session.id;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };


  }
}