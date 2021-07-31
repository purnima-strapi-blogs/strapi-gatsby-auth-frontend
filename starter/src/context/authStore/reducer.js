import { getCurrentUser, getCurrentUserToken } from '../../services/auth';

const username = getCurrentUser()
// const token = getCurrentUserToken()


export const initialState = {
	username: '' || username,
	email: '',
	loading: false,
	errorMessage: null,
	isLoggedIn: false
};

export const AuthReducer = (initialState, action) => {
	console.log("action is", action);
	switch (action.type) {
		case 'REQUEST_SIGNUP':
			return {
				...initialState,
				loading: true
			}
		case 'REGISTER_SUCCESS':
			return {
				...initialState,
				errorMessage: ''
			}
		case 'REGISTER_ERROR':
			return {
				...initialState,
				errorMessage: action.error
			}	
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				username: action.payload.username,
				email: action.payload.email,
				isLoggedIn: true,
				loading: false,
				errorMessage: ''
			};
		case 'LOGOUT':
			return {
				...initialState,
				username: '',
				email: '',
				isLoggedIn: false
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};
		// case 'FETCH_ARTICLES_SUCCESS': 
		// 	return {
		// 		...initialState,
		// 		loading: false,
		// 		articles: action.payload
		// 	}
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
