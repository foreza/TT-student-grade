

// Sample Array of student Grades
var students = [];

// id uniqueifier 
var startingID = 0;

// Maintain reference to the tBody 
var tbody;

// Maintain reference to the input form 
var tFooterNameInput;
var tFooterGradeInput;

var uniqueIDPrefix;



$(document).ready(function () {

    initializeViewConstants();
    view_renderStudentGradeTable(students);

});






function initializeViewConstants() {

    students = model_getAllStudentData();       // Add remote data to initial local view

    // Maintain reference to the tBody 
    tbody = $("#table-grades tbody");

    // Maintain reference to the input form 
    tFooterNameInput = document.querySelector('#input-name');
    // tFooterNameInput = $("#input-name");
    tFooterGradeInput = document.querySelector('#input-grade');
    // tFooterGradeInput = $("#input-grade");

    // ID uniqueifier
    startingID = students.length;   // Set this to the input length for now and increment this

    uniqueIDPrefix = "student-";
    

}





// Data Model Manipulation

// GET: Get all students
function model_getAllStudentData() {

    // Sample Array of student Grades
    let localCollection = [
        { id: 0, name: 'Do', grade: 24 },
        { id: 1, name: 'Rey', grade: 23 },
        { id: 2, name: 'Mee', grade: 99 },
        { id: 3, name: 'AAA chan', grade: 88 },
        { id: 4, name: 'aaa chen ', grade: 22 },
        { id: 5, name: 'zzz', grade: 33 },
        { id: 6, name: 'zed ke', grade: 44 },
        { id: 7, name: 'zed kea', grade: 44 },
        { id: 8, name: 'armin buu', grade: 44 }
    ];

    return localCollection;

}

// CREATE: Add new student given a student object
function model_addNewStudent(studentObj) {
    students.push(studentObj);      // Add it to the actual array
}

// UPDATE: Update an existing student in the local storage given the student object and id for lookup
function model_updateExistingStudent(studentObj, id) {

    for (var i = 0; i < students.length; ++i) {
        // Loop until we find a matching ID
        if (id == students[i].id) {
            students[i].name = studentObj.name;
            students[i].grade = studentObj.grade;
            alert('Found id for update')
            break;
        }

    }

}

// DELETE: Delete an existing student given an ID
function model_deleteStudent(id) {
    // For removing from the data structure, we'll do brute force approach for now
    for (var i = 0; i < students.length; ++i) {

        // Loop until we find a matching ID
        if (id == students[i].id) {

            students.splice(i, 1);
            alert('Found id for deletion')

            break;
        }

    }
}




// View Manipulation

// Function to render grades 
function view_renderStudentGradeTable(studentGradeList) {

    studentGradeList.forEach(student => {
        tbody.append(util_returnCreatedRowItemForStudent(student));
        console.log(util_returnCreatedRowItemForStudent(student));
    });

}

// Function that will access the table body, and iterate/remove all nodes
function view_clearViewTable() {
    tbody.empty();

}

// Update the view given a student object
function view_updateViewWithNewStudent(studentObj) {
    tbody.append(util_returnCreatedRowItemForStudent(studentObj));
}


// Delete student from view given an id
function view_deleteStudentFromView(id) {
    // document.querySelector(`#${uniqueIDPrefix}${id}`).remove();
    $(`#${uniqueIDPrefix}${id}`).remove();
}


// Update the row for a student given the id and student object
function view_updateViewWithModifiedStudent(studentObj, id) {

    const nameColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[0];
    const gradeColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[1];

    nameColItem.children[0].innerHTML = studentObj.name;
    gradeColItem.children[0].innerHTML = studentObj.grade;
}


// Clear the bottom input form
function view_clearFooterInputForm() {
    tFooterNameInput.value = "";
    tFooterGradeInput.value = 0;
}


function view_toggleNameSortStateCaret(state) {
    if (state === 0) {
        view_setNameSortStateCaretDown();
    }
    if (state === 1) {
        view_setNameSortStateCaretUp();
    }
}

function view_toggleGradeSortStateCaret(state) {
    if (state === 0) {
        view_setGradeSortStateCaretDown();
    }
    if (state === 1) {
        view_setGradeSortStateCaretUp();
    }
}



function view_setNameSortStateCaretDown() {
    document.querySelector("#nameSortStateCaret").innerHTML = downCaret;
}

