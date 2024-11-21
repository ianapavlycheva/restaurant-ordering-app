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

  if (Object.keys(selectedDishes).length > 0) {
    orderHtml += `<h3>Your order</h3>`;
  }

  for (const dishId in selectedDishes) {
    const dish = selectedDishes[dishId];
    const dishTotal = dish.price;
    totalPrice += dishTotal;

    orderHtml += `

      <div>
        <span>${dish.name}</span>
        <button class="btn-remove" data-remove="${dishId}">Remove</button>
        <span>$${dishTotal}</span>

      </div>`;
  }

  if (totalPrice > 0) {
    orderHtml += `
      <hr>
      <div>
        <span>Total price:</span>
        <span>$${totalPrice}</span>
        <button class="btn-complete">Complete order</button>
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
  } else if (e.target.classList.contains("btn-complete")) {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  } else if (e.target.classList.contains("modal-btn")) {
    e.preventDefault();
    const nameInput = document.querySelector('input[name="fullName"]').value;
    const modal = document.querySelector(".modal");
    modal.style.display = "none";

    const thanksMessage = document.getElementById("thanks-message");
    thanksMessage.textContent = `Thanks, ${nameInput}!`;
    thanksMessage.style.display = "block";
  }
});

render();
