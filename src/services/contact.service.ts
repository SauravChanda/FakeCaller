import { Contact } from "@prisma/client";
import prisma from "../client";

/**
 * Get contact where name starts with query
 * @param {string} query
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Contact, Key> | null>}
 */
const getContactByNameMatchFirst = async <Key extends keyof Contact>(
  query: string,
  keys: Key[] = [
    "id",
    "phoneNumber",
    "name",
    "email",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<Contact, Key>[]> => {
  return prisma.contact.findMany({
    where: {
      name: {
        startsWith: query,
        mode: "insensitive",
      },
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<Contact, Key>[]>;
};

/**
 * Get contact where name contains query
 * @param {string} query
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Contact, Key> | null>}
 */
const getContactByNameMatchContains = async <Key extends keyof Contact>(
  query: string,
  keys: Key[] = [
    "id",
    "phoneNumber",
    "name",
    "email",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<Contact, Key>[]> => {
  return prisma.contact.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<Contact, Key>[]>;
};

/**
 * Get contact by phonenumber
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Contact, Key> | null>}
 */
const getContactsByPhoneNumber = async <Key extends keyof Contact>(
  phoneNumber: string,
  keys: Key[] = [
    "id",
    "phoneNumber",
    "name",
    "password",
    "email",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<Contact, Key>[]> => {
  return prisma.contact.findMany({
    where: { phoneNumber },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<Contact, Key>[]>;
};

/**
 * Get contact by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Contact, Key> | null>}
 */
const getContactById = async <Key extends keyof Contact>(
  id: string,
  keys: Key[] = [
    "id",
    "phoneNumber",
    "name",
    "email",
    "createdAt",
    "updatedAt",
    "userId"
  ] as Key[]
): Promise<Pick<Contact, Key> | null> => {
  return prisma.contact.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<Contact, Key> | null>;
};

export default {
  getContactByNameMatchFirst,
  getContactByNameMatchContains,
  getContactsByPhoneNumber,
  getContactById
};
