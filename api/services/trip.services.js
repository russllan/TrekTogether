import { http } from "../http";

class TripService {
    async trip( data ) {
        const response = await http.post('Trip/search', data);
        return response.data;
    }
    async addTrip( addTripData ) {
        const response = await http.post('Trip/addTrip', addTripData);
        console.log(response.data);
        return response.data;
    }
    async getUsers(id) {
        const response = await http.get(`Trip/getUsers/${id}`);
        return response.data;
    }
    async postCar(carData) {
        const response = await http.post("Cars", carData);
        return response.data;
    }
    async bookTrip(bookData) {
        const response = await http.post("UserTrip/addUserToTrip", bookData);
        return response.data;
    }
}

export default TripService;