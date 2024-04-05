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

/**
 * Get spam frequency table
 */
const getSpamFrequencyTable = async () => {
  const phoneNumberSpamFrequency = await prisma.spam.groupBy({
    by: ["phoneNumber"],
    _count: {
      _all: true,
    },
  });

  const phoneNumberFrequencyObject: { [phoneNumber: string]: number } = {};
  phoneNumberSpamFrequency.forEach((item) => {
    phoneNumberFrequencyObject[item.phoneNumber] = item._count._all;
  });

  return phoneNumberFrequencyObject;
};

/**
 * Get spam frequency of a specific phone number
 * @param {string} phoneNumber - The phone number to get the spam frequency for
 * @returns {Promise<number | null>} - Promise resolving to the spam frequency of the specified phone number, or null if the phone number is not found
 */
const getSpamFrequencyForNumber = async (
  phoneNumber: string
): Promise<number | null> => {
  const phoneNumberSpamFrequency = await prisma.spam.groupBy({
    by: ["phoneNumber"],
    _count: {
      _all: true,
    },
    where: {
      phoneNumber: phoneNumber,
    },
  });
  if (phoneNumberSpamFrequency.length === 0) {
    return 0; // Phone number not found
  }

  return phoneNumberSpamFrequency[0]._count._all;
};

export default {
  markSpam,
  unmarkSpam,
  findSpam,
  getSpamFrequencyTable,
  getSpamFrequencyForNumber
};
