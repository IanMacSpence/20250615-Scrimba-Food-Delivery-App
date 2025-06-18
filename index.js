// you need to add the "remove" interactivity

/*** IMPORTS ***/
import { menuArray } from "/data.js";

/*** VARIABLES ***/
const orderArray = [];
let customerName = "";

/*** DOCUMENT ELEMENTS ***/
const checkoutSection = document.getElementById("checkout-section");
const checkoutItemsContainer = document.getElementById(
  "checkout-items-container"
);
const totalPriceDiv = document.getElementById("total-price");
const cardDetailsModal = document.getElementById("card-details-modal");
const thankYouMessage = document.getElementById("thank-you-message");
const customerNameSpan = document.getElementById("customer-name");

/* EVENT LISTENERS */

document.addEventListener("click", (e) => {
  // add button
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  }
  // remove button
  else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  }
  //complete order button
  else if (e.target.id === "complete-order-btn") {
    cardDetailsModal.style.display = "block";
  }
  // card details button
  else if (e.target.id === "card-details-submit-btn") {
    e.preventDefault();
    const cardForm = document.getElementById("card-form");
    customerName = cardForm.querySelector('[name="card-name-input"]').value;
    const cardNumber = cardForm.querySelector(
      '[name="card-number-input"]'
    ).value;
    const cvvInput = cardForm.querySelector('[name="card-cvv-input"]').value;
    if (customerName && cardNumber && cvvInput) {
      customerNameSpan.textContent = customerName;
      cardDetailsModal.style.display = "none";
      checkoutSection.style.display = "none";
      thankYouMessage.style.display = "flex";
    } else {
      console.log("Please enter all details");
      cardForm.reportValidity();
    }
  }
});

/* ADD ITEM TO ORDER */
function handleAddClick(menuItemId) {
  // find the relevant menu item in data.js and add it to the order array
  const selectedItem = menuArray.find((menuItem) => {
    return menuItem.id === Number(menuItemId);
  });
  // if the id exists in the orderArray, just increment the count by 1,
  // if not, add object to orderArray with count set to 1
  const existingOrder = orderArray.find(
    (item) => item.id === Number(menuItemId)
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

/* REMOVE ITEM FROM ORDER */
function handleRemoveClick(removeItemId) {
  const removeItemIndex = orderArray.findIndex(
    (item) => item.id === Number(removeItemId)
  );
  if (removeItemIndex !== -1) {
    if (orderArray[removeItemIndex].count === 1) {
      orderArray.splice(removeItemIndex, 1);
    } else {
      orderArray[removeItemIndex].count--;
    }
    renderCheckout();
  }
}

/* RENDER CHECKOUT SECTION */
function renderCheckout() {
  if (orderArray.length === 0) {
    checkoutSection.style.display = "none";
  } else {
    checkoutSection.style.display = "block";
  }
  const checkoutHtmlArray = getCheckoutHtml();
  checkoutItemsContainer.innerHTML = checkoutHtmlArray.join("");
  // Calculate total price
  const totalPrice = orderArray.reduce((sum, currentItem) => {
    return sum + currentItem.price * currentItem.count;
  }, 0);
  totalPriceDiv.textContent = `$${totalPrice}`;
}

function getCheckoutHtml() {
  return orderArray.map((orderItem) => {
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
}

/* GET THE HTML FOR MENU FROM data.js */
function getMenuHtml() {
  const menuHtmlArray = menuArray.map((menuItem) => {
    return ` <div class="item-card">
              <div class="item-graphic">${menuItem.emoji}</div>
              <div class="item-details-container">
                  <h2 class="item-title">${menuItem.name}</h2>
                  <p class="item-description">${menuItem.ingredients.join(
                    ", "
                  )}</p>
                  <p class="item-price">$${menuItem.price}</p>
              </div>
              <button class="add-btn" data-add="${menuItem.id}">+</button>
            </div>`;
  });
  return menuHtmlArray.join("");
}

/* RENDER MENU */
function renderMenu() {
  document.getElementById("menu-section").innerHTML = getMenuHtml();
}
renderMenu();
