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
    async getTrip(tripId) {
        const response = await http.get(`UserTrip/trip/${tripId}`);
        return response.data;
    }
    async deleteUserTrip(userId, ttripId) {
        const response = await http.delete(`UserTrip/deleteUserTrip/${userId}/${ttripId}`);
        return response.status;
    }
    async deleteTrip(id) {
        const response = await http.delete(`Trip/deleteTrip/${id}`);
        return response.status;
    }
    async completeTrip(id) {
        const response = await http.post(`Trip/completeTrip/${id}`);
        return response.data;
    }
}

export default TripService;