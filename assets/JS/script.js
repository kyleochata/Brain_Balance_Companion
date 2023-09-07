
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

// Youtube API Fetch
const apiKey = 'AIzaSyAvujvXXk3vxk-FOOQwnM8xz1F6Zem4Dz8';
const channelId = 'UC_1-oHAzKIzhKSl6O-RkozA';

const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=15`;
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });



//When modal button gets clicked: need to add the JS from BUlma to get modal to pop up. fxn then will take all the username data from sheets and render them in as options for the select (dropdown menu) element in modal that will pop up.
var renderUserNameOptions = () => {

    let namesOnly = [];

    for (let i=0; i < nameList.length; i++) {
        namesOnly.push(namesList[i].userName);
    };
    let selectNameEl = document.querySelector('select');
    for (let i=0; i < namesOnly.length; i++) {
        let optionEl = document.createElement('option');
        optionEl.setAttribute('value', namesOnly[i].userName);
        optionEl.textContent = namesOnly[i].userName;
        selectNameEl.appendChild(optionEl);
    }
}
var subBtn = document.querySelector('#submit');
//add event listener for the modal button to run the render name options for username select dropdown menu