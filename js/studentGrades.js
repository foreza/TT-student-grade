var students = [];                              // Student Grades Array
var tbody;                                      // Reference to the Table Body 
var tFooter;

var uniqueIDPrefix;

const baseApiURL = "http://127.0.0.1:3000/students"

const connectionErrorString = "The remote may be offline. Try again later!"

$(document).ready(function () {

    // Init 
    initializeViewConstants();

    // Fetch data from remote and render view
    model_getAllStudentData().then(() => {
        view_renderStudentGradeTable(students)
    });

});



function initializeViewConstants() {

    tbody = $("#table-grades tbody");                   // Use jQuery to select the tBody (we'll use this alot)
    tFooter = $('tfoot');                               // Get a ref to the footer so we can show/hide it to smooth things out
    uniqueIDPrefix = "student-";                        // TODO: Figure out a better way. Create some prefix. 

    // Update our jquery to support a custom put/delete:
    // http://stepansuvorov.com/blog/2014/04/jquery-put-and-delete/

    // Add a "put" and "delete" shortcut since it's already supported.
    jQuery.each(["put", "delete"], function (i, method) {


        jQuery[method] = function (url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            // GET/POST shortcuts are already supported. 
            // We'll add 2 additional dataTypes when we call put/delete.
            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });

}


// Data Model Manipulation


// GET: Get all students from the remote.
function model_getAllStudentData() {

    // TODO: Convert this to async/await
    getSampleRemoteData = new Promise(
        function (resolve, reject) {

            $.get(baseApiURL, data => {
                const newStudentsData = data.map(student => {
                    return {
                        id: student._id,
                        name: student.name,
                        grade: student.grade
                    };
                })

                resolve(newStudentsData);

            }).catch(error => {
                reject(new Error('Some error happened here: ', error));
                alert(connectionErrorString)
            });
        }).then(data => {
            if (data != null) {
                students = data;
                return (data);
            } else {
                reject(new Error('Data from remote was null'));
            }
        }
        );


    return getSampleRemoteData;

}


// GET: Get all students, but with a grade sort. Specify direction
function model_getAllStudentDataSortedByType(sortType, sortDir) {

    tFooter.css("visibility", "hidden");

    // TODO: Convert this to async/await
    getSampleRemoteDataSortedByGrade = new Promise(
        function (resolve, reject) {

            $.get(`${baseApiURL}/?sortType=${sortType}&sortDir=${sortDir}`, data => {
                const sortedStudentData = data.map(student => {
                    return {
                        id: student._id,
                        name: student.name,
                        grade: student.grade
                    };
                })

                resolve(sortedStudentData);

            }).catch(error => {
                reject(new Error('Some error happened here: ', error));
                alert(connectionErrorString)
            });
        }).then(data => {
            if (data != null) {
                students = data;
                
                view_renderStudentGradeTable(students)
                tFooter.css("visibility", "visible");
                return (data);
            } else {
                reject(new Error('Data from remote was null'));
            }
        }
        );


    return getSampleRemoteData;

}



// CREATE: Add a new student given a student object and POST it to the remote
function model_addNewStudent(studentObj) {

    postSampleRemoteData = new Promise(
        function (resolve, reject) {

            $.post(baseApiURL, studentObj, data => {
                studentObj.id = data._id;
                resolve(studentObj);
            }).catch(error => {
                reject(new Error('Some error happened here: ', error));
                alert(connectionErrorString);
            });
        }).then((studentObj) => {
            console.log(studentObj)
            students.push(studentObj);      // Add it to the actual array
        }
        );

        return postSampleRemoteData;

}



// UPDATE: Update an existing student given the student object and id for lookup, and 
function model_updateExistingStudent(studentObj, id) {

    updateSampleRemoteData = new Promise(
        function (resolve, reject) {

            $.put(`${baseApiURL}/${id}`, studentObj, data => {
                resolve();
            }).catch(error => {
                reject(new Error('Some error happened here: ', error));
                alert(connectionErrorString);
            });
        }).then(() => {
            for (var i = 0; i < students.length; ++i) {

                // Loop until we find a matching ID
                if (id == students[i].id) {
                    students[i].name = studentObj.name;
                    students[i].grade = studentObj.grade;
                }
             }           
            }
        );

        return updateSampleRemoteData;
}


// DELETE: Delete an existing student given an ID
function model_deleteStudent(id) {

    deleteRemoteData = new Promise(
        function (resolve, reject) {

            $.delete(`${baseApiURL}/${id}`, data => {
                resolve();
            }).catch(error => {
                reject(new Error('Some error happened here: ', error));
            });
        }).then(() => {
            for (var i = 0; i < students.length; ++i) {

                // Loop until we find a matching ID
                if (id == students[i].id) {
                    students.splice(i, 1);
                    break;
                }

            }
        }
        );

        return deleteRemoteData;

}



// View Manipulation


// Function to render grades 
function view_renderStudentGradeTable(studentGradeList) {

    var rowsToAppend = "";

    if (studentGradeList.length > 0) {
        studentGradeList.forEach(student => {
            const temp = util_returnCreatedRowItemForStudent(student)
            rowsToAppend += temp.html();
        });
    }
    tbody.append($(rowsToAppend));

}


// Function that will access the table body
function view_clearViewTable() {
    tbody.empty();
}


// Update the view given a student object
function view_updateViewWithNewStudent(studentObj) {
    tbody.append(util_returnCreatedRowItemForStudent(studentObj).html());
}


// Delete student from view given an id
function view_deleteStudentFromView(id) {
    $(`#${id}`).remove();
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
            id: "",
            name: formInput.name,
            grade: formInput.grade
        }

        model_addNewStudent(newStudent).then(() => {
            view_updateViewWithNewStudent(newStudent);
            view_clearFooterInputForm();
            view_setSortStateDirty();
        });
       

    } else
        alert('Unable to add new row; check to make sure the form is filled out.');
}


