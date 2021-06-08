// const ROOT_URL = 'https://secret-hamlet-03431.herokuapp.com';

import { login, signup } from '../services/api';
import { getCurrentState } from './context';
import { setUser, logout } from '../services/auth';

const useAuth = () => { 
	const [state, dispatch] = getCurrentState();
	async function loginAction(email, password) {
		try {
			dispatch({ type: 'REQUEST_LOGIN' });
			let response = await login(email, password);
			console.log("response", response)
			const data = {
				...state,
				token: response.data.jwt,
				username: response.data.user.username,
			}
	
			if (response.data.user) {
				dispatch({ type: 'LOGIN_SUCCESS', payload: data });
				setUser({token: data.token, username: data.username})
				return data;
			}
	
			dispatch({ type: 'LOGIN_ERROR', error: 'custom message for login error' });
			console.log("response.error", response)
			
			return;
		} catch (error) {
			dispatch({ type: 'LOGIN_ERROR', error: error });
			console.log(error);
		}
	}
	function logoutAction(callback) {
		dispatch({ type: 'LOGOUT' });
		logout(callback)
	}

	return { loginAction, logoutAction }
}





export default useAuth;












// export async function login(dispatch, loginPayload) {
// 	const requestOptions = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(loginPayload),
// 	};

// 	try {
// 		dispatch({ type: 'REQUEST_LOGIN' });
// 		let response = await fetch(`${ROOT_URL}/login`, requestOptions);
// 		let data = await response.json();

// 		if (data.user) {
// 			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
// 			localStorage.setItem('currentUser', JSON.stringify(data));
// 			return data;
// 		}

// 		dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
// 		console.log(data.errors[0]);
// 		return;
// 	} catch (error) {
// 		dispatch({ type: 'LOGIN_ERROR', error: error });
// 		console.log(error);
// 	}
// }

// export async function logout(dispatch) {
// 	dispatch({ type: 'LOGOUT' });
// 	localStorage.removeItem('currentUser');
// 	localStorage.removeItem('token');
// }
