import { withSessionRoute } from "@/lib/ironOptions";
import { addBooking, fetchUserProfile } from "@/services/booking.service";

export default withSessionRoute(addBookingToProfile);

async function addBookingToProfile(req, res) {
    const { bookingId, startDate, endDate, totalCost, userId } = req.body;

    // Validate request parameters
    if (!bookingId || !startDate || !endDate || !totalCost || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate dates and cost
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end || totalCost <= 0) { 
        return res.status(400).json({ error: 'Invalid dates or total cost' });
    }

    try {
        // Fetch the user's profile to associate with the booking
        const userProfile = await fetchUserProfile(userId);
        if (!userProfile || !userProfile.id) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        // Prepare booking data
        const data = {
            bookingId,
            userProfileId: userProfile.id, // Correctly using the userProfile object
            startDate: start,
            endDate: end,
            totalCost
        };

        // Add the booking
        const booking = await addBooking(data);
        res.status(200).json({ booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}