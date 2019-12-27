
// Sample Array of student Grades
const students = [
    {id: 0, name: 'Do', grade: 24},
    {id: 1, name: 'Rey', grade: 23},
    {id: 2, name: 'Mee', grade: 99},
    {id: 3, name: 'AAA chan', grade: 88},
    {id: 4, name: 'aaa chen ', grade: 22},
    {id: 5, name: 'zzz', grade: 33},
    {id: 6, name: 'zed ke', grade: 44},
    {id: 7, name: 'zed kea', grade: 44},
    {id: 8, name: 'armin buu', grade: 44}
    ];

// ID uniqueifier
let startingID = students.length; // Set this to the input length for now and increment this

    
// Maintain reference to the tBody 
const tbody = document.querySelector('#table-grades tbody');

// Maintain reference to the input form 
const tFooterNameInput = document.querySelector('#input-name');
const tFooterGradeInput = document.querySelector('#input-grade');

const uniqueIDPrefix = "student-";

renderStudentGradeTable(students);




// Functions
function addNewStudentToArray(studentObj){

    students.push(studentObj);      // Add it to the actual array

    // Update view. This is the naive approach; change this later
    tbody.appendChild(returnCreatedRowItemForStudent(studentObj));


}


function attemptAddNewRow(){

    if (isValidInputForFooterForm()){
        let newStudent = {
            id: startingID++,    // TODO: How are we assigning IDs?
            name: tFooterNameInput.value,
            grade: parseInt(tFooterGradeInput.value)
        }
    
        addNewStudentToArray(newStudent);
    
        // Clear input after
    
        tFooterNameInput.value = "";
        tFooterGradeInput.value = 0;
    } else 
    alert ('Unable to add new row; check to make sure the form is filled out.');

   

}


// TODO: Implement edit function
function editActionWithStudentID(id){
    alert(`Begin editing: ${id}`);

    enableEditingNameViewForStudentID(id);
    enableEditingGradeViewForStudentID(id);
    enableEditingOptionViewForStudentID(id);


}

function updateRowWithStudentID(id){


        // If update was selected, we want to update the view 

  

        // Validate

        if (isValidInputForEditOfID(id)) {

                  // Get the dom
        const nameColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[0];
        const gradeColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[1];
        
        // Access the 2nd child which should be the input
        const nameColItemInput = nameColItem.children[1].value;
        const gradeColItemInput = gradeColItem.children[1].value;


            alert(`Updating: ${id} for ${nameColItemInput} with ${gradeColItemInput} `);

            // Update the data model (todo: do validation here)

            for (var i = 0; i <students.length; ++i){
                // Loop until we find a matching ID
                if (id == students[i].id){
                    students[i].name =  nameColItemInput;
                    students[i].grade = gradeColItemInput;
                    alert('Found id for update')
                    break;
                }

            }

            // Update the view
            nameColItem.children[0].innerHTML = nameColItemInput;
            gradeColItem.children[0].innerHTML = gradeColItemInput;

            // Set the caret to a 'dirty' value to indicate it can be resorted
            document.querySelector("#nameSortStateCaret").textContent = "*"


            // Handle the edit view
            disableEditingNameViewForStudentID(id);
            disableEditingGradeViewForStudentID(id);
            disableEditingOptionViewForStudentID(id);

    }

}

function cancelActionWithStudentID(id){
    alert(`Canceling Action for: ${id}`);

    // Handle the edit view
    disableEditingNameViewForStudentID(id);
    disableEditingGradeViewForStudentID(id);
    disableEditingOptionViewForStudentID(id);


    
}


// Editing view functions

function enableEditingNameViewForStudentID(id){

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

function enableEditingGradeViewForStudentID(id){

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

function disableEditingNameViewForStudentID(id){

    const nameColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[0];

       // Show the value
       const nameColItemVal = nameColItem.children[0];
       nameColItemVal.removeAttribute('class', 'edit-content-hidden');

       // Access and destroy the input
       const nameColItemInput = nameColItem.children[1];
       nameColItemInput.remove();


}

function disableEditingGradeViewForStudentID(id){

    const gradeColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[1];

    // Show the value
    const gradeColItemVal = gradeColItem.children[0];
    gradeColItemVal.removeAttribute('class', 'edit-content-hidden');

    // Access and destroy the input
    const gradeColItemInput = gradeColItem.children[1];
    gradeColItemInput.remove();

}

function enableEditingOptionViewForStudentID(id){
    const optionsColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[2];
    // Hide the options button
    optionsColItem.children[0].children[0].setAttribute('class','edit-content-hidden');
    // Show the edit links
    optionsColItem.children[1].children[0].setAttribute('class','is-editable');
}

function disableEditingOptionViewForStudentID(id){
    const optionsColItem = document.querySelector(`#${uniqueIDPrefix}${id}`).children[2];

    // Hide the edit links
    optionsColItem.children[1].children[0].removeAttribute('class','is-editable');
    optionsColItem.children[1].children[0].setAttribute('class','edit-content-hidden');

    // Show the options button
    optionsColItem.children[0].children[0].removeAttribute('class','is-editable');
}


function deleteRowWithStudentID(id){
    alert(`Deleting: ${id}`);

    // For removing from the data structure, we'll do brute force approach for now

    for (var i = 0; i <students.length; ++i){

        // Loop until we find a matching ID
        if (id == students[i].id){

            students.splice(i, 1);  
            alert('Found id for deletion')

            break;
        }

    }

    // Remove from the view as well TODO: Separate DOM manipulation from modifying the data model.
    document.querySelector(`#${uniqueIDPrefix}${id}`).remove();

}


// Helper function that returns a new row object
function returnCreatedRowItemForStudent(student){

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
    dropDownButton.textContent = "...";

    const dropDownContent = document.createElement('div');
    dropDownContent.setAttribute('class', 'dropdown-content');

    const editLink = document.createElement('a');
    const deleteLink = document.createElement('a');

    editLink.setAttribute('href', "#");
    deleteLink.setAttribute('href', "#");
    editLink.setAttribute('onclick', `editActionWithStudentID(${student.id})`);
    deleteLink.setAttribute('onclick', `deleteRowWithStudentID(${student.id})`);

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


// Function to render grades 
function renderStudentGradeTable(studentGradeList) {

    studentGradeList.forEach(student => {
        tbody.appendChild(returnCreatedRowItemForStudent(student));
        });

}


function isValidInputForFooterForm(){

    // Check name / grade input for footer  
    if (validateNameInput(tFooterNameInput) && validateGradeInput(tFooterGradeInput)){
        return true;
    } else {
        return false;
    }

}

function isValidInputForEditOfID(id){

    const nameColElement = document.querySelector(`#${uniqueIDPrefix}${id}`).children[0].children[1];
    const gradeColElement = document.querySelector(`#${uniqueIDPrefix}${id}`).children[1].children[1];


     // Check name /grade input for footer and 
     if (validateNameInput(nameColElement) && validateGradeInput(gradeColElement)){
        return true;
    } else {
        return false;
    }

}

// Name validation
function validateNameInput(element){
    
    // Check to ensure the value is not empty
    if (element.value != "") {
        element.removeAttribute('class', 'error');
        return true;
    } else {
        element.setAttribute('class', 'error');
        return false;   
    }

}

// Grade validation
function validateGradeInput(element){

    // TODO: Alert due to specific error?
    if (element.value != "" && element.value >= 0 && element.value <= 100){
        element.removeAttribute('class', 'error');
        return true; 
    } else {
        element.setAttribute('class', 'error');
        return false;
    }

}











