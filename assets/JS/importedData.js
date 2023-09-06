var url = "https://sheets.googleapis.com/v4/spreadsheets/1rgaHm4qlXdKpJvU52u6LCGlUBekrUx_bhUoTWmJ8t8E/?key=AIzaSyC8CJzSaxpcbUmHFLGfUkcSqTBhckWhpp0&includeGridData=true";
const masteractivityList = [];
const namesList = [];

axios.get(url)
    .then(function (response) {
        // console.log(response);
        getResponse(response);
    })
    .catch(function (error) {
        console.log(error);
    });


function getResponse(object) {

    let master = object.data.sheets[1].data[0].rowData
    let activityCol = -1
    let weekCol = -1
    let assignmentCol = -1
    let quantityCol = -1
    let notesCol = -1
    for (let i = 0; i < master.length; i++) {
        let cardInfo = {
            activity: "",
            weeks: "",
            assignment: "",
            quantity: "",
            notes: ""
        }
        for (let j = 0; j < master[0].values.length; j++) {
            let value = master[i].values[j].formattedValue
            if (value == null) {
                continue;
            }
            if (i == 0) {
                if (value.toLowerCase().trim() == 'activity') {
                    activityCol = j;
                }
                if (value.toLowerCase().trim() == 'weeks') {
                    weekCol = j;
                }
                if (value.toLowerCase().trim() == 'assignment') {
                    assignmentCol = j;
                }
                if (value.toLowerCase().trim() == 'quantity') {
                    quantityCol = j;
                }
                if (value.toLowerCase().trim() == 'coach notes:') {
                    notesCol = j;
                }
                continue;
            }
            if (j == activityCol) {
                cardInfo.activity = value;
            }
            if (j == weekCol) {
                cardInfo.weeks = value;
            }
            if (j == assignmentCol) {
                cardInfo.assignment = value;
            }
            if (j == quantityCol) {
                cardInfo.quantity = value;
            }
            if (j == notesCol) {
                cardInfo.notes = value;
            }

        }
        masteractivityList.push(cardInfo);
    }
<<<<<<< HEAD
    return masteractivityList;
=======
>>>>>>> 2c10cccffa0f1f73af28eee30146f53b53c538ce
}


//pull data from user list
var nameUrl = "https://sheets.googleapis.com/v4/spreadsheets/1XYp11OWdX5LIycJ07gNq6d6m13AF3ZNIhsW9xq1PKN8/?key=AIzaSyC8CJzSaxpcbUmHFLGfUkcSqTBhckWhpp0&includeGridData=true"
axios.get(nameUrl)
    .then(response => {
        renderUserNameOptions(response);
    })
    .catch(error => {
        console.log(error);
    })
var getNameDateStart = (nameObject) => {

    let nameMaster = nameObject.data.sheets[0].data[0].rowData;

    let namesCol = -1;
    let startCol = -1;

    for (let i = 0; i < nameMaster.length; i++) {
        let nameCheck = {
            userName: '',
            startDate: '',
        }

        for (let j = 0; j < nameMaster[0].values.length; j++) {
            let value = nameMaster[i].values[j].formattedValue;
            if (value == null) {
                continue
            }
            if (i == 0) {
                if (value.toLowerCase().trim() == 'names') {
                    namesCol = j;
                }
                if (value.toLowerCase().trim() == 'start') {
                    startCol = j;
                }
                continue;
            }
            if (j == namesCol) {
                nameCheck.userName = value;
            }
            if (j == startCol) {
                nameCheck.startDate = value;
            }
        }
<<<<<<< HEAD
        namesList.push(nameCheck);
    }

    return namesList;
}

//modal JS to pop
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeAllModals();
        }
    });
});


//When modal button gets clicked: need to add the JS from BUlma to get modal to pop up. fxn then will take all the username data from sheets and render them in as options for the select (dropdown menu) element in modal that will pop up.
var renderUserNameOptions = (response) => {

    let listArr = getNameDateStart(response);
    let  namesOnly= [];
    for (let i = 0; i < listArr.length; i++) {
        namesOnly.push(listArr[i].userName);
    };
    let selectNameEl = document.querySelector('#usernameSelect');
    for (let i = 0; i < namesOnly.length; i++) {
        let optionEl = document.createElement('option');
        optionEl.setAttribute('value', namesOnly[i]);
        optionEl.textContent = namesOnly[i];
        selectNameEl.appendChild(optionEl);
    }
}
//add event listener for the modal button to run the render name options for username select dropdown menu
const usernameBtn = document.querySelector("#username");
=======
    namesList.push(nameCheck);
    }
}

>>>>>>> 2c10cccffa0f1f73af28eee30146f53b53c538ce
