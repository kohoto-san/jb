import { CALL_API, isRSAA } from 'redux-api-middleware';

const authMiddleware = ({getState, dispatch}) => next => action => {
// const authMiddleware = store => next => action => {

  	const token = localStorage.getItem('sagfi_token') || null;

	if (action[CALL_API]) {

		if(token){
			action[CALL_API].headers = {
				'Cache-Control': 'no-cache',
	            'Content-Type': 'application/json',
	            'Accept': 'application/json',
			    'Authorization': 'Token ' + token,
				...action[CALL_API].headers
			}
		}
		else{
			action[CALL_API].headers = {
				'Cache-Control': 'no-cache',
	            'Content-Type': 'application/json',
	            'Accept': 'application/json',
				...action[CALL_API].headers
			}
		}
	}

	if( action.type != 'INIT' ){
		// let stringData = JSON.stringify(getState()['entities']);
	 //    localStorage.setItem('sagfi_data', stringData);
	 //    console.log('INIT')
	 //    console.log(stringData)

		// let data_local = localStorage.getItem('sagfi_data');
		// let parsedData = JSON.parse(data_local);
	}


	return next(action)
}

export default authMiddleware
