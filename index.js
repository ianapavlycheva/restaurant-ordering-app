import { menuArray } from "./data.js";

const selectedDishes = {};

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

function getOrderSummaryHtml() {
  let orderHtml = "";
  let totalPrice = 0;

  for (const dishId in selectedDishes) {
    const dish = selectedDishes[dishId];
    const dishTotal = dish.price;
    totalPrice += dishTotal;

    orderHtml += `

      <div>
        <p>${dish.name}</p>
        <p>$${dishTotal}</p>
         <button class="btn-remove" data-remove="${dishId}">Remove</button>
      </div>`;
  }

  if (totalPrice > 0) {
    orderHtml += `
      <hr>
      <div>
        <p>Total price:></p>
        <p>$${totalPrice}</p>
      </div>`;
  }

  return orderHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
  document.getElementById("order-summary").innerHTML = getOrderSummaryHtml();
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    const dishId = e.target.dataset.add;
    const selectedDish = menuArray.find((dish) => dish.id == dishId);

    if (selectedDishes[dishId]) {
      selectedDishes[dishId].quantity++;
    } else {
      selectedDishes[dishId] = { ...selectedDish, quantity: 1 };
    }

    render();
  } else if (e.target.dataset.remove) {
    const dishId = e.target.dataset.remove;

    if (selectedDishes[dishId]) {
      selectedDishes[dishId].quantity--;

      if (selectedDishes[dishId].quantity === 0) {
        delete selectedDishes[dishId];
      }
    }

    render();
  }
});

render();
