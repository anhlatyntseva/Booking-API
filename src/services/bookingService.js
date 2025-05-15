import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBookings = ({ userId } = {}) => {
  return prisma.booking.findMany({
    where: {
      ...(userId && { userId })
    },
    include: {
      user: true,
      property: true
    }
  });
};

export const getBookingById = (id) => {
  return prisma.booking.findUnique({
    where: { id },
    select: {
      id: true,
      checkinDate: true,
      checkoutDate: true,
      numberOfGuests: true,
      totalPrice: true,
      bookingStatus: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      property: {
        select: {
          id: true,
          title: true,
          location: true,
        },
      },
    },
  });
};

export const createBooking = (data) => {
  return prisma.booking.create({
    data,
  });
};

export const updateBooking = (id, data) => {
  return prisma.booking.update({
    where: { id },
    data,
  });
};

export const deleteBooking = (id) => {
  return prisma.booking.delete({
    where: { id },
  });
};