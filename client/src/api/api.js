import * as axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:5000/api/',
	responseType: 'application/json'
	// withCredentials: true
})

export const postsAPI = {
	getPosts: (currentPage = 1, pageSize = 9) => {
		return instance.get(`posts?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				console.log(response.data)
				return response.data;
			})
			.catch((error) => {
				return (error);
			})
	}
}

export const usersAPI = {
	getUsers: (currentPage = 1, pageSize = 9) => {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				return response.data;
			})
			.catch((error) => {
				return (error);
			})
	},
	follow: (userId) => {
		return instance.post('/folow', {secondUser: userId})
			.then(response => {
				return response.data
			})
	},
	unfollow: (userId) => {
		return instance.delete('/folow', {secondUser: userId})
			.then(response => {
				return response.data
			})
	},
	getProfile: (userId) => {
		return instance.get(`profile/${userId}`)
			.then(response => {
				return (response.data)
			})
			.catch((error) => {
				return (error);
			})
	}
}

export const authAPI = {
	signUp: (email, password, confirmPassword) => {
		return axios.post(`http://localhost:5000/api/auth/signup`, {
			email: email,
			password: password,
			confirmPassword: confirmPassword,
			})
			.then(response => {
				console.log(response);
				// alert('yes');
				// return (1);
			})

	},
	signin: (email, password) => {
		return instance.post(`auth/signin`, {
			email: email,
			password: password,
			})
			.then(response => {
				return (response.data);
			})
			.catch(function (error) {
				return (error);
			})

	},
 // 	signin: (email, password) => {
	// 	return instance.post(`auth/signin`, {
	// 		email: email,
	// 		password: password
	// 		})
	// 		.then(response => {
	// 			console.log(response)
	// 			// this.props.authSetUser(response.data.user);
	// 			// this.props.authSetToken(response.data.token);
	// 			// localStorage.setItem('userData', JSON.stringify({
	// 				// user: response.data.user,
	// 				// token: response.data.token
	// 			// }));
	// 			// console.log(this.props.auth);
	// 			// return (response.data);
	// 			// console.log(this.props.auth);
	// 		});
	// },
	signout: (email, password) => {
		debugger;
		return instance.delete(`/signin`)
		.then(response => {
			debugger;
			return (true)
		});
	},
	checkLogin: (token) => {
		return axios.get(`http://localhost:5000/api/auth/me`, {
			headers: {
				'x-access-token': token
			}
		})
		.then(response => {
			console.log('here');
			if (response.data.auth) {
				return(response.data.data);
			} else {
				localStorage.setItem('userData', null)
				return({user: null, token: null});
			}
		})
	} 
}

// export default usersAPI;