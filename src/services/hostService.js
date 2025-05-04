import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const getAllHosts = ({ name }) => {
  const where = {};

  if (name) {
    where.name = {
      contains: name
    };
  }

  return prisma.host.findMany({
    where
  });
};

export const getHostById = (id) => {
  return prisma.host.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      aboutMe: true,
      listings: {
        select: {
          id: true,
          title: true,
          location: true,
        },
      },
    },
  });
};

export const createHost = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.host.create({
    data: {
      username: data.username,
      password: hashedPassword,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      pictureUrl: data.pictureUrl,
      aboutMe: data.aboutMe,
    },
  });
};

export const updateHost = async (id, data) => {
  let updateData = { ...data };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.host.update({
    where: { id },
    data: updateData,
  });
};

export const deleteHost = (id) => {
  return prisma.host.delete({ where: { id } });
};