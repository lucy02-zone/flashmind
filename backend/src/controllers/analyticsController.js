const {
  getAnalytics
} = require(
  "../services/analyticsService"
);

const fetchAnalytics =
  async (
    req,
    res,
    next
  ) => {

    try {

      const data =
        await getAnalytics(
          req.user.id
        );

      res.json({
        success: true,
        analytics: data
      });

    } catch (error) {

      next(error);

    }

  };

module.exports = {
  fetchAnalytics
};