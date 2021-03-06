const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый - FIXED!
  $(".target").text("");
  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером - FIXED!
  $(".target").text(hits + 1);

  // FIXME: тут надо определять при первом клике firstHitTime - FIXED!
  if (hits == 0) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала - FIXED!
  $(".game-field").addClass("d-none");
  $("#start-game").addClass("d-none");
  $("#button-reload").removeClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#miss-counter").text(miss);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?

  if ($(event.target).hasClass("target")) {
    hits++;
    round();
  } else {
    miss++;
    $(event.target).addClass("miss");
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss - FIXED!
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#start-game").click(round);

  $(".game-field").click(handleClick);
  $("#button-reload").click(function () {
    location.reload();
  });
}

$(document).ready(init);
