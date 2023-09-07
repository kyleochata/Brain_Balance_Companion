var url = "https://sheets.googleapis.com/v4/spreadsheets/1rgaHm4qlXdKpJvU52u6LCGlUBekrUx_bhUoTWmJ8t8E/?key=AIzaSyC8CJzSaxpcbUmHFLGfUkcSqTBhckWhpp0&includeGridData=true";
const masteractivityList = [];
const namesList = [];
var state = 0;
axios.get(url)
    .then(function (response) {
        // console.log(response);
        if (masteractivityList == []) {
            getResponse(response);
        }
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

}

console.log(namesList === null);


//pull data from user list
var nameUrl = "https://sheets.googleapis.com/v4/spreadsheets/1XYp11OWdX5LIycJ07gNq6d6m13AF3ZNIhsW9xq1PKN8/?key=AIzaSyC8CJzSaxpcbUmHFLGfUkcSqTBhckWhpp0&includeGridData=true"
axios.get(nameUrl)
    .then(response => {
        getNameDateStart(response);
        renderUserNameOptions(namesList);
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
        namesList.push(nameCheck);
    }
    namesList.shift()
}


// enable hidden nav bar
document.addEventListener("DOMContentLoaded", function () {
    const nav = $("#headerTop")
    const bottomNav = $("#headerBottom")
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (lastScrollY < window.scrollY) {
            console.log(lastScrollY)
            nav.addClass("headerTop--hidden");
            bottomNav.addClass("headerBottomAfter")
            bottomNav.removeAttr("id")

        } else {
            nav.removeClass("headerTop--hidden");
            bottomNav.removeClass("headerBottomAfter");
            bottomNav.attr("id", "headerBottom")
        }
    });
});

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
        console.log(modal);
        const $target = document.getElementById(modal);
console.log($target);
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
var renderUserNameOptions = (namesList) => {

    let namesOnly = [];
    for (let i = 0; i < namesList.length; i++) {
        namesOnly.push(namesList[i].userName);
    };
    let selectNameEl = document.querySelector('#usernameSelect');
    for (let i = 0; i < namesOnly.length; i++) {
        let optionEl = document.createElement('option');
        optionEl.setAttribute('value', namesOnly[i]);
        optionEl.textContent = namesOnly[i];
        selectNameEl.appendChild(optionEl);
    }
}

// helper function to close modal
function closeModal($el) {
    $el.classList.remove('is-active');
}

// event listener for button that closes the modal for username Selection
document.getElementById('closeSelectButton').addEventListener('click', function (event) {
    const closestModal = event.target.closest('.modal');
    if (closestModal) {
        closeModal(closestModal);
    }
});

const usernameModal = document.getElementById('username-modal');

// Create a Mutation Observer
const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class' && !mutation.target.classList.contains('is-active')) {
            // Class attribute has been changed
            const targetElement = mutation.target;
            update_usernames();
        }
    }
});

// Configure the observer to watch for changes to the "class" attribute
const config = { attributes: true, attributeFilter: ['class'] };
observer.observe(usernameModal, config);

//function that will call renderfirst card and rest of cards based on weeks gathered from week modal; figure out where to call renderData so that the object API will get passed and the week selected userinput gets passed.
var renderData = (object, weeks) => {
    let firstObject = object.shift();
    renderFirstCard(firstObject);
//depending on what week selected, need to manipulate object to only include up to the selected week items.
    //if weeks=x => splice all array items after the end of the week. set at exerciseOfWeek => pass into renderRestOfCards    
//let exercisesOfWeek = 
    //renderRestOfCards()
}

