import { Service, User, Part, Build, PartType } from "../db/model.js";

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
        include: [Build, PartType]
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

    const { partId, date, notes } = req.body;

    // console.log();
    // console.log('req.body:', req.body)
    // console.log();

    try {
      Service.create({
        partId,
        date,
        notes
      });

      return res.send({
        message: 'Added new service successfully',
        success: true
      });
    } catch(error) {
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: 'Failed to add new service',
        success: false
      });
    };
  }
}