import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  user: {
    type: String, // Change to ObjectId if referencing users
    required: true,
  },
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
