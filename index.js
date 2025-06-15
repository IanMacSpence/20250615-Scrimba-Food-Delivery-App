import { menuArray } from "/data.js";

/**
 * Render menu options
 * > convert the array to html
 * > render the array
 */
function getMenuHtml() {
  menuArray.forEach(function (item) {
    console.log(item);
  });
  const menuHtmlArray = menuArray.map((menuItem) => {
    return ` <div class="item-card">
              <div class="item-graphic">${menuItem.emoji}</div>
              <div class="item-details-container">
                  <h3 class="item-title">${menuItem.name}</h3>
                  <p class="item-description">${menuItem.ingredients.join(
                    ", "
                  )}</p>
                  <p class="item-price">${menuItem.price}</p>
              </div>
              <div class="add-btn">+</div>
            </div>`;
  });

  menuHtmlArray.forEach((item) => console.log(item));
  return menuHtmlArray;
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
