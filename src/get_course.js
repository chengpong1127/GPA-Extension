import fetch_course from "./fetch_course";

const courseData = {};

function load() {
  chrome.storage.local.get("courseData", (result) => {
    if (result.courseData) {
      Object.assign(courseData, JSON.parse(result.courseData));
    }
  });
}

function save() {
  chrome.storage.local.set({ courseData: JSON.stringify(courseData) });
}

load();
window.addEventListener("beforeunload", save);

export function get_course_from_storage(courseName, lecturer) {
  return courseData[courseName + lecturer] || null;
}

export async function get_course_from_fetch(courseName, lecturer) {
  const token = await get_token();
  console.log("fetching course, token:", token);
  const data = await fetch_course(token, courseName, lecturer);
  courseData[courseName + lecturer] = data || {};
  return courseData[courseName + lecturer];
}

export function set_token(token) {
  chrome.storage.local.set({ token: token });
}

export function get_token() {
  return new Promise((resolve) => {
    chrome.storage.local.get("token", (result) => {
      resolve(result.token);
    });
  });
}

export async function check_token_validity() {
  const token = await get_token();
  if (!token) {
    return false;
  }
  try {
    await get_course_from_fetch("dummy", "dummy");
    return true;
  } catch {
    return false;
  }
}