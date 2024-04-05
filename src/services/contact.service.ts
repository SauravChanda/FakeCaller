import { Contact } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../client";
import ApiError from "../utils/ApiError";
import { encryptPassword } from "../utils/encryption";

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

export default {
  getContactByNameMatchFirst,
  getContactByNameMatchContains,
};
