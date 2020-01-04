let sortNameState = 0;          // Keep track of the current sort name view state
let sortGradeState = 0;         // Keep track of the current sort grade view state

// TODO: Move all of the document query selection behaviors out of this file
const upCaret = '&and;';
const downCaret = '&or;';
const dirtyCaret = '*';


function sv_getSortNameState(){
    return sortNameState;
}

function sv_getSortGradeState(){
    return sortGradeState;
}


// Function invoked by clicking the header for name 
// This will toggle the sortNameState and call the appropriate sort
// TODO: refactor more
function sv_changeSortViewNameStateAndSort(studentArr) {

    if (sortNameState === 0) {
        sortStudentCollectionByNameDescending(studentArr);
        sortNameState = 1;
        return;
    } if (sortNameState === 1) {
        sortStudentCollectionByNameAscending(studentArr);
        sortNameState = 0;
        return;
    }

}

// Function invoked by clicking the header for name 
// This will toggle the sortGradeState and call the appropriate sort
function sv_changeSortViewGradeStateAndSort(studentArr) {

    if (sortGradeState === 0) {
        sortStudentCollectionByGradeDescending(studentArr);
        sortGradeState = 1;
        return;
    } if (sortGradeState === 1) {
        sortStudentCollectionByGradeAscending(studentArr);
        sortGradeState = 0;
        return;
    }



}

// Function that will sort by name descending.
// TODO: Refactor to split view / make this file independent
function sortStudentCollectionByNameDescending(studentArr) {

    // Sort the data
    studentArr.sort(compareStudentNameDesc);

    view_setNameSortStateCaretDown();
}


// Function that will sort by name ascending.
// TODO: Refactor to split view / make this file independent
function sortStudentCollectionByNameAscending(studentArr) {

    // Sort them descending, then reverse the array (TODO: Should we just write a 'compareNameAsc?' func)
    studentArr.sort(compareStudentNameDesc).reverse();

    view_setNameSortStateCaretUp();

}


// Sorting function to be used by sort()
function compareStudentNameDesc(a, b) {

    // Convert to the same case
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    // Only need to iterate as long as the shorter string
    const shortestLen = nameA.length < nameB.length ? nameA.length : nameB.length;

    for (var i = 0; i < shortestLen; ++i) {

        // Check if one of them is bigger or not
        if (nameA.charCodeAt(i) > nameB.charCodeAt(i)) {
            return 1;
        } else if (nameA.charCodeAt(i) < nameB.charCodeAt(i)) {
            return - 1;
        }

        // continue loop if the characters at same position are the same

    }

}


// Function that will sort by name descending.
// TODO: Refactor to split view / make this file independent
function sortStudentCollectionByGradeDescending(studentArr) {

    // Sort the data
    studentArr.sort(compareStudentGradeDesc);
}


function sortStudentCollectionByGradeAscending(studentArr) {

    // Sort them descending, then reverse the array (TODO: Should we just write a 'compareNameAsc?' func)
    studentArr.sort(compareStudentGradeDesc).reverse();
}


function compareStudentGradeDesc(a, b) {

    const gradeA = parseInt(a.grade);
    const gradeB = parseInt(b.grade);

    if (gradeA > gradeB) {
        return -1;
    } if (gradeA < gradeB) {
        return 1;
    } return 0;

}
