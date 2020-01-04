// Function called to validate the edit input
// TODO: Refactor so that this doesn't control view
function isValidInputForEditOfID(id){

    const nameColElement = document.querySelector(`#${uniqueIDPrefix}${id}`).children[0].children[1];
    const gradeColElement = document.querySelector(`#${uniqueIDPrefix}${id}`).children[1].children[1];

     // Check name / grade input for footer form 
     if (validateNameInput(nameColElement) && validateGradeInput(gradeColElement)){
        return true;
    } else {
        return false;
    }

}


// Function called to validate for footer form input
function isValidInputForFooterForm(input){

    // Check name / grade input for footer  
    if (validateNameInput(input.name) && validateGradeInput(input.grade)){
        return true;
    } else {
        return false;
    }

}


// Basic Name validation function
// TODO: Refactor so that this doesn't control view
function validateNameInput(input){
    
    // Check to ensure the value is not empty
    if (input == "") {
        view_setValidationErrorStateForNameInput();
        console.error("validateNameInput FAIL: ", input);
        return false;
    } else {
        view_setValidationDefaultStateForNameInput();
        return true;   
    }

}


// Basic Grade validation function
// TODO: Refactor so that this doesn't control view
function validateGradeInput(input){

    // TODO: Alert due to specific error?
    if (isNaN(input) || input < 0 || input > 100){
        view_setValidationErrorStateForGradeInput();
        console.error("validateGradeInput FAIL: ", input);
        return false;
    } else {
        view_setValidationDefaultStateForGradeInput();          
        return true;
    }

}




