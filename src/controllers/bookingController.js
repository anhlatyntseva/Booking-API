import * as bookingService from '../services/bookingService.js';

export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings(req.query);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooking = async (req, res) => {
  const booking = await bookingService.getBookingById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
};

export const createBooking = async (req, res) => {
  const newBooking = await bookingService.createBooking(req.body);
  res.status(201).json(newBooking);
};

export const updateBooking = async (req, res) => {
  const updated = await bookingService.updateBooking(req.params.id, req.body);
  res.json(updated);
};

export const deleteBooking = async (req, res) => {
  await bookingService.deleteBooking(req.params.id);
  res.json({ message: 'Booking deleted' });
};