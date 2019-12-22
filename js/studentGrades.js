
// Sample Array of student Grades
const students = [
    {id: 0, name: 'Do', grade: 24},
    {id: 1, name: 'Rey', grade: 23},
    {id: 2, name: 'Mee', grade: 99},
    {id: 3, name: 'Fa', grade: 88},
    ];

// Maintain reference to the tBody 
const tbody = document.querySelector('#table-grades tbody');

// Maintain reference to the input form 
const tFooterNameInput = document.querySelector('#input-name');
const tFooterGradeInput = document.querySelector('#input-grade');

renderStudentGradeTable(students);








// Functions


function addNewStudentToArray(studentObj){

    students.push(studentObj);      // Add it to the actual array

    // Update view. This is the naive approach; change this later
    tbody.appendChild(returnCreatedRowItemForStudent(studentObj));


}


function attemptAddNewRow(){

// TODO: Do some form validation here as well

    let newStudent = {
        id: students.length,    // TODO: How are we assigning IDs?
        name: tFooterNameInput.value,
        grade: tFooterGradeInput.value
    }

    addNewStudentToArray(newStudent);

    // Clear input after

    tFooterNameInput.value = "";
    tFooterGradeInput.value = "";

}


// TODO: Implement edit function
function editRowWithStudentID(id){
    alert(`Editing: ${id}`);
}

function deleteRowWithStudentID(id){
    alert(`Deleting: ${id}`);
}


// Helper function that returns a new row object
function returnCreatedRowItemForStudent(student){

    const row = document.createElement('tr');   

    const colName = document.createElement('td');
    const colGrade = document.createElement('td');
    const colOptions = document.createElement('td');

    colName.textContent = student.name;
    colGrade.textContent = student.grade;

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

    // TODO: Fix this up later
    editLink.setAttribute('onclick', `editRowWithStudentID(${student.id})`);
    deleteLink.setAttribute('onclick', `deleteRowWithStudentID(${student.id})`);

    editLink.textContent = 'Edit';
    deleteLink.textContent = 'Delete';

    dropDownContent.appendChild(editLink);
    dropDownContent.appendChild(deleteLink);

    
    onHoverShow.appendChild(dropDownButton);
    onHoverShow.appendChild(dropDownContent);

    colOptions.appendChild(onHoverShow);


    row.setAttribute('id', student.id);
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