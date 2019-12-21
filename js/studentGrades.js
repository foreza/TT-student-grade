
// Sample Array of student Grades
const students = [
    {id: 1, name: 'Do', grade: 24},
    {id: 2, name: 'Rey', grade: 23},
    {id: 3, name: 'Mee', grade: 99},
    {id: 4, name: 'Fa', grade: 88},
    ];

// Maintain reference to the tBody 
const tbody = document.querySelector('#table-grades tbody');

renderStudentGradeTable(students);

// TODO: Implement edit function
function editRowWithStudentID(id){
    alert(`Editing: ${id}`);
}

function deleteRowWithStudentID(id){
    alert(`Deleting: ${id}`);
}


// Function to render grades given a 
function renderStudentGradeTable(studentGradeList) {


    studentGradeList.forEach(student => {

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

        tbody.appendChild(row);

        });



}