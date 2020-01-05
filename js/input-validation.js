// Function called to validate the edit input for a specific id
// TODO: Refactor so that this doesn't control view
function iv_isValidInputForEditOfID(id){

     // Check name input for the respective input update
     if (validateNameInput(view_getNameInputForId(id))){
        view_setValidationDefaultStateForNameUpdate(id);         
     } else {
         view_setValidationErrorStateForNameUpdate(id);
         return false;              // Short terminate
     }
     
     // Check grade input for the respective input update
     if(validateGradeInput(view_getGradeInputForId(id))){
        view_setValidationDefaultStateForGradeUpdate(id);
    } else {
        view_setValidationErrorStateForGradeUpdate(id);
        return false;               // Short terminate
    }

    return true;

}


// Function called to validate for footer form input
function iv_isValidInputForFooterForm(input){

    // Check name input for footer form
    if (validateNameInput(input.name)){
        view_setValidationDefaultStateForNameInput();
    } else {
        view_setValidationErrorStateForNameInput();
        return false;           // Short terminate
    } 
    
    if (validateGradeInput(input.grade)){
        view_setValidationDefaultStateForGradeInput();
    } else {
        view_setValidationErrorStateForGradeInput();
        return false;           // Short terminate
    }

    return true;

}


// Basic Name validation function
function validateNameInput(input){
    
    // Check to ensure the value is not empty
    if (input === "") {
        console.error("validateNameInput FAIL: ", input);
        return false;
    } else {
        return true;   
    }

}


// Basic Grade validation function
// TODO: Refactor so that this doesn't control view
function validateGradeInput(input){

    // TODO: Alert due to specific error?
    if (isNaN(input) || input < 0 || input > 100){
        console.error("validateGradeInput FAIL: ", input);
        return false;
    } else {
        return true;
    }

}




