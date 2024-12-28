import { useEffect, useState } from "react";
import GPADisplay from "./GPADisplay";
import PropTypes from 'prop-types';

function findCourseNameLecturerIndeces() {
  const thead = document.querySelector('thead');
  const headers = thead.querySelectorAll('th');
  let courseNameIndex = 2;
  let lecturerIndex = 6;
  headers.forEach((header, index) => {
    if (header.textContent === '課程名稱' || header.textContent === 'Course Title') {
      courseNameIndex = index;
    } else if (header.textContent === '授課教師' || header.textContent === 'Instructor') {
      lecturerIndex = index;
    }
  });
  return { courseNameIndex, lecturerIndex };
}

const { courseNameIndex, lecturerIndex } = findCourseNameLecturerIndeces();

function getCourseData(tr) {
  const tds = tr.querySelectorAll('td');
  const courseName = tds[courseNameIndex]?.textContent || '';
  const lecturer = tds[lecturerIndex]?.textContent || '';
  return { courseName, lecturer };
}


export default function GPAContent({ tr }) {
  const [courseName, setCourseName] = useState('');
  const [lecturer, setLecturer] = useState('');
  useEffect(() => {
    const { courseName, lecturer } = getCourseData(tr);
    setCourseName(courseName);
    setLecturer(lecturer);

    const observer = new MutationObserver(() => {
      
      const { courseName, lecturer } = getCourseData(tr);
      setCourseName(courseName);
      setLecturer(lecturer);
    });
    observer.observe(tr, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, [tr]);

  if (courseName === '' && lecturer === ''){
    return <></>
  }else{
    return <GPADisplay courseName={courseName} lecturer={lecturer}/>
  }
}

GPAContent.propTypes = {
  tr: PropTypes.object.isRequired
};