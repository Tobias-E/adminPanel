export const login = ({ token }) => {
	window.sessionStorage.setItem('auth', true);
};

export const isAuthenticated = () => {
	if (window.sessionStorage.getItem('token') == null) {
		return false;
	} else {
		return true;
	}
};

export const logout = () => {
	if (window.sessionStorage.getItem('token') != null) {
		window.sessionStorage.removeItem('token');
	}
};
