import AuthService  from "./services/auth.services";
import ReviewService from "./services/review.services";
import TripService from "./services/trip.services";

const Api = {
    auth: new AuthService(),
    trip: new TripService(),
    review: new ReviewService(),
}

export default Api;