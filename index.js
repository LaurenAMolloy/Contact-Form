//Select Elements in the DOM
const radioDivs = document.querySelectorAll(".queryType");
const formGroups = document.querySelectorAll(".form-group");
const formElement = document.querySelector("form");
const toast = document.querySelector(".toast");
console.log(toast.classList.contains("hidden"));
let formValid = true;

formElement.setAttribute("novalidate", "");

//functions

//function to change radio buttons background
const changeRadioBg = () => {
    radioDivs.forEach((radioDiv => {
        const radio = radioDiv.querySelector("input");
        radio.checked ? 
        radio.classList.add("radio-selected") :
        radio.classList.remove("radio-selected");
    }
    ));
};

//Function to display error message
const displayError =(formGroup, error) => {
    const errorMessage = formGroup.querySelector(error);
    errorMessage.classList.remove("hidden")
};

//Function to remove error message
const removeError = (formGroup) => {
    const errorMessage = formGroup.querySelectorAll(".error");
    errorMessage.forEach(error => {
        error.classList.add("hidden")
    })
};

//Function to validate input from the user
const validateGroup = formGroup => {
    const inputType = formGroup.querySelector("input, textarea").type || "text";

    switch(inputType) {
        case "radio":
            let checked = false;
            const radioInputs = formGroup.querySelectorAll("input");

            radioInputs.forEach(input => {
                //check to see if input is checked
                if (input.checked) {
                    //if checked true
                    checked = true;
                }
            });
            //if not checked
            if(!checked) {
                //display error
                displayError(formGroup, ".error")
                formValid = false;
            }
            break;
        case "checkbox":
            const checkInput = formGroup.querySelector("input");

            if(!checkInput.checked) {
                displayError(formGroup, ".error")
                formValid: false;
            }
            break
        case "textarea":
            const textareaInput = formGroup.querySelector("textarea");

            if(textareaInput.value.trim() === "") {
                displayError(formGroup, ".error")
                formValid = false
            }
            break;
    case "email":
      const emailInput = formGroup.querySelector("input");
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (emailInput.value.trim() === "") {
        displayError(formGroup, ".empty");
        formValid = false;
      } else if (!emailPattern.test(emailInput.value)) {
        displayError(formGroup, ".valid");
        formValid = false;
      }
      break;
    default:
      break;
  }
};

//Display toast after...
const displayToast = () => {
    setTimeout(() => {
        toast.classList.remove("hidden");
    }, 100);
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 4000)
};

//Event Listeners

document.addEventListener('DOMContentLoaded', () => {
    console.log(localStorage.getItem("showToast")); // Should log "true"

    if(localStorage.getItem("showToast") === true) {
        displayToast();
        //else
        localStorage.removeItem('showToast');
    }
});

//Change Color of radio button
//remove error from radio button
radioDivs.forEach(radioDiv => {
    radioDiv.addEventListener("click", () => {
        const radioInput = radioDiv.querySelector("input");
        radioInput.checked = true;
        changeRadioBg();
        removeError(radioDiv.parentElement.parentElement)
    })
})


formElement.addEventListener("submit", event => {
    console.log("Form submission triggered");
    event.preventDefault();

    formValid = true;

    formGroups.forEach(formGroup => {
        validateGroup(formGroup);
    });
    console.log("Is form valid?", formValid);//true

    if(formValid) {
       console.log("Form submitted successfully");
       localStorage.setItem("showToast", "true");
       //show toast
       displayToast();

       // Clear the form
       formElement.reset();

       // Remove error
        formGroups.forEach(formGroup => {
        removeError(formGroup);
    });

         localStorage.removeItem("showToast");
    }
});

formGroups.forEach(formGroup => {
    const inputs = formGroup.querySelectorAll("input", "textarea")
    inputs.forEach(input => {
        input.addEventListener("click", () => {
            removeError(formGroup)
        });
        
        input.addEventListener("blur", () => {
            validateGroup(formGroup)
        });
    });
});

toast.addEventListener("click", () => {
    toast.classList.add("hidden");
  });




