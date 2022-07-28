import Types from '../types/index.t';

function convertToSlug(text: string) {
  return `/${text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')}`;
}

function isValidUsername(str: string) {
  return /^[a-zA-Z0-9_]{4,14}$/.test(str);
}

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

const timeAgo = (timestamp: Types.timestamp) => {
  const currentDate = new Date();
  const postDate = timestamp.toDate();
  const diffSeconds = currentDate.getTime() - postDate.getTime();
  const days = Math.floor(diffSeconds / 86400);
  if (days > 1) {
    const postYear = postDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const postMonth = getMonthName(postDate.getMonth(), true);
    const postDay = postDate.getDate();
    return `${postMonth} ${postDay}${
      currentYear !== postYear ? `, ${postYear}` : ''
    }`;
  }
  const hours = Math.floor(diffSeconds / 3600);
  if (hours > 1) {
    return `${hours}h`;
  }
  const minutes = Math.floor(diffSeconds / 60);
  if (minutes > 1) {
    return `${minutes}m`;
  }
  return 'just now';
};

// eslint-disable-next-line import/prefer-default-export
export {
  convertToSlug,
  isValidUsername,
  excerpt,
  hasAllProperties,
  getMonthName,
  timeAgo,
};
