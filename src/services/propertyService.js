import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProperties = ({ location, pricePerNight, amenities }) => {
  return prisma.property.findMany({
    where: {
      ...(location && { location: { contains: location } }),
      ...(pricePerNight && { pricePerNight: parseFloat(pricePerNight) }),
      ...(amenities && {
        amenities: {
          some: {
            name: { contains: amenities }
          }
        }
      })
    },
    include: { amenities: true, reviews: true }
  });
};

export const getPropertyById = (id) => {
  return prisma.property.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      pricePerNight: true,
      bedroomCount: true,
      bathroomCount: true,
      maxGuestCount: true,
      rating: true,
      host: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      amenities: {
        select: {
          id: true,
          name: true,
        },
      },
      booking: {
        select: {
          id: true,
          checkinDate: true,
          checkoutDate: true,
          totalPrice: true,
        },
      },
      reviews: {
        select: {
          id: true,
          text: true,
          rating: true,
        },
      },
    },
  });
};

export const createProperty = (data) => {
  return prisma.property.create({
    data,
  });
};

export const updateProperty = (id, data) => {
  return prisma.property.update({
    where: { id },
    data,
  });
};

export const deleteProperty = (id) => {
  return prisma.property.delete({
    where: { id },
  });
};