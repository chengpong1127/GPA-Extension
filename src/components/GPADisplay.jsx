import { get_course_from_fetch, get_course_from_storage} from "../utils/get_course";
import { useEffect, useState } from "react";
import FetchButton from "./FetchButton";
import PropTypes from 'prop-types';

export default function GPADisplay({courseName, lecturer}){
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const data = get_course_from_storage(courseName, lecturer);
    setCourseData(data);
  }, [courseName, lecturer]);

  function clickHandler() {
    const fetchGPA = async () => {
      try {
        const data = await get_course_from_fetch(courseName, lecturer);
        setCourseData(data);
      } catch {
        alert("Invalid token. Please set a valid token in the extension.");
      }
    };
    fetchGPA();
  }


  if (courseData && Object.keys(courseData).length !== 0){
    return <GPAValue gpa={parseFloat(courseData.grade.GPA)}/>
  }else if (courseData === null){
    return <FetchButton onClick={clickHandler}/>
  }else{
    return <NA/>
  }
}

GPADisplay.propTypes = {
  courseName: PropTypes.string.isRequired,
  lecturer: PropTypes.string.isRequired
}

function NA() {
  return <div style={{ textAlign: 'center', opacity: 0.7 }}>N/A</div>;
}

function GPAValue({ gpa }) {
  const color_map = {
    3.7: '#10B981', // green
    2.7: '#F97316', // orange
    1.7: '#EF4444', // red
    0.0: '#A855F7', // purple
  };

  const sorted_keys = Object.keys(color_map)
    .map(key => parseFloat(key))
    .sort((a, b) => b - a);

  const color = sorted_keys.find(key => gpa >= key)
    ? color_map[sorted_keys.find(key => gpa >= key)]
    : '#A855F7';

  return (
    <div style={{ fontWeight: 'bold', color: color, textAlign: 'center' }}>
      {gpa.toFixed(2)}
    </div>
  );
}

GPAValue.propTypes = {
  gpa: PropTypes.number.isRequired
}