
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


// Function to render grades given a 
function renderStudentGradeTable(studentGradeList) {


    studentGradeList.forEach(student => {

        const row = document.createElement('tr');
        const colName = document.createElement('td');
        const colGrade = document.createElement('td');
        const colOptions = document.createElement('td');

        colName.textContent = student.name;
        colGrade.textContent = student.grade;

        row.setAttribute('studentID', student.id);
        row.appendChild(colName);
        row.appendChild(colGrade);
        row.appendChild(colOptions);

        tbody.appendChild(row);

        });



}