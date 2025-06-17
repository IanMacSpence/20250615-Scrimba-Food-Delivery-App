// you need to add the "remove" interactivity

/*** IMPORTS ***/
import { menuArray } from "/data.js";

/*** VARIABLES ***/
const orderArray = [];
const checkoutSection = document.getElementById("checkout-section");
const checkoutItemsContainer = document.getElementById(
  "checkout-items-container"
);
const totalPriceContainer = document.getElementById("total-price-container");
const totalPriceDiv = document.getElementById("total-price");

/* EVENT LISTENERS */
document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  }
});

function handleAddClick(menuItemId) {
  // find the relevant menu item in data.js and add it to the order array
  const selectedItem = menuArray.find((menuItem) => {
    return menuItem.id === parseInt(menuItemId);
  });
  // if the id exists in the orderArray, just increment the count by 1,
  // if not, add object to orderArray with count set to 1
  const existingOrder = orderArray.find(
    (item) => item.id === parseInt(menuItemId)
  );
  if (existingOrder) {
    existingOrder.count++;
  } else {
    const orderedItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      count: 1,
    };
    orderArray.push(orderedItem);
  }
  renderCheckout();
}

function handleRemoveClick(removeItemId) {
  const removeItemIndex = orderArray.findIndex(
    (item) => item.id === parseInt(removeItemId)
  );
  if (orderArray[removeItemIndex].count === 1) {
    orderArray.splice(removeItemIndex, 1);
  } else {
    orderArray[removeItemIndex].count--;
  }
  renderCheckout();
}

function renderCheckout() {
  // If checkout container is hidden, show it
  if (orderArray.length === 0) {
    checkoutSection.style.display = "none";
  } else {
    checkoutSection.style.display = "block";
  }
  // render the orderArray as needed.
  const checkoutHtmlArray = orderArray.map((orderItem) => {
    return `<div class="checkout-item">
            <p class="checkout-item-count">${orderItem.count}</p>
            <p class="checkout-item-title">${orderItem.name}</p>
            <p class="checkout-item-remove" data-remove="${
              orderItem.id
            }">remove</p>
            <p class="checkout-item-price">$${
              orderItem.price * orderItem.count
            }</p>
          </div>`;
  });
  checkoutItemsContainer.innerHTML = checkoutHtmlArray.join("");
  // Calculate total price
  const totalPrice = orderArray.reduce((sum, currentItem) => {
    return sum + currentItem.price * currentItem.count;
  }, 0);
  // const totalPriceHtml = `<div class="total-price">$${totalPrice}</div>`;
  totalPriceDiv.textContent = `$${totalPrice}`;
}

/*** CLICK HANDLING ***/
// clicks that don't click anything
// add button
// remove button
// complete order button
// pay button

/**
 * Render menu options
 * > convert the array to html
 * > render the array
 */
function getMenuHtml() {
  const menuHtmlArray = menuArray.map((menuItem) => {
    return ` <div class="item-card">
              <div class="item-graphic">${menuItem.emoji}</div>
              <div class="item-details-container">
                  <h3 class="item-title">${menuItem.name}</h3>
                  <p class="item-description">${menuItem.ingredients.join(
                    ", "
                  )}</p>
                  <p class="item-price">$${menuItem.price}</p>
              </div>
              <div class="add-btn" data-add="${menuItem.id}">+</div>
            </div>`;
  });
  return menuHtmlArray.join("");
}

/* Attach the array to the parent */
function render() {
  document.getElementById("menu-section").innerHTML = getMenuHtml();
}
render();
/**
 * {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: 0,
        price: 14,
        emoji: "🍕"
    },
 */
