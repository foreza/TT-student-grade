let sortNameState = 1;          // Keep track of the current sort name view state (by default, name descending)
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
function sv_changeSortViewNameStateAndSort() {

    if (sortNameState === 0) {
        sortStudentCollectionByNameDescending();
        sortNameState = 1;
        return;
    } if (sortNameState === 1) {
        sortStudentCollectionByNameAscending();
        sortNameState = 0;
        return;
    }

}

// Function invoked by clicking the header for name 
// This will toggle the sortGradeState and call the appropriate sort
function sv_changeSortViewGradeStateAndSort() {


    switch (sortGradeState) {
        case 0: 
            sortStudentCollectionByGradeDescending();
            sortGradeState = 1;
            break;
        case 1:
            sortStudentCollectionByGradeAscending();
            sortGradeState = 0;
            break;
    }   


}




// Function that will sort by name descending.
// TODO: Refactor to split view / make this file independent
function sortStudentCollectionByNameDescending() {

    view_clearViewTable();
    model_getAllStudentDataSortedByType("name", 1);
    view_setNameSortStateCaretDown();
}





// Function that will sort by name ascending.
// TODO: Refactor to split view / make this file independent
function sortStudentCollectionByNameAscending() {

    view_clearViewTable();
    model_getAllStudentDataSortedByType("name", -1);
    view_setNameSortStateCaretUp();

}



// Function that will sort by name descending.
// TODO: Refactor to split view / make this file independent
function sortStudentCollectionByGradeDescending() {

    view_clearViewTable();
    model_getAllStudentDataSortedByType("grade", -1);
    view_setGradeSortStateCaretDown();

}


function sortStudentCollectionByGradeAscending() {

    view_clearViewTable();
    model_getAllStudentDataSortedByType("grade", 1);
    view_setGradeSortStateCaretUp();

}

