import { createRoot } from 'react-dom/client';
import GPAContent from "../components/GPAContent";

// Function to add the GPA column header
async function tryAddGPAColumn() {
  const headers = document.querySelector('[role="columnheader"]').parentElement;

  if (!headers) {
    console.error("Column headers not found.");
    return;
  }

  const children = headers.children;
  const lastChild = children[children.length - 1];
  if (lastChild && lastChild.textContent.trim() === 'GPA') {
    return;
  }

  const clonedHead = lastChild.cloneNode(true);
  clonedHead.textContent = 'GPA';
  clonedHead.style.width = '3%';
  clonedHead.setAttribute('aria-label', 'GPA: Not sorted.');

  headers.appendChild(clonedHead);
}

// Function to get all course rows
function getAllCourseRows() {
  const tbody = document.querySelector('tbody');
  return tbody ? tbody.querySelectorAll('tr') : [];
}

// Function to add GPA to all course rows
async function addGPAToTable(observer) {
  if (observer) observer.disconnect();

  await tryAddGPAColumn();
  const courseRows = getAllCourseRows();

  if (courseRows.length === 0) return;

  console.log("Updating GPA for all courses");

  for (const tr of courseRows) {
    const gpaElements = tr.querySelectorAll('.gpa-content');
    gpaElements.forEach(element => element.remove());

    const newElement = document.createElement('td');
    createRoot(newElement).render(<GPAContent tr={tr} />);
    newElement.classList.add('gpa-content');
    
    tr.appendChild(newElement);
  }

  // Use setTimeout with 0 delay to wait for the next event loop
  await new Promise(resolve => setTimeout(resolve, 0));
  if (observer) observer.observe(document.querySelector('tbody'), { childList: true, subtree: true });
}

function observeTable(){
  const table = document.querySelector('tbody');
  if (table) {
    const observer = new MutationObserver(() => addGPAToTable(observer));
    observer.observe(table, { childList: true , subtree: true});
  }
}
addGPAToTable();
observeTable();