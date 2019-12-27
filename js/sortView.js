let sortNameState = 0;          // Keep track of the current sort view state


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
}


// Function invoked by clicking the header for name 
// This will toggle the sortNameState and call the appropriate sort
// TODO: Rename this function and refactor more
function changeSortViewStateAndSort(){

    if (sortNameState === 0) {
        sortStudentCollectionByNameDescending();
        sortNameState = 1;
        return;
    } if (sortNameState === 1) {
        sortStudentCollectionByNameAscending();
        sortNameState = 0;
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
    document.querySelector("#nameSortStateCaret").textContent = "(desc)"



}


// Function that will sort by name ascending.
// TODO: Refactor to split view / make this file independent
function sortStudentCollectionByNameAscending(){

    // Sort them descending, then reverse the array (TODO: Should we just write a 'compareNameAsc?' func)
    students.sort(compareStudentNameDesc).reverse();
    clearViewTable();
    renderStudentGradeTable(students);
    
    // TODO: Toggle the view carat
    document.querySelector("#nameSortStateCaret").textContent = "(asc)"



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