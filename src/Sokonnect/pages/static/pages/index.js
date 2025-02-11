//this is for the menu, cart and the search buttons

const searchIcon = document.getElementById("search_icon");
const searchContainer = document.getElementById("search_container");
const cart_icon = document.getElementById("cart_icon");
const cart_container = document.getElementById("cart_container");
const menu_icon = document.getElementById("menu_icon");
const navigation = document.querySelector(".navigation");
hide = false;

searchIcon.addEventListener("click", () => {
  hide = true;
  searchContainer.classList.toggle("show-search");
  cart_container.classList.remove("show-cart");
  navigation.classList.remove("show-navigation");
});

cart_icon.addEventListener("click", () => {
  hide = true;
  cart_container.classList.toggle("show-cart");
  searchContainer.classList.remove("show-search");
  navigation.classList.remove("show-navigation");
});

menu_icon.addEventListener("click", () => {
  hide = true;
  navigation.classList.toggle("show-navigation");
  searchContainer.classList.remove("show-search");
  cart_container.classList.remove("show-cart");
});

navigation.addEventListener("click", () => {
  searchContainer.classList.remove("show-search");
  cart_container.classList.remove("show-cart");
  navigation.classList.remove("show-navigation");
});

//on scroll remove the cart search or the menu bar

window.addEventListener("scroll", () => {
  if (hide) {
    searchContainer.classList.remove("show-search");
    cart_container.classList.remove("show-cart");
    navigation.classList.remove("show-navigation");
  }
});

//Adding the profile page link to the navigation in screen max-width: 500px

const mediaQuery = window.matchMedia("(max-width:550px)");

function addUserProfileLink() {
  const userProfileLink = document.createElement("a");
  userProfileLink.href = "profile.html"; // Or your profile link
  userProfileLink.textContent = "User Profile";
  userProfileLink.classList.add("navs"); // Add the same class as other links for styling

  
  // Insert the link after the last existing link.  You can change the insertion point if needed.
  navigation.appendChild(userProfileLink);
  
  const hv = document.querySelector("._550px");
  hv.classList.remove("hide-div");
}

function removeUserProfileLink() {
  const userProfileLink = navigation.querySelector('a[href="profile.html"]'); // Select by href
  if (userProfileLink) {
    navigation.removeChild(userProfileLink);
  }
  const hv = document.querySelector("._550px");
  hv.classList.add("hide-div");
}

function handleMediaQueryChange(e) {
  if (e.matches) {
    addUserProfileLink();
  } else {
    removeUserProfileLink();
  }
}

// Initial check
handleMediaQueryChange(mediaQuery);

// Listen for changes
mediaQuery.addEventListener("change", handleMediaQueryChange);

//This is for adding item to cart
const addToCartButton = document.querySelectorAll(".add-to-cart");
const cartList = document.querySelector(".cart-items ul");
const itemCostSpan = document.getElementById("item_cost");
const taxSpan = document.getElementById("tax");
const shippingCostSpan = document.getElementById("shipping_cost");
const totalCostSpan = document.getElementById("total_cost");

// Function to format text with consistent spacing
function formatCartItem(quantity, productName, productPrice, amount) {
  const quantityWidth = 5;
  const nameWidth = 20;
  const priceWidth = 10;
  const amountWidth = 10;

  const formattedQuantity = quantity.toString().padEnd(quantityWidth);
  const formattedName = productName.padEnd(nameWidth);
  const formattedPrice = productPrice.padEnd(priceWidth);
  const formattedAmount = amount.padEnd(amountWidth);

  return `${formattedQuantity} ${formattedName} ${formattedPrice} ${formattedAmount}`;
}

// Add table header
const header = document.createElement("li");
header.textContent = formatCartItem(
  "Qty",
  "Product Name",
  "Price($)",
  "Amount($)"
);
cartList.appendChild(header);

