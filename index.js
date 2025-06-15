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
  const menuHtml = menuArray.map((menuItem) => {
    return ` <div class="item-card">
                                <div class="item-pic">${menuItem.emoji}</div>
                                <div class="details-container">
                                    <h3 class="item-name">${menuItem.name}</h3>
                                    <p class="ingredients">${menuItem.ingredients.join(
                                      ", "
                                    )}</p>
                                    <p class="price">${menuItem.price}</p>
                                </div>
                                <div class="addButton">+</div>
                            </div>`;
  });

  menuHtml.forEach((item) => console.log(item));
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
