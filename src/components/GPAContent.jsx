import { get_course_from_fetch, get_course_from_storage} from "../get_course";
import { useEffect, useState } from "react";

export default function GPAContent({ tr }) {
  const [courseName, setCourseName] = useState('');
  const [lecturer, setLecturer] = useState('');
  useEffect(() => {
    function getCourseData(tr) {
      const tds = tr.querySelectorAll('td');
      const courseName = tds[2]?.textContent || '';
      const lecturer = tds[6]?.textContent || '';
      return { courseName, lecturer };
    }


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
  }, []);

  if (courseName === '' && lecturer === ''){
    return <></>
  }else{
    return <GPADisplay courseName={courseName} lecturer={lecturer}/>
  }
}



function GPADisplay({courseName, lecturer}){
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const data = get_course_from_storage(courseName, lecturer);
    setCourseData(data);
    console.log(`Course data for ${courseName} ${lecturer} is fetched from storage, data:`, data);
  }, [courseName, lecturer]);

  function clickHandler() {
    const fetchGPA = async () => {
      const data = await get_course_from_fetch(courseName, lecturer);
      setCourseData(data);
      console.log(`Course data for ${courseName} ${lecturer} is fetched, data:`, data);
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

function NA() {
  return <div style={{ textAlign: 'center' }}>N/A</div>;
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

function FetchButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        borderRadius: '25%',
        margin: 'auto',
        width: '36px',
        height: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DDD'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      onMouseDown={(e) => e.currentTarget.style.backgroundColor = '#AAA'}
      onMouseUp={(e) => e.currentTarget.style.backgroundColor = '#DDD'}
    >
      <SearchIcon />
    </button>
  );
}

function LoadingAnimation() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  );
}


function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
  );
}