function updateTotals() {
  let itemTotal = 0;
  const cartItems = Array.from(cartList.children).slice(1); // Skip the header

  cartItems.forEach((item) => {
    const parts = item.textContent.match(
      /^(\d+)\s+(.+)\s+([\d\.]+)\s+([\d\.]+)/
    );
    if (parts) {
      itemTotal += parseFloat(parts[4]); // Add the amount to the total
    }
  });

  const tax = itemTotal * 0.002; // 0.2% tax
  const shipping = 35; // Constant shipping

  const total = itemTotal + tax + shipping;

  itemCostSpan.textContent = `$${itemTotal.toFixed(2)}`;
  taxSpan.textContent = `$${tax.toFixed(2)}`;
  shippingCostSpan.textContent = `$${shipping.toFixed(2)}`;
  totalCostSpan.textContent = `$${total.toFixed(2)}`;
}

addToCartButton.forEach((button) => {
  button.addEventListener("click", () => {
    const productDiv = button.closest(".product_page");
    const productName = productDiv.dataset.name;
    const productPrice = productDiv.dataset.price;

    const existingItem = Array.from(cartList.children).find((item) => {
      const parts = item.textContent.match(
        /^(\d+)\s+(.+)\s+([\d\.]+)\s+([\d\.]+)/
      );
      return parts && parts[2].trim() === productName;
    });

    if (existingItem) {
      const parts = existingItem.textContent.match(
        /^(\d+)\s+(.+)\s+([\d\.]+)\s+([\d\.]+)/
      );
      if (parts) {
        let quantity = parseInt(parts[1]);
        quantity++;
        const amount = (quantity * parseFloat(productPrice)).toFixed(2);
        existingItem.textContent = formatCartItem(
          quantity,
          productName,
          productPrice,
          amount
        );
      } else {
        console.error("Cart item format is invalid:", existingItem.textContent);
        cartList.removeChild(existingItem);
      }
    } else {
      const amount = (1 * parseFloat(productPrice)).toFixed(2);
      const newItem = document.createElement("li");
      newItem.textContent = formatCartItem(
        1,
        productName,
        productPrice,
        amount
      );
      cartList.appendChild(newItem);
    }

    updateTotals(); // Update totals after adding/updating items
  });
});

// Initial calculation in case there are already items in the cart (e.g., after a page refresh)
updateTotals();

//The product category part in the product page

const menu1_icon = document.getElementById("menu1_icon");
const remove1_icon = document.getElementById("remove1_icon");
const category_btn = document.querySelectorAll(".category_btn");

category_btn.forEach((button) => {
  remove1_icon.addEventListener("click", () => {
    button.classList.remove("show-category-button");
    menu1_icon.classList.remove("remove-icon-menu");
    remove1_icon.classList.remove("add-remove-icon");
  });
});

category_btn.forEach((button) => {
  menu1_icon.addEventListener("click", () => {
    button.classList.toggle("show-category-button");
    menu1_icon.classList.add("remove-icon-menu");
    remove1_icon.classList.add("add-remove-icon");
  });
});

//this is for the login pages

// This is for rating buttons "what are you "

function buse2() {
  const buyer1 = document.querySelector(".buyer1");
  const seller1 = document.querySelector(".seller1");
  buyer1.classList.toggle("show-border");
  seller1.classList.remove("show-border");
}
function buse3() {
  const buyer1 = document.querySelector(".buyer1");
  const seller1 = document.querySelector(".seller1");
  seller1.classList.toggle("show-border");
  buyer1.classList.remove("show-border");
}

function buse() {
  const buyer = document.querySelector(".buyer");
  const seller = document.querySelector(".seller");
  buyer.classList.toggle("show-border");
  seller.classList.remove("show-border");
}
function buse1() {
  const buyer = document.querySelector(".buyer");
  const seller = document.querySelector(".seller");

  seller.classList.toggle("show-border");
  buyer.classList.remove("show-border");
}
