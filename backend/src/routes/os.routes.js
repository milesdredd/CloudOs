import exp from "express";
const router = exp.Router();
import osNotes from './osAppsRoutes/osNotes.route.js';
import AppRoute from './osAppsRoutes/allApps.js';

console.log("using Os route");
router.use('/apps', AppRoute);
router.use('/notes', osNotes);


// router.use('/chat', osChats);

// router.use('/posts', osPosts);

export default router;


