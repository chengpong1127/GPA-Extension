import fetch_course from "./fetch_course";

const courseData = {};

function load() {
  const savedData = localStorage.getItem("courseData");
  if (savedData) {
    Object.assign(courseData, JSON.parse(savedData));
  }
}
function save() {
  localStorage.setItem("courseData", JSON.stringify(courseData));
}

load();
window.addEventListener("beforeunload", save);

export function get_course_from_storage(courseName, lecturer) {
  return courseData[courseName + lecturer] || null;
}

export async function get_course_from_fetch(courseName, lecturer) {
  const token = localStorage.getItem("token");
  const data = await fetch_course(token, courseName, lecturer);
  courseData[courseName + lecturer] = data || {};
  return courseData[courseName + lecturer];
}


export function set_token(token) {
  localStorage.setItem("token", token);
}

export function get_token() {
  return localStorage.getItem("token");
}

export async function check_token_validity() {
  if (!localStorage.getItem("token")) {
    return false;
  }
  try {
    await get_course_from_fetch("dummy", "dummy");
    return true;
  }catch{
    return false;
  }
}