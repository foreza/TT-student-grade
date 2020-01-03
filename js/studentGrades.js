

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
    });

}

// Function that will access the table body
function view_clearViewTable() {
    tbody.empty();

}

// Update the view given a student object
function view_updateViewWithNewStudent(studentObj) {
    tbody.append(util_returnCreatedRowItemForStudent(studentObj));
}


// Delete student from view given an id
function view_deleteStudentFromView(id) {
    $(`#${uniqueIDPrefix}${id}`).remove();
}


// Update the row for a student given the id and student object
function view_updateViewWithModifiedStudent(studentObj, id) {

    $(`#${uniqueIDPrefix}name${id} span`).text(studentObj.name);
    $(`#${uniqueIDPrefix}grade${id} span`).text(studentObj.grade);
}


// Clear the bottom input form
function view_clearFooterInputForm() {

    // TODO: ??
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


// TODO: use jquery
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
        let theStudent = {
            id: id,    // TODO: How are we assigning IDs?
            name: $(`#${uniqueIDPrefix}input-name${id}`).val(),
            grade: parseInt($(`#${uniqueIDPrefix}input-grade${id}`).val())
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

    // Hide the specific table cell
    $(`#${uniqueIDPrefix}name${id} span`).attr('class', 'edit-content-hidden');

    const inputForName = $('<input></input>')
        .attr('id', `${uniqueIDPrefix}input-name${id}`)
        .attr('type', "text")
        .attr('value', $(`#${uniqueIDPrefix}name${id} span`).text());

    $(`#${uniqueIDPrefix}name${id}`).append(inputForName);

}


// Disables editing for the specific name field
function disableEditingNameViewForStudentID(id) {

    // Show the specific table cell
    $(`#${uniqueIDPrefix}name${id} span`).removeAttr('class', 'edit-content-hidden');

    // Access and destroy the input
    $(`#${uniqueIDPrefix}input-name${id}`).remove();


}


// Enables editing for the specific grade field
function enableEditingGradeViewForStudentID(id) {


      // Hide the specific table cell
      $(`#${uniqueIDPrefix}grade${id} span`).attr('class', 'edit-content-hidden');

      const inputForGrade = $('<input></input>')
          .attr('id', `${uniqueIDPrefix}input-grade${id}`)
          .attr('type', "number")
          .attr('min', 0)
          .attr('max', 100)
          .attr('value', $(`#${uniqueIDPrefix}grade${id} span`).text());
  
      $(`#${uniqueIDPrefix}grade${id}`).append(inputForGrade);
}


// Disables editing for the specific grade field
function disableEditingGradeViewForStudentID(id) {

     // Show the specific table cell
     $(`#${uniqueIDPrefix}grade${id} span`).removeAttr('class', 'edit-content-hidden');

     // Access and destroy the input
     $(`#${uniqueIDPrefix}input-grade${id}`).remove();

}


// Enables editing for the specific option id
function enableEditingOptionViewForStudentID(id) {

    // Hide options button
    $(`#${uniqueIDPrefix}options${id} .on-hover-show button`).attr('class', 'edit-content-hidden');

    // Show edit links
    $(`#${uniqueIDPrefix}options${id} .on-edit-show div` ).attr('class', 'is-editable');


}


// Disables editing for the specific option id
function disableEditingOptionViewForStudentID(id) {

    // Hide edit links
    $(`#${uniqueIDPrefix}options${id} .on-edit-show div` )
    .removeAttr('class', 'is-editable')
    .attr('class', 'edit-content-hidden');

    // Show the options button
    $(`#${uniqueIDPrefix}options${id} .on-hover-show button`).removeAttr('class', 'edit-content-hidden');

}



// Helper function that returns a new row object
// TODO: Break this up into smaller functions
function util_returnCreatedRowItemForStudent(student) {

    const row = $('<tr></tr>');

    const colName = $('<td></td>').attr('id', `${uniqueIDPrefix}name${student.id}`);
    const colGrade = $('<td></td>').attr('id', `${uniqueIDPrefix}grade${student.id}`);
    const colOptions = $('<td></td>').attr('id', `${uniqueIDPrefix}options${student.id}`);

    const colNameContent = $('<span></span>').text(student.name);
    colName.append(colNameContent);

    const colGradeContent = $('<span></span>').text(student.grade);
    colGrade.append(colGradeContent);

    const onHoverShow = $('<div></div>').attr('class', 'on-hover-show');

    const dropDownButton = $('<button></button>').text("Menu");

    const dropDownContent = $('<div></div>').attr('class', 'dropdown-content');

    const editLink = $('<a></a>')
        .text('Edit')
        .attr('href', '#')
        .attr('onclick', `click_editActionWithStudentID(${student.id})`);
    
    const deleteLink = $('<a></a>')
        .text('Delete')
        .attr('href', '#')
        .attr('onclick', `click_deleteRowWithStudentID(${student.id})`);


    dropDownContent.append(editLink, deleteLink);
    onHoverShow.append(dropDownButton, dropDownContent);

    const onEditShow = $('<div></div>').attr('class', 'on-edit-show');

    const editContentLinks = $('<div></div>').attr('class','edit-content-hidden');

    const saveLink = $('<a></a>')
        .text('Save')
        .attr('href', '#')
        .attr('onclick', `updateRowWithStudentID(${student.id})`);

    const cancelLink = $('<a></a>')
        .text('Cancel')
        .attr('href', '#')
        .attr('onclick', `cancelActionWithStudentID(${student.id})`);



    editContentLinks.append(saveLink, cancelLink);

    onEditShow.append(editContentLinks);

    colOptions.append(onHoverShow, onEditShow);

    row.attr('id', `${uniqueIDPrefix}${student.id}`);   // Use a configurable prefix
    row.append(colName, colGrade, colOptions);

    return row;

}
















