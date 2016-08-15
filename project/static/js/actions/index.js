import { auth, getUser } from './auth.js';
import { init, loginPopup, addJob, likeJob, dislikeJob, addLane, attachToLane, hover, move, getLanes, getJobs } from './jobs.js';

const Actions = { auth, getUser, addJob, likeJob, addLane, attachToLane, hover, move, getLanes, getJobs };
// export default Actions;
export {
	init,
	loginPopup,
	auth,
	getUser,
	addJob,
	likeJob,
	dislikeJob,
	addLane,
	attachToLane,
	hover,
	move,
	getLanes,
	getJobs
};