function view_setNameSortStateCaretUp() {
    document.querySelector("#nameSortStateCaret").innerHTML = upCaret;
}

function view_setGradeSortStateCaretDown() {
    document.querySelector("#gradeSortStateCaret").innerHTML = downCaret;
}

function view_setGradeSortStateCaretUp() {
    document.querySelector("#gradeSortStateCaret").innerHTML = upCaret;
}

// Set the caret to a 'dirty' value to indicate it can be resorted
function view_setSortStateDirty() {
    document.querySelector("#nameSortStateCaret").textContent = "*"
    document.querySelector("#gradeSortStateCaret").textContent = "*"

}



// Functions called by HTML file


// [ON-CLICK] Function called by index when the footer form is used
function click_attemptAddNewRow() {

    if (isValidInputForFooterForm()) {

        let newStudent = {
            id: startingID++,    // TODO: How are we assigning IDs?
            name: tFooterNameInput.value,
            grade: parseInt(tFooterGradeInput.value)
        }

        model_addNewStudent(newStudent);
        view_updateViewWithNewStudent(newStudent);
        view_clearFooterInputForm();
        view_setSortStateDirty();

    } else
        alert('Unable to add new row; check to make sure the form is filled out.');
}


// [ON-CLICK] Function called by index when the row's 'delete' is clicked
function click_deleteRowWithStudentID(id) {
    model_deleteStudent(id);
    view_deleteStudentFromView(id);
}


// [ON-CLICK] Function called by index when the header for name sort is clicked
function click_sortTableByName() {
    sv_changeSortViewNameStateAndSort(students); // Pass this by reference
    view_clearViewTable();
    view_toggleNameSortStateCaret(sv_getSortNameState());
    view_renderStudentGradeTable(students);
}


// [ON-CLICK] Function called by index when the header for name sort is clicked
function click_sortTableByGrade() {
    sv_changeSortViewGradeStateAndSort(students);  // Pass this by reference
    view_clearViewTable();
    view_toggleGradeSortStateCaret(sv_getSortGradeState());
    view_renderStudentGradeTable(students);
}


// [ON-CLICK] Function called by the index for a specific id 
function click_editActionWithStudentID(id) {
    alert(`Begin editing: ${id}`);

    enableEditingNameViewForStudentID(id);
    enableEditingGradeViewForStudentID(id);
    enableEditingOptionViewForStudentID(id);


}

function updateRowWithStudentID(id) {

    // Validate
    if (isValidInputForEditOfID(id)) {

        // Get the dom
        const nameColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[0];
        const gradeColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[1];

        let theStudent = {
            id: id,    // TODO: How are we assigning IDs?
            name: nameColItem.children[1].value,
            grade: parseInt(gradeColItem.children[1].value)
        }

        // Update the data model (todo: do validation here)
        model_updateExistingStudent(theStudent, id);

        // Update the view
        view_updateViewWithModifiedStudent(theStudent, id);

        // Indicate that we may resort the data.
        view_setSortStateDirty();


        // Handle the edit view
        disableEditingNameViewForStudentID(id);
        disableEditingGradeViewForStudentID(id);
        disableEditingOptionViewForStudentID(id);

    }

}

function cancelActionWithStudentID(id) {
    alert(`Canceling Action for: ${id}`);

    // Handle the edit view
    disableEditingNameViewForStudentID(id);
    disableEditingGradeViewForStudentID(id);
    disableEditingOptionViewForStudentID(id);



}


// Editing view functions


// Enables editing for the specific name field
function enableEditingNameViewForStudentID(id) {

    const nameColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[0];

    // Hide the existing value
    const nameColItemVal = nameColItem.children[0];
    nameColItemVal.setAttribute('class', 'edit-content-hidden');

    // Create an input with the existing value as placeholder
    const inputForName = document.createElement('input')
    inputForName.setAttribute('type', "text");
    inputForName.setAttribute('value', nameColItemVal.innerHTML);
    nameColItem.appendChild(inputForName);

}


// Disables editing for the specific name field
function disableEditingNameViewForStudentID(id) {

    const nameColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[0];

    // Show the value
    const nameColItemVal = nameColItem.children[0];
    nameColItemVal.removeAttribute('class', 'edit-content-hidden');

    // Access and destroy the input
    const nameColItemInput = nameColItem.children[1];
    nameColItemInput.remove();


}