//render in the first card with info from activity list API call
var renderFirstCard = (firstObject) => {
    let cardDiv = document.createElement('div');
    cardDiv. setAttribute('class', 'card activityCard column is-one-fifths');
    activityPDiv.appendChild(cardDiv);
    let cardHeader = document.createElement('div');
    cardHeader.setAttribute('class', 'card-header activityCardHeader columns');
    cardHeader.textContent = firstObject.activity;
    let madeCardDiv = document.querySelector('.activityCard');
    madeCardDiv.appendChild(cardHeader);
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-content activityContent');
    cardBody.textContent = firstObject.quantity;
    madeCardDiv.appendChild(cardBody);
    let cardFootDiv = document.createElement('div');
    cardFootDiv.setAttribute('class', 'card-footer');
    madeCardDiv.appendChild(cardFootDiv);
    let cardFootReps = document.createElement('div');
    cardFootReps.setAttribute('class', 'card-footer-item cardFooterReps');
    cardFootReps.textContent = firstObject.assignment;
    madeCardDiv.appendChild(cardFootReps);
    let cardFootBtn = document.createElement('button');
    cardFootBtn.setAttribute('class', 'card-footer-item cardFooterButton');
    cardFootBtn.textContent = 'Done!';
    madeCardDiv.appendChild(cardFootBtn);
    let madeFootBtn = document.querySelector('.cardFooterButton');
    madeFootBtn.addEventListener('click', changestyle)
}

//function loop for generating all cards after firstcard
var renderRestOfCards = (restOfObject) => {
    for (let i = 0; i < restOfObject.length; i++) {
        let cardDiv = document.createElement('div');
    cardDiv. setAttribute('class', 'card activityCard column');
    activityPDiv.appendChild(cardDiv);
    let cardHeader = document.createElement('div');
    cardHeader.setAttribute('class', 'card-header activityCardHeader columns');
    cardHeader.textContent = restOfObject.activity;
    let madeCardDiv = document.querySelector('.activityCard');
    madeCardDiv.appendChild(cardHeader);
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-content activityContent');
    cardBody.textContent = restOfObject.quantity;
    madeCardDiv.appendChild(cardBody);
    let cardFootDiv = document.createElement('div');
    cardFootDiv.setAttribute('class', 'card-footer');
    madeCardDiv.appendChild(cardFootDiv);
    let cardFootReps = document.createElement('div');
    cardFootReps.setAttribute('class', 'card-footer-item cardFooterReps');
    cardFootReps.textContent = restOfObject.assignment;
    madeCardDiv.appendChild(cardFootReps);
    let cardFootBtn = document.createElement('button');
    cardFootBtn.setAttribute('class', 'card-footer-item cardFooterButton');
    cardFootBtn.textContent = 'Done!';
    madeCardDiv.appendChild(cardFootBtn);
    let madeFootBtn = document.querySelector('.cardFooterButton');
    madeFootBtn.addEventListener('click', changestyle)
    }
}

let test = document.querySelector('.cardFooterButton');
test.addEventListener('click', changestyle)

//function to change the style of card once activity is completed by user
function changestyle() {
    let cardBody = document.querySelector('.activityContent');
    let cardRep = document.querySelector('.cardFooterReps');

    if (cardBody.style.filter == 'blur(4px)') {
        cardBody.removeAttribute('style');
    } else {
        cardBody.setAttribute('style', 'filter: blur(4px)');
    };

    if (cardRep.style.textDecoration == 'line-through') {
        cardRep.removeAttribute('style');
    } else {
        cardRep.setAttribute('style', 'text-decoration: line-through');
    };
}
// Function to change the class of the watched element
function update_usernames() {
    const name = document.getElementById('usernameSelect').value;
    const index = namesList.findIndex(user => user.userName.includes(name));
    let now = dayjs();
    let userDate;
    if (index !== -1) {
        console.log(namesList[index]);
        userDate = dayjs(namesList[index].startDate);
    } else {
        alert("no user found");
    }
    const weeksDifference = now.diff(userDate, 'week');
    document.getElementById('titleUserInfo').textContent = "User: " + name + " Weeks: " + weeksDifference
    console.log(weeksDifference);
}
