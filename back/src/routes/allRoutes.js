import healthRoute from "./health.js";
import velibRoute from "./velib.js";

const allRoutes = ({ app, client }) => {
  healthRoute({ app });
  velibRoute({ app, client });
};

export default allRoutes;
