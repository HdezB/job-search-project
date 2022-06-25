console.log("HDComments init");

const HDC_EL = {
    submit: document.getElementById("hdc-submit"),
    companyName: document.getElementById("hdc-company-input"),
    position: document.getElementById("hdc-position-input"),
    name: document.getElementById("hdc-name-input"),
    reactions: document.getElementsByClassName("hdc-reactions"),
};

let canSubmit = false;
let reaction = null;

//// lets you click on submit once if there is text already
function hdc_submit() {
    if (canSubmit){
        let comment = {
             companyName: HDC_EL.companyName.value.trim(),
             position: HDC_EL.position.value.trim(),
             name: HDC_EL.name.value.trim(),
             reaction: reaction,
        };
        console.log(comment);
        hdc_diable_submit();
    }
}


function hdc_can_submit () {
    //check the required fields
    let companyName = HDC_EL.companyName.value.trim();
    let position = HDC_EL.position.value.trim();
    let name = HDC_EL.name.value.trim();
    if (companyName.length > 4 && position.length > 4  && name.length > 4) {
        HDC_EL.submit.classList.add("hdc-submit-enabled");
        HDC_EL.submit.disabled = false;
        canSubmit = true;
    } else {
      hdc_diable_submit();
    }
}

// removes css elements to submit button when it does not meet amount of charatchers in fields
function hdc_diable_submit() {
    HDC_EL.submit.classList.remove("hdc-submit-enabled");
    HDC_EL.submit.disabled = true;
    canSubmit = false;
}

//// allow css elements to be enable when reactions are clicked on

function hdc_select_reaction(){
    reaction = this.getAttribute("data-reaction");
    let prev  = document.getElementsByClassName("hhdc-reactions-selected")[0];
    if (prev) {
        prev.classList.remove("hdc-reactions-selected")
    }
    this.classList.add("hdc-reactions-selected");
}


// for event listners
function hdc_set_event_listeners () {
    HDC_EL.submit.addEventListener("click", hdc_submit);
    HDC_EL.companyName.addEventListener("keyup", hdc_can_submit);
    HDC_EL.position.addEventListener("keyup", hdc_can_submit);
    HDC_EL.name.addEventListener("keyup", hdc_can_submit);   
    for (let i = 0; i < HDC_EL.reactions.length; i++){
        HDC_EL.reactions[1].addEventListener("click", hdc_select_reaction); 
    }
}

hdc_set_event_listeners();

