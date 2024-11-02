import { menuArray } from "./data.js";

function getFeedHtml() {
  let feedHtml = ``;

  menuArray.forEach(function (dish) {
    feedHtml += `
<div class="dish">
    <p class="emoji">${dish.emoji}</p>
       <div>
          <p class="name">${dish.name}</p>
          <p class="ingredients">${dish.ingredients}</p>
          <p class="price">$${dish.price}</p>
        </div>
      <button class="btn-add" data-add="${dish.id}">+</button>
</div>
    <hr class="line">`;
  });
  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
