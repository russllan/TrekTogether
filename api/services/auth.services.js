import { http } from "../http";


class AuthService {
    async postAuth( data ) {
        const response = await http.post('token/', data);
        return response.data;
    }
    async refreshToken( refresh) {
        const response = await http.post('token/refresh/', refresh);
        return response.data;
    }
    // async logout() {
    //     const response = await http.post('/');
    //     return response.data;
    // }
}

export default AuthService;