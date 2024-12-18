

export default function GPAContent({ tr }) {
  // Check if there are enough columns and handle accordingly
  if (tr.children.length === 1) {
    return <></>
  }
  const { courseName, lecturer } = getCourseData(tr);
  
  function clickHandler() {
    console.log(`Fetching data of ${courseName} by ${lecturer}`);
  }


  return <td>
    <FetchButton onClick={clickHandler}/>
  </td>
  
}

// Function to get course data, added types for better clarity
function getCourseData(tr) {
  const tds = tr.querySelectorAll('td');
  const courseName = tds[2]?.textContent || ''; // Optional chaining and fallback
  const lecturer = tds[6]?.textContent || ''; // Optional chaining and fallback
  return { courseName, lecturer };
}

function FetchButton({onClick}) {
  return (
    <button 
      className="w-6 h-6 m-1 hover:bg-gray-400 hover:scale-110 transition-transform duration-200"
      onClick={onClick}>
      <SearchIcon/>
    </button>
  );
}


function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
  );
}