var students = [];                              // Student Grades Array
var startingID = 0;                             // Student id uniqueifier (TODO: Replace)
var tbody;                                      // Reference to the Table Body 

var uniqueIDPrefix;

// Local storage (temporary)
const studentLocalStorage = window.localStorage;
const studentStorageKeyName = "studentGradeCollection";
const storageEnabled = true;

// Sample AJAX call (temporary)
const sampleAPIURL = "https://randomuser.me/api/?results=10"

$(document).ready(function () {

    initializeViewConstants();
    view_renderStudentGradeTable(students);

    // Test event on-click bindings for testing local storage and API calls:
    $("#addSampleData").bind({
        click: function () {

            test_fetchRemoteSampleDataAsPromise().then(data => {
                model_addNewStudentCollection(data);            // update the model
                view_renderStudentGradeTable(students);         // re-render the table
            })
        }
      });

      $("#removeAllData").bind({
        click: function () {
            model_deleteAllStudents();                      // Toggle the value
            view_clearViewTable();
        }
      });

});



function initializeViewConstants() {

    tbody = $("#table-grades tbody");                   // Use jQuery to select the tBody (we'll use this alot)
    students = model_getAllStudentData();               // Add remote data to initial local view
    startingID = students.length;                       // TODO: Figure out a better way. Set this to the input length for now and increment this
    uniqueIDPrefix = "student-";                        // TODO: Figure out a better way. Create some prefix. 

}


// Local storage methods


// Method to retrieve student data from storage
function storage_retrieveStudentData() {

    data = studentLocalStorage.getItem(studentStorageKeyName);
    return data != null ? JSON.parse(data) : [];
}


// Method to write student data to storage
function storage_writeStudentData() {
    studentLocalStorage.setItem(studentStorageKeyName, JSON.stringify(students));
}


// Method to clean the storage
function storage_removeAllStudentData(){
    studentLocalStorage.removeItem(studentStorageKeyName);
}


// Method to get sample test data, takes in a function as param to call after success
function test_fetchRemoteSampleDataAsPromise(){

    getSampleRemoteData = new Promise(
        function (resolve, reject) {

            $.get( sampleAPIURL, data => {
                const newStudentsData = data.results.map( student => {
                    return {
                        id: startingID++,                       // TODO: Make this guranteed unique 
                        name: student.name.first, 
                        grade: student.dob.age 
                        };
                    })

                resolve(newStudentsData);

            }).catch(error => {
                reject(new Error('Some error happened here: ', error));
            });
        }).then(data => {
            if (data != null) { 
                return(data);
            } else {
                reject(new Error('Data from remote was null'));
            }
        }
    );

    return getSampleRemoteData;
    
}


