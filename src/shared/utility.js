// Contains utility function that will make reducers leaner

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
} 

// Method for checking validity of the input data that is sent by the user in form
export const checkValidity = (value, validation) => {
    let isValid = true;

    // Checking if the value received is empty or not i.e has some data or not
    // if there is some data then it will set isValid to true
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.isEmail) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
    }

    if (validation.isNumeric) {
      const pattern = /^-{0,1}\d*\.{0,1}\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    if (validation.maxLength) {
      isValid = value.length <= validation.maxLength && isValid;
    }
    return isValid;
};