// Enables editing for the specific grade field
function enableEditingGradeViewForStudentID(id) {

    const gradeColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[1];

    // Hide the existing value
    const gradeColItemVal = gradeColItem.children[0];
    gradeColItemVal.setAttribute('class', 'edit-content-hidden');

    // Create an input with the existing value as placeholder
    const inputForGrade = document.createElement('input')
    inputForGrade.setAttribute('type', "number");
    inputForGrade.setAttribute('min', 0);
    inputForGrade.setAttribute('max', 100);
    inputForGrade.setAttribute('value', gradeColItemVal.innerHTML);
    gradeColItem.appendChild(inputForGrade);

}


// Disables editing for the specific grade field
function disableEditingGradeViewForStudentID(id) {

    const gradeColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[1];

    // Show the value
    const gradeColItemVal = gradeColItem.children[0];
    gradeColItemVal.removeAttribute('class', 'edit-content-hidden');

    // Access and destroy the input
    const gradeColItemInput = gradeColItem.children[1];
    gradeColItemInput.remove();

}


// Enables editing for the specific option id
function enableEditingOptionViewForStudentID(id) {
    const optionsColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[2];
    // Hide the options button
    optionsColItem.children[0].children[0].setAttribute('class', 'edit-content-hidden');
    // Show the edit links
    optionsColItem.children[1].children[0].setAttribute('class', 'is-editable');
}


// Disables editing for the specific option id
function disableEditingOptionViewForStudentID(id) {
    const optionsColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[2];

    // Hide the edit links
    optionsColItem.children[1].children[0].removeAttribute('class', 'is-editable');
    optionsColItem.children[1].children[0].setAttribute('class', 'edit-content-hidden');

    // Show the options button
    optionsColItem.children[0].children[0].removeAttribute('class', 'is-editable');
}


// Helper function that returns a new row object
// TODO: Break this up into smaller functions
function util_returnCreatedRowItemForStudent(student) {

    const row = document.createElement('tr');

    const colName = document.createElement('td');
    const colGrade = document.createElement('td');
    const colOptions = document.createElement('td');


    const colNameContent = document.createElement('span');
    colNameContent.textContent = student.name;
    colName.appendChild(colNameContent);

    const colGradeContent = document.createElement('span');
    colGradeContent.textContent = student.grade;
    colGrade.appendChild(colGradeContent);

    // On Hover show button and links
    const onHoverShow = document.createElement('div');
    onHoverShow.setAttribute('class', 'on-hover-show');

    const dropDownButton = document.createElement('button');
    dropDownButton.textContent = "Menu";

    const dropDownContent = document.createElement('div');
    dropDownContent.setAttribute('class', 'dropdown-content');

    const editLink = document.createElement('a');
    const deleteLink = document.createElement('a');

    editLink.setAttribute('href', "#");
    deleteLink.setAttribute('href', "#");
    editLink.setAttribute('onclick', `click_editActionWithStudentID(${student.id})`);
    deleteLink.setAttribute('onclick', `click_deleteRowWithStudentID(${student.id})`);

    editLink.textContent = 'Edit';
    deleteLink.textContent = 'Delete';

    dropDownContent.appendChild(editLink);
    dropDownContent.appendChild(deleteLink);

    onHoverShow.appendChild(dropDownButton);
    onHoverShow.appendChild(dropDownContent);

    // On edit show content and links
    const onEditShow = document.createElement('div');
    onEditShow.setAttribute('class', 'on-edit-show');

    const editContentLinks = document.createElement('div');
    editContentLinks.setAttribute('class', 'edit-content-hidden');

    const saveLink = document.createElement('a');
    const cancelLink = document.createElement('a');


    saveLink.setAttribute('href', "#");
    cancelLink.setAttribute('href', "#");
    saveLink.setAttribute('onclick', `updateRowWithStudentID(${student.id})`);
    cancelLink.setAttribute('onclick', `cancelActionWithStudentID(${student.id})`);

    saveLink.textContent = 'Save';
    cancelLink.textContent = 'Cancel';


    editContentLinks.appendChild(saveLink);
    editContentLinks.appendChild(cancelLink);

    onEditShow.appendChild(editContentLinks);


    colOptions.appendChild(onHoverShow);
    colOptions.appendChild(onEditShow);

    row.setAttribute('id', `${uniqueIDPrefix}${student.id}`);   // Use a configurable prefix
    row.appendChild(colName);
    row.appendChild(colGrade);
    row.appendChild(colOptions);

    return row;

}
















