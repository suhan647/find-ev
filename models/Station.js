import mongoose from "mongoose";

const StationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  maxEVs: { type: Number, required: true },
  availableSlots: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  booked: { type: Boolean, default: false }, // New field
});

export default mongoose.models.Station || mongoose.model("Station", StationSchema);