// TEST: Use this to generate a sample data set if there's nothing in local storage
function test_returnMockData() {

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


// Data Model Manipulation


// GET: Get all students
function model_getAllStudentData() {

    return storage_retrieveStudentData();
    // return test_returnMockData();
    // return [];

}


// CREATE: Add new student given a student object
function model_addNewStudent(studentObj) {
    
    students.push(studentObj);      // Add it to the actual array

    // Write this to local storage if enabled
    if (storageEnabled) {
        storage_writeStudentData();
    }

}


// CREATE: Add a collection of new students
function model_addNewStudentCollection(studentCollection) {
    students = students.concat(studentCollection);      // Add it to the actual array

    // Write this to local storage if enabled
    if (storageEnabled) {
        storage_writeStudentData();
    }

}


// UPDATE: Update an existing student in the local storage given the student object and id for lookup
function model_updateExistingStudent(studentObj, id) {

    for (var i = 0; i < students.length; ++i) {

        // Loop until we find a matching ID
        if (id == students[i].id) {
            students[i].name = studentObj.name;
            students[i].grade = studentObj.grade;
            break;
        }

    }

    // Write this to local storage if enabled
    if (storageEnabled) {
        storage_writeStudentData();
    }

}


// DELETE: Delete an existing student given an ID
function model_deleteStudent(id) {

    // For removing from the data structure, we'll do brute force approach for now
    for (var i = 0; i < students.length; ++i) {

        // Loop until we find a matching ID
        if (id == students[i].id) {
            students.splice(i, 1);
            break;
        }

    }

    // Write this to local storage if enabled
    if (storageEnabled) {
        storage_writeStudentData();
    }

}


// DELETE: Set the students collection to an empty array
function model_deleteAllStudents() {

    students = [];

    // Write this to local storage if enabled
    if (storageEnabled) {
        storage_removeAllStudentData();
     }

}




// View Manipulation


// Function to render grades 
function view_renderStudentGradeTable(studentGradeList) {

    if (studentGradeList.length > 0){
        studentGradeList.forEach(student => {
            tbody.append(util_returnCreatedRowItemForStudent(student));
        });
    }

   
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


// Get the input value for the name
function view_GetFooterFormNameInputValue() {
    return $("#input-name").val();
}


// Get the input value for the grade as an int 
function view_GetFooterFormGradeInputValue() {
    return parseInt($("#input-grade").val());
}


// Clear the bottom input form
function view_clearFooterInputForm() {

    $("#input-name").val("");
    $("#input-grade").val("");

}


// Toggle the display state of NAME sort caret
function view_toggleNameSortStateCaret(state) {

    view_setSortStateDirty();               // Reset sort state indicators

    if (state === 0) {
        view_setNameSortStateCaretDown();
    } else if (state === 1) {
        view_setNameSortStateCaretUp();
    }
}


// Toggle the display state of GRADE sort caret
function view_toggleGradeSortStateCaret(state) {

    view_setSortStateDirty();               // Reset sort state indicators

    if (state === 0) {
        view_setGradeSortStateCaretDown();
    } else if (state === 1) {
        view_setGradeSortStateCaretUp();
    }
}


// Set caret to a specific character for the sort NAME descending state
function view_setNameSortStateCaretDown() {
    $("#nameSortStateCaret").html(downCaret);
}


// Set caret to a specific character for the sort NAME ascending state
function view_setNameSortStateCaretUp() {
    $("#nameSortStateCaret").html(upCaret);
}


// Set caret to a specific character for the sort GRADE descending state
function view_setGradeSortStateCaretDown() {
    $("#gradeSortStateCaret").html(downCaret);
}


// Set caret to a specific character for the sort GRADE ascending state
function view_setGradeSortStateCaretUp() {
    $("#gradeSortStateCaret").html(upCaret);
}


// Set both caret to 'dirty' value to indicate it can be resorted
function view_setSortStateDirty() {

    $("#nameSortStateCaret").html(dirtyCaret);
    $("#gradeSortStateCaret").html(dirtyCaret);

}


// Set name input form to 'error' state
function view_setValidationErrorStateForNameInput() {
    $("#input-name").attr('class', 'error');
}


// Set name input form to 'default' state
function view_setValidationDefaultStateForNameInput() {
    $("#input-name").removeAttr('class', 'error');
}


// Set grade input form to 'error' state
function view_setValidationErrorStateForGradeInput() {
    $("#input-grade").attr('class', 'error');
}


// Set name input form to 'default' state
function view_setValidationDefaultStateForGradeInput() {
    $("#input-grade").removeAttr('class', 'error');
}

// Retrieve name input for a specific name
function view_getNameInputForId(id) {
    return $(`#${uniqueIDPrefix}input-name${id}`).val();
}


// Retrieve grade input for a specific id
function view_getGradeInputForId(id) {
    return $(`#${uniqueIDPrefix}input-grade${id}`).val();
}


// Set name update to 'error' state
function view_setValidationErrorStateForNameUpdate(id) {
    $(`#${uniqueIDPrefix}input-name${id}`).attr('class', 'error');
}


// Set name update to 'default' state
function view_setValidationDefaultStateForGradeUpdate(id) {
    $(`#${uniqueIDPrefix}input-grade${id}`).removeAttr('class', 'error');
}


// Set grade update to 'error' state
function view_setValidationErrorStateForGradeUpdate(id) {
    $(`#${uniqueIDPrefix}input-grade${id}`).attr('class', 'error');
}

// Set grade update to 'default' state
function view_setValidationDefaultStateForNameUpdate(id) {
    $(`#${uniqueIDPrefix}input-name${id}`).removeAttr('class', 'error');
}






// Functions called by HTML file


// [ON-CLICK] Function called by index when the footer form is used
function click_attemptAddNewRow() {

    // Get the form input
    const formInput = {
        name: view_GetFooterFormNameInputValue(),
        grade: view_GetFooterFormGradeInputValue()
    }

    if (iv_isValidInputForFooterForm(formInput)) {

        let newStudent = {
            id: startingID++,       // TODO: How are we assigning IDs?
            name: formInput.name,
            grade: formInput.grade
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

    enableEditingNameViewForStudentID(id);
    enableEditingGradeViewForStudentID(id);
    enableEditingOptionViewForStudentID(id);

}

function updateRowWithStudentID(id) {

    // Validate id
    if (iv_isValidInputForEditOfID(id)) {

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
    $(`#${uniqueIDPrefix}options${id} .on-edit-show div`).attr('class', 'is-editable');

}


// Disables editing for the specific option id
function disableEditingOptionViewForStudentID(id) {

    // Hide edit links
    $(`#${uniqueIDPrefix}options${id} .on-edit-show div`)
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

    const editContentLinks = $('<div></div>').attr('class', 'edit-content-hidden');

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
















