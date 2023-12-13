import { http } from "../http";

class ReviewService {
    async getReviews( userId ) {
        const response = await http.get(`Reviews/getUserReviews/${userId}`);
        return response.data;
    }
    async addReview(data) {
        const response = await http.post("Reviews/addReview", data);
        return response.status;
    }
}

export default ReviewService;