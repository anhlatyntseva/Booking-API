import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsers = ({ username, email } = {}) => {
  return prisma.user.findMany({
    where: {
      ...(username && {
        username: {
          contains: username,
        }
      }),
      ...(email && {
        email: {
          contains: email,
        }
      })
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    }
  });
};

export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
};

export const createUser = async (data) => {
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      username: data.username,
      phoneNumber: data.phoneNumber,
      pictureUrl: data.pictureUrl,
    },
  });
};

export const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};

export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};