// [ON-CLICK] Function called by index when the row's 'delete' is clicked
function click_deleteRowWithStudentID(id) {
    model_deleteStudent(id).then(() => {
        view_deleteStudentFromView(id);
    });
}


// [ON-CLICK] Function called by index when the header for name sort is clicked
function click_sortTableByName() {

    sv_changeSortViewNameStateAndSort(); // Pass this by reference

}


// [ON-CLICK] Function called by index when the header for name sort is clicked
function click_sortTableByGrade() {

    sv_changeSortViewGradeStateAndSort();  // Pass this by reference
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
            id: id, 
            name: $(`#${uniqueIDPrefix}input-name${id}`).val(),
            grade: parseInt($(`#${uniqueIDPrefix}input-grade${id}`).val())
        }

        // Update the data model (todo: do validation here)
        model_updateExistingStudent(theStudent, id).then(() => {

            // Update the view
           view_updateViewWithModifiedStudent(theStudent, id);

           // Indicate that we may resort the data.
           view_setSortStateDirty();

           // Handle the edit view
           disableEditingNameViewForStudentID(id);
           disableEditingGradeViewForStudentID(id);
           disableEditingOptionViewForStudentID(id);
        })

       

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

    const outerWrapper = $('<div></div>');                    
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
        .attr('onclick', `click_editActionWithStudentID('${student.id}')`);

    const deleteLink = $('<a></a>')
        .text('Delete')
        .attr('href', '#')
        .attr('onclick', `click_deleteRowWithStudentID('${student.id}')`);


    dropDownContent.append(editLink, deleteLink);
    onHoverShow.append(dropDownButton, dropDownContent);

    const onEditShow = $('<div></div>').attr('class', 'on-edit-show');

    const editContentLinks = $('<div></div>').attr('class', 'edit-content-hidden');

    const saveLink = $('<a></a>')
        .text('Save')
        .attr('href', '#')
        .attr('onclick', `updateRowWithStudentID('${student.id}')`);

    const cancelLink = $('<a></a>')
        .text('Cancel')
        .attr('href', '#')
        .attr('onclick', `cancelActionWithStudentID('${student.id}')`);



    editContentLinks.append(saveLink, cancelLink);

    onEditShow.append(editContentLinks);

    colOptions.append(onHoverShow, onEditShow);

    row.attr('id', `${student.id}`);   // Use a configurable prefix
    row.append(colName, colGrade, colOptions);

    outerWrapper.append(row);

    return outerWrapper;

}
















