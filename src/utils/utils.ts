import { MouseEvent } from 'react';
import Types from '../types/index.t';

function convertToSlug(text: string) {
  return `/${text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')}`;
}

/**
 * This function is used to check if given string is a valid username
 * it matches the regex /^[a-zA-Z0-9_]{4,14}$/
 * @param str string to check
 * @returns boolean
 */
function isValidUsername(str: string) {
  return /^[a-zA-Z0-9_]{4,14}$/.test(str);
}

/**
 * This function is used to excerpt a string from a given length
 * @param str string to excerpt
 * @param len length to excerpt
 * @returns string
 * @example excerpt('Hello World', 5) => 'Hello...'
 */
function excerpt(str: string, len: number) {
  if (str.length > len) {
    return `${str.substring(0, len)}...`;
  }
  return str;
}

function hasAllProperties(obj: object, ...props: string[]) {
  return props.every((prop) => Object.prototype.hasOwnProperty.call(obj, prop));
}

function getMonthName(month: number, short = false) {
  const monthsName: readonly string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return short ? monthsName[month].substring(0, 3) : monthsName[month];
}

/**
 * This function is used to get difference from timestamp given to now if the difference is less than 1 day then it will return the time difference in hours or minutes else it will return the time difference in days
 * @param timestamp timestamp object has to be in the format of firebase.firestore.Timestamp
 * @returns string in the format of Month DD, Year (if the year is the same as the current year) or timeAgo from now i.e. [hh]h, [mm]m, 'just now';
 */
function timeAgo(timestamp: Types.timestamp) {
  const currentDate = new Date();
  const postDate = timestamp ? timestamp.toDate() : currentDate;
  const diffMilSeconds = currentDate.getTime() - postDate.getTime();
  const days = Math.floor(diffMilSeconds / 86400000);
  if (days >= 1) {
    const postYear = postDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const postMonth = getMonthName(postDate.getMonth(), true);
    const postDay = postDate.getDate();
    return `${postMonth} ${postDay}${
      currentYear !== postYear ? `, ${postYear}` : ''
    }`;
  }
  const hours = Math.floor(diffMilSeconds / 3600000);
  if (hours >= 1) {
    return `${hours}h`;
  }
  const minutes = Math.floor(diffMilSeconds / 60000);
  if (minutes >= 1) {
    return `${minutes}m`;
  }
  return 'just now';
}

/**
 * This function is used to get random number between min and max
 * @param max max number to return
 * @param min min number to return default is 1
 * @returns random number between min and max
 */
function getRandomNum(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * This function is used to get random items from an array
 * @param arr array of objects
 * @param len number of objects to return default is Infinity
 * @param includes array of properties to include in the returned object
 * @param excludes array of properties to exclude from the returned object
 * @param conflictInclude array of properties to include in the returned object if conflict, default is to include all
 * @returns array of objects
 */
function getRandom<T>(
  arr: T[],
  len = Infinity,
  includes: T[] = [],
  excludes: T[] = [],
  conflictInclude = true
) {
  const arrLength = arr.length;

  const newArr: T[] = [];
  if (includes.length) {
    if (conflictInclude) {
      newArr.push(...includes);
    } else {
      const newInclude = includes.filter((item) => !excludes.includes(item));
      newArr.push(...newInclude);
    }
  }
  while (newArr.length < len && newArr.length < arrLength - excludes.length) {
    const newValue = arr[getRandomNum(arrLength - 1)];
    if (!newArr.includes(newValue) && !excludes?.includes(newValue)) {
      newArr.push(newValue);
    }
  }
  return newArr;
}

function getCursorRelPos(e: MouseEvent, element: HTMLElement) {
  const elementRect = element.getBoundingClientRect();
  /* calculate the cursor's x and y coordinates, relative to the ElementProvided: */
  const x = e.pageX - elementRect.left - window.pageXOffset;
  const y = e.pageY - elementRect.top - window.pageYOffset;
  /* consider any page scrolling: */
  return { x, y };
}

// eslint-disable-next-line import/prefer-default-export
export {
  convertToSlug,
  isValidUsername,
  excerpt,
  hasAllProperties,
  getMonthName,
  timeAgo,
  getRandom,
  getCursorRelPos,
};
