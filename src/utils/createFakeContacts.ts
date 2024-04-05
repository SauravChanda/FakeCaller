import { faker } from "@faker-js/faker";
import prisma from "../../src/client";

const createFakeContacts = async (userId: string) => {
  const fakeContacts = [...Array(20)].map((item, i) => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      phoneNumber: faker.phone.number(),
      userId: userId,
    };
  });
  await prisma.contact.createMany({data: fakeContacts, skipDuplicates: true});
};

export default createFakeContacts;
