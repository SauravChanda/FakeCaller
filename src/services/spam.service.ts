import { Spam } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../client";
import ApiError from "../utils/ApiError";
import { Key } from "readline";

/**
 * Mark a spam entry
 * @param {Object} phoneNumber
 * @param {Object} userId
 * @returns {Promise<Spam>}
 */
const markSpam = async (phoneNumber: string, userId: string): Promise<Spam> => {
  if (await findSpam(phoneNumber, userId)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You have already marked this phone number as spam"
    );
  }
  return prisma.spam.create({
    data: {
      userId,
      phoneNumber,
    },
  });
};

/**
 * Unmark a spam entry
 * @param {Object} phoneNumber
 * @param {Object} userId
 * @returns {Promise<Spam>}
 */
const unmarkSpam = async (
  phoneNumber: string,
  userId: string
): Promise<Spam> => {
  const spamEntry = await findSpam(phoneNumber, userId);
  if (spamEntry) {
    await prisma.spam.deleteMany({
      where: { phoneNumber: spamEntry.phoneNumber, userId: spamEntry.userId },
    });
    return spamEntry;
  } else
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You haven't marked this phone number as spam"
    );
};

/**
 * Get spam entry
 * @param {string} phoneNumber
 * @param {string} userId
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Spam, Key> | null>}
 */
const findSpam = async <Key extends keyof Spam>(
  phoneNumber: string,
  userId: string,
  keys: Key[] = ["userId", "phoneNumber", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<Spam, Key> | null> => {
  return prisma.spam.findFirst({
    where: { phoneNumber, userId },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<Spam, Key> | null>;
};

export default {
  markSpam,
  unmarkSpam,
  findSpam,
};
