import { createRoot } from 'react-dom/client';
import GPAHeader from "../components/GPAHeader";
import GPAContent from "../components/GPAContent";

async function getNewElement(reactNode) {
  const newElement = document.createElement('div');
  createRoot(newElement).render(reactNode);

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const element = newElement.firstElementChild;
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(newElement, { childList: true, subtree: true });
  });
}

async function tryAddGPAColumn() {
  // Locate the parent element of column headers
  const headers = document.querySelector('[role="columnheader"]').parentElement;

  if (!headers) {
    console.error("Column headers not found.");
    return;
  }

  // Check if the last child is already the GPA column
  const children = headers.children;
  const lastChild = children[children.length - 1];
  if (lastChild && lastChild.textContent.trim() === 'GPA') {
    console.log("GPA column already exists.");
    return;
  }
  const thElement = await getNewElement(<GPAHeader />);
  if (thElement) {
    headers.appendChild(thElement);
    console.log("GPA column added");
  } else {
    console.error("Failed to render GPA column.");
  }
}

function getAllCourseRows() {
  const tbody = document.querySelector('tbody');
  const trs = tbody.querySelectorAll('tr');
  return trs;
}

function addGPAToTable() {
  tryAddGPAColumn();
  const courseRows = getAllCourseRows();
  if (courseRows.length === 0) return;

  courseRows.forEach(async (tr) => {
    tr.appendChild(await getNewElement(<GPAContent tr={tr} />));
  });
}

addGPAToTable();