import React, { useState, useReducer } from 'react';
import { getCurrentUser, getCurrentUserToken } from '../services/auth';

// let user = localStorage.getItem('currentUser')
// 	? JSON.parse(localStorage.getItem('currentUser')).username
// 	: '';
// let token = localStorage.getItem('currentUser')
// 	? JSON.parse(localStorage.getItem('currentUser')).auth_token
// 	: '';

const username = getCurrentUser()
const token = getCurrentUserToken()


export const initialState = {
	username: '' || username,
	token: '' || token,
	loading: false,
	errorMessage: null,
};

console.log("initialState", initialState)
export const AuthReducer = (initialState, action) => {
	console.log("action ", action)
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				username: action.payload.username,
				token: action.payload.token,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				username: '',
				token: '',
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
