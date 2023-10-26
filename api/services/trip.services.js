import { http } from "../http";

class TripService {
    async trip( data ) {
        const response = await http.post('Trip/search', data);
        // const response = await http.post('marks', data);
        return response.data;
    }
    async addTrip( addTripData ) {
        const response = await http.post('Trip/register', addTripData);
        console.log(response.status);
        return response.status;
    }
    async getUsers(id) {
        const response = await http.get(`Trip/getUsers/${id}`);
        return response.data;
    }
}

export default TripService;