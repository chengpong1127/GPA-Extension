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
  const token = "lAWH8LnG20ukZDoh54265ZXyiaqhvTp5";
  const data = await fetch_course(token, courseName, lecturer);
  courseData[courseName + lecturer] = data || {};
  return courseData[courseName + lecturer];
}
