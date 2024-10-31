import { menuArray } from "./data.js";

function getFeedHtml() {
  let feedHtml = ``;

  menuArray.forEach(function (dish) {
    feedHtml += `
<div class="dish">
    <div class="dish-inner">
        <div>
            <p class="emoji">${dish.emoji}</p>
            <p class="name">${dish.name}</p>
            <p class="ingredients">${dish.ingredients}</p>
            <p class="price">${dish.price}</p>
            <button data-sum="${dish.id}">+</button>
        </div>            
    </div>
</div>`;
  });
  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
