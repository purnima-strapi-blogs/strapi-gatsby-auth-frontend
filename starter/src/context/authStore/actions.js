import { login, signup, logout} from '../../services/api';
import { getState } from '../context';
import { setUser, clearLocalStorage } from '../../services/auth';

export const useAuth = () => { 
	const [state, dispatch] = getState();
	async function signupAction(username, email, password) {
		try {
			dispatch({ type: 'REQUEST_SIGNUP' })
			let response = await signup(username, email, password)

			if(response && response.status) {
				if(response.status === 200) {
					dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
					return response
				}
			}
		} catch(error) {
			dispatch({ type: 'REGISTER_ERROR', error: error.message });
			console.log("REGISTER_ERROR oauth.signup", error.message)
			return error
		}

	}
	async function loginAction(emailId, password) {
		try {
			dispatch({ type: 'REQUEST_LOGIN' });
			let response = await login(emailId, password);
			const {username, email } = response.data.user;

			console.log("request", response.status)
			if ( response.status === 200 && response && response.data.user) {
				dispatch({ type: 'LOGIN_SUCCESS', payload: {username, email} });
				setUser({ 
					user: { 
						username: username, 
						email: email
					}
				})
				// console.log(getState())
			}

		} catch (error) {
			console.log(error);
			dispatch({ type: 'LOGIN_ERROR', error: error });
			throw error;
		}
	}
	async function logoutAction(callback) {
		try {
			let response = await logout();
			dispatch({ type: 'LOGOUT' });
			clearLocalStorage(callback)

		} catch(error) {
			console.log("error", error)
		}
	}

	// async function getArticlesAction() {
		
	// 	try {
	// 		const response = await fetchArticles();
		
	// 		if(response && response.status === 200) {
	// 			dispatch({type: 'FETCH_ARTICLES_SUCCESS', payload: response.data})
	// 		}
	// 	} catch(err) {
	// 		console.log("error article while fetching articles", err)
	// 	}
	// }
	return { loginAction, logoutAction, signupAction }
}
