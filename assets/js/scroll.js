window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.setAttribute("data-scrolled", "true");
  } else {
    header.removeAttribute("data-scrolled");
  }
});
