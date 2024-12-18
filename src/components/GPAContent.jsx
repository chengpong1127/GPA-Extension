

export default function GPAContent(tr) {
  if(tr.children.length < 6){
    return <td>
    </td>
  }
  return <td>
    4.0
  </td>
}

function getCourseData(tr){
  const tds = tr.querySelectorAll('td');
  const courseName = tds[2].textContent;
  const lecturer = tds[6].textContent;
  return {courseName, lecturer};
}