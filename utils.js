import { categorizedSkills } from "./constants";

export function extractFirstLetters(user) {
  return `${user.firstname?.[0] || ""}${
    user.lastname ? " " + user.lastname[0] : ""
  }`.trim();
}

export function handleActionError(errorMessage, throwable, returnValue) {
  if (throwable) throw new Error(errorMessage);
  else {
    console.error(errorMessage);
    return returnValue;
  }
}

export function handleCaughtActionError(
  errorMessageStart,
  errorMessage,
  throwable,
  returnValue
) {
  errorMessage = errorMessage
    ? `${errorMessageStart}: ${errorMessage}`
    : errorMessageStart;
  console.error(errorMessage);
  if (throwable) throw new Error(errorMessage);
  else return returnValue;
}

export function resolveUrl(url, defaultUrl) {
  const trimmedUrl = url.trim();
  try {
    new URL(trimmedUrl);
    return trimmedUrl;
  } catch {
    return defaultUrl;
  }
}

export function isSameObject(obj1, obj2) {
  // If both are the same object (reference check)
  if (obj1 === obj2) return true;

  // If either is not an object, or if one is null and the other is not, they can't be equal
  if (!obj1 || !obj2 || typeof obj1 !== "object" || typeof obj2 !== "object")
    return false;

  // If one is an array and the other is not, they can't be equal
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  // Check if both have the same number of properties or elements
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) return false;
    // Check if all elements are equal recursively
    for (let i = 0; i < obj1.length; i++) {
      if (!isSameObject(obj1[i], obj2[i])) return false;
    }
  } else {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    // Check if all properties and values are equal recursively
    for (let key of keys1) {
      if (!keys2.includes(key) || !isSameObject(obj1[key], obj2[key]))
        return false;
    }
  }

  return true;
}

export function capitalizeString(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const mergeSkills = () => {
  const mergedSkills = {};

  for (const category in categorizedSkills) {
    const skills = categorizedSkills[category].skills;
    for (const skill in skills) mergedSkills[skill] = skills[skill];
  }

  return mergedSkills;
};
