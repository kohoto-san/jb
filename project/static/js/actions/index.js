import { auth, getUser } from './auth.js';
import { init, loginPopupShow, loginPopupClose, contactsPopupClose, contactsPopupShow, addJob, likeJob, dislikeJob, addLane, attachToLaneServer, attachToLane, hover, move, getLanes, getJobs } from './jobs.js';

// const Actions = { auth, getUser, addJob, likeJob, addLane, attachToLane, hover, move, getLanes, getJobs };
// export default Actions;
export {
	init,
	loginPopupShow,
	loginPopupClose,
	contactsPopupClose,
	contactsPopupShow,
	auth,
	getUser,
	addJob,
	likeJob,
	dislikeJob,
	addLane,
	attachToLane,
	attachToLaneServer,
	hover,
	move,
	getLanes,
	getJobs
};

