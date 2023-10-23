const qs = (selector, scope = document) => {
  return scope.querySelector(selector);
};

// 페이지 로드시 body 객체 보이기
window.addEventListener("load", function () {
  const { body } = document;

  body.style.visibility = "visible";
  document.body.classList.remove("preload");
});

// 토글 메뉴
const toggleButton = document.getElementsByClassName("toggle")[0];
const nav = qs("nav");
let isContentVisible = localStorage.getItem("isContentVisible") === "true";

if (isContentVisible) {
  nav.classList.add("active");
}

toggleButton.addEventListener("click", function () {
  isContentVisible = !isContentVisible;
  if (isContentVisible) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }

  localStorage.setItem("isContentVisible", isContentVisible);
});
