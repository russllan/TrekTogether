import { http } from "../http";


class AuthService {
    async login( data ) {
        const response = await http.post('auth/login', data);
        return response.data;
    }
    async register( registerData ) {
        const response = await http.post('auth/register', registerData);
        console.log(response.status);
        return response.status;
    }
    // async logout() {
    //     const response = await http.post('/');
    //     return response.data;
    // }
}

export default AuthService;