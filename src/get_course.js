import fetch_course from "./fetch_course";

const courseData = {};

window.addEventListener("beforeunload", () => {
  localStorage.setItem("courseData", JSON.stringify(courseData));
});

window.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("courseData");
  if (savedData) {
    Object.assign(courseData, JSON.parse(savedData));
  }
});

export function get_course_from_storage(courseName, lecturer) {
  return courseData[courseName + lecturer] || null;
}

export async function get_course_from_fetch(courseName, lecturer) {
  const token = "lAWH8LnG20ukZDoh54265ZXyiaqhvTp5";
  const data = await fetch_course(token, courseName, lecturer);
  courseData[courseName + lecturer] = data || {};
  return courseData[courseName + lecturer];
}
