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
// add button
// remove button
// complete order button
// pay button
document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  } else if (e.target.id === "complete-order-btn") {
    showCardModal();
    cardDetailsModal.style.display = "block";
  } else if (e.target.id === "card-details-submit-btn") {
    e.preventDefault();
    const cardForm = document.getElementById("card-form");
    customerName = cardForm.querySelector('[name="card-name-input"]').value;
    customerNameSpan.textContent = customerName;
    cardDetailsModal.style.display = "none";
    checkoutSection.style.display = "none";
    thankYouMessage.style.display = "flex";
  }
});

/* ADD ITEM */
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

/* REMOVE ITEM */
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

/* RENDER CHECKOUT SECTION */
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
  totalPriceDiv.textContent = `$${totalPrice}`;
}

/* GET THE HTML FOR MENU FROM data.js */
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

/* RENDER MENU */
function renderMenu() {
  document.getElementById("menu-section").innerHTML = getMenuHtml();
}
renderMenu();

/* CARD DETAILS MODAL */
//- make display none by default
//- show the modal once the order button has been clicked
//- modal needs to be fixed
//- hide modal once pay now button has been clicked
//- prevent default
//- need to handle form data and save name for the ty message
function showCardModal() {
  console.log("Hi");
}

/* THANK YOU MESSAGE */
//- Once pay button is clicked, hide the card modal and show the
// thank you message using the name from the card details

/* ISSUES */
/*
 * Form needs to complain if details not entered
 */
