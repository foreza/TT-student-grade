
// Function called to validate the edit input
// TODO: Refactor and place this function where it belongs
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

// Function called to validate for footer form input
// TODO: Refactor and place this function where it belongs
function isValidInputForFooterForm(){

    // Check name / grade input for footer  
    if (validateNameInput(tFooterNameInput) && validateGradeInput(tFooterGradeInput)){
        return true;
    } else {
        return false;
    }

}


// Basic Name validation function
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

// Basic Grade validation function
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




