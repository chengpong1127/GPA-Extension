import { createRoot } from 'react-dom/client';
import GPAHeader from "../components/GPAHeader";
import GPAContent from "../components/GPAContent";

// Utility function to create and render the React node
async function getNewElement(reactNode) {
  const newElement = document.createElement('div');
  const root = createRoot(newElement);
  root.render(reactNode);

  // Wait until the element is rendered
  await new Promise(resolve => {
    const observer = new MutationObserver(() => {
      const element = newElement.firstElementChild;
      if (element) {
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(newElement, { childList: true, subtree: true });
  });

  return newElement.firstElementChild;
}

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

  // Get and append the GPA header
  const thElement = await getNewElement(<GPAHeader />);
  if (thElement) {
    headers.appendChild(thElement);
    console.log("GPA column added");
  } else {
    console.error("Failed to add GPA column");
  }
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
    const lastChild = tr.lastElementChild;
    if (lastChild && lastChild.classList.contains('gpa-content')) {
      continue;
    }

    const gpaContent = await getNewElement(<GPAContent tr={tr} />);
    gpaContent.classList.add('gpa-content');
    
    tr.appendChild(gpaContent);
  }

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