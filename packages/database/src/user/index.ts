import prisma from "../prisma";
export function addUser(name: string, email: string) {
  return prisma.user.create({
    data: {
      name,
      email,
    },
  });
}

export function delUser(id: number) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

export function findUser(id: number) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export function findAll(skip: number = 0, take: number = 15) {
  return prisma.user.findMany({
    take,
    skip,
  });
}
