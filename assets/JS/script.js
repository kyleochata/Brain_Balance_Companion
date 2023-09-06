
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

    let listArr = namesList;
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

//function for creating the cards. Missing the weeks and exercise object to get passed into it:

const activityPDiv = document.querySelector('.activityPadding');
var renderCardInfo = (masterObjectList) => {
    //function for creating the first card
    let firstObject = masterObjectList.shift();
    //set a variable = object(from masteractivityList).shift() //should grab the first item in the array to pass into the 
    renderFirstCard(firstObject);
    //function for creating the rest of the cards;

}

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
}
//add event listener for the modal button to run the render name options for username select dropdown menu
