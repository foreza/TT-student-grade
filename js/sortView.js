let sortNameState = 0;          // Keep track of the current sort name view state
let sortGradeState = 0;         // Keep track of the current sort grade view state
const upCaret = '&and;';
const downCaret = '&or;';


// Function that will access the table body, and iterate/remove all nodes
function clearViewTable(){

    const viewTableBody = document.querySelector('#table-grades tbody');

    while (viewTableBody.children.length > 0) {
        viewTableBody.lastChild.remove();
    }

}

function setSortStateDirty(){
       // Set the caret to a 'dirty' value to indicate it can be resorted
       document.querySelector("#nameSortStateCaret").textContent = "*"
       document.querySelector("#gradeSortStateCaret").textContent = "*"

}


// Function invoked by clicking the header for name 
// This will toggle the sortNameState and call the appropriate sort
// TODO: refactor more
function changeSortViewNameStateAndSort(){

    if (sortNameState === 0) {
        sortStudentCollectionByNameDescending();
        sortNameState = 1;
        return;
    } if (sortNameState === 1) {
        sortStudentCollectionByNameAscending();
        sortNameState = 0;
    }

}

// Function invoked by clicking the header for name 
// This will toggle the sortGradeState and call the appropriate sort
function changeSortViewGradeStateAndSort(){

    if (sortGradeState === 0) {
        sortStudentCollectionByGradeDescending();
        sortGradeState = 1;
        return;
    } if (sortGradeState === 1) {
        sortStudentCollectionByGradeAscending();
        sortGradeState = 0;
    }



}

// Function that will sort by name descending.
// TODO: Refactor to split view / make this file independent
function sortStudentCollectionByNameDescending(){

    // Sort the data
    students.sort(compareStudentNameDesc);

    // Re-render student table
    clearViewTable();
    renderStudentGradeTable(students);

    // TODO: Toggle the view carat
    document.querySelector("#nameSortStateCaret").innerHTML = upCaret;



}


// Function that will sort by name ascending.
// TODO: Refactor to split view / make this file independent
function sortStudentCollectionByNameAscending(){

    // Sort them descending, then reverse the array (TODO: Should we just write a 'compareNameAsc?' func)
    students.sort(compareStudentNameDesc).reverse();
    clearViewTable();
    renderStudentGradeTable(students);
    
    // TODO: Toggle the view carat
    document.querySelector("#nameSortStateCaret").innerHTML = downCaret;



}


// Sorting function to be used by sort()
function compareStudentNameDesc(a, b){

    // Convert to the same case
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    // Only need to iterate as long as the shorter string
    const shortestLen = nameA.length < nameB.length ? nameA.length : nameB.length;  

    for (var i = 0; i < shortestLen; ++i){
        
        // Check if one of them is bigger or not
        if (nameA.charCodeAt(i) > nameB.charCodeAt(i)){
            return 1;
        } else if (nameA.charCodeAt(i) < nameB.charCodeAt(i)){
            return - 1;
        } 

        // continue loop if the characters at same position are the same

    }

}


    // Function that will sort by name descending.
// TODO: Refactor to split view / make this file independent
function sortStudentCollectionByGradeDescending(){

    // Sort the data
    students.sort(compareStudentGradeDesc);

    // Re-render student table
    clearViewTable();
    renderStudentGradeTable(students);

    // TODO: Toggle the view carat
    document.querySelector("#gradeSortStateCaret").innerHTML = upCaret;


}


function sortStudentCollectionByGradeAscending(){

      // Sort them descending, then reverse the array (TODO: Should we just write a 'compareNameAsc?' func)
      students.sort(compareStudentGradeDesc).reverse();
      clearViewTable();
      renderStudentGradeTable(students);
      
      // TODO: Toggle the view carat
      document.querySelector("#gradeSortStateCaret").innerHTML = downCaret;



}


    function compareStudentGradeDesc(a, b){

        const gradeA = parseInt(a.grade);
        const gradeB = parseInt(b.grade);

        if (gradeA > gradeB) { 
            return -1; 
        } if (gradeA < gradeB) {
            return 1;
        } return 0;

    }
