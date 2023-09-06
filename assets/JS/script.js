
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
