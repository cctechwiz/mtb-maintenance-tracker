import { User, Build, Part, Ride, Service } from "../db/model.js";

export const pageLoaderFuncs = {
  getDashboardData: async (req, res) => {

  },

  getBuildsData: async (req, res) => {
    console.log('getBuildsData invoked')
    // QUESTION: should this be userId from Redux or the session?
    const userId = req.session.userId;

    const user = await User.findByPk(userId, {
      attributes: ['id'],
      include: Build
    });

    if (!user) {
      return res.send({
        message: 'Failed to get builds data',
        success: false
      });
    } else {
      return res.send({
        message: 'Got builds data successfully',
        success: true,
        builds: user.builds
      });
    };
  },

  getPartsData: async () => {

  },

  // TODO: getServiceData

  // TODO: getRideData
}