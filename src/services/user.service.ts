import { User, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../client";
import ApiError from "../utils/ApiError";
import { encryptPassword } from "../utils/encryption";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (
  phoneNumber: string,
  name: string,
  password: string,
  email?: string
): Promise<User> => {
  if (await getUserByPhoneNumber(phoneNumber)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Phone Number already taken");
  }
  return prisma.user.create({
    data: {
      name,
      email,
      phoneNumber,
      password: await encryptPassword(password),
    },
  });
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserById = async <Key extends keyof User>(
  id: string,
  keys: Key[] = [
    "id",
    "phoneNumber",
    "name",
    "password",
    "email",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<User, Key> | null>;
};

/**
 * Get user by phoneNumber
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByPhoneNumber = async <Key extends keyof User>(
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
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { phoneNumber },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<User, Key> | null>;
};

/**
 * Get user where name starts with query
 * @param {string} query
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByNameMatchFirst = async <Key extends keyof User>(
  query: string,
  keys: Key[] = [
    "id",
    "phoneNumber",
    "name",
    "password",
    "email",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<User, Key>[]> => {
  return prisma.user.findMany({
    where: {
      name: {
        startsWith: query,
        mode: "insensitive",
      },
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<User, Key>[]>;
};

/**
 * Get user where name contains query
 * @param {string} query
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByNameMatchContains = async <Key extends keyof User>(
  query: string,
  keys: Key[] = [
    "id",
    "phoneNumber",
    "name",
    "password",
    "email",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<User, Key>[]> => {
  return prisma.user.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<User, Key>[]>;
};

export default {
  createUser,
  getUserById,
  getUserByPhoneNumber,
  getUserByNameMatchFirst,
  getUserByNameMatchContains,
};
