//Переворот стрелки аккордеона

let titles = document.querySelectorAll(".panel-title");

titles.forEach((title) => title.addEventListener("click", Trigger));

function Trigger() {
  let accordions = document.querySelectorAll(".panel-title");
  let accordion = this.closest(".panel-title");
  if (!accordion.classList.contains("active")) {
    accordions.forEach((accordion) => accordion.classList.remove("active"));
    accordion.classList.add("active");
  } else {
    accordion.classList.remove("active");
  }
}

$(function () {
  $(".btn").click(function () {
    var $btn = $(this);
    var text = $btn.text();
    var label = $btn.data("label");

    $btn.text(label).data("label", text);
  });
});
