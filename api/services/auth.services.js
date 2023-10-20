import { http } from "../http";


class AuthService {
    async login( data ) {
        const response = await http.post('api/auth/login', data);
        return response.data;
    }
    async register( registerData ) {
        const response = await http.post('api/auth/register', registerData);
        return response.data;
    }
    // async logout() {
    //     const response = await http.post('/');
    //     return response.data;
    // }
}

export default AuthService;