import AuthService  from "./services/auth.services";
import TripService from "./services/trip.services";

const Api = {
    auth: new AuthService(),
    trip: new TripService(),
}

export default Api;