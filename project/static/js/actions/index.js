import { auth, getUser } from './auth.js';
import { init, loginPopupShow, loginPopupClose, addJob, likeJob, dislikeJob, addLane, attachToLane, hover, move, getLanes, getJobs } from './jobs.js';

const Actions = { auth, getUser, addJob, likeJob, addLane, attachToLane, hover, move, getLanes, getJobs };
// export default Actions;
export {
	init,
	loginPopupShow,
	loginPopupClose,
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

