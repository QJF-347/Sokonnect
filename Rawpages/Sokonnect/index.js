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

window.addEventListener("scroll", ()=>{
  if(hide){
    searchContainer.classList.remove("show-search");
    cart_container.classList.remove("show-cart");
    navigation.classList.remove("show-navigation");
  }
 
})

//Adding the profile page link to the navigation in screen max-width: 500px

const mediaQuery = window.matchMedia("(max-width: 550px)");

function addUserProfileLink() {
  const userProfileLink = document.createElement("a");
  userProfileLink.href = "profile.html"; // Or your profile link
  userProfileLink.textContent = "User Profile";
  userProfileLink.classList.add("navs"); // Add the same class as other links for styling

  const hv = document.querySelector("._550px");
  hv.classList.remove("hide-div");
  // Insert the link after the last existing link.  You can change the insertion point if needed.
  navigation.appendChild(userProfileLink);
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
let nextProductId = 1;

// Function to format text with consistent spacing
function formatCartItem(quantity, productName, productPrice, productId) {
  const quantityWidth = 5; // Adjust as needed
  const nameWidth = 20;    // Adjust as needed
  const priceWidth = 10;    // Adjust as needed
  const idWidth = 5;      // Adjust as needed

  const formattedQuantity = quantity.toString().padEnd(quantityWidth);
  const formattedName = productName.padEnd(nameWidth);
  const formattedPrice = productPrice.padEnd(priceWidth);
  const formattedId = productId.toString().padEnd(idWidth);

  return `${formattedQuantity} ${formattedName} ${formattedPrice} ID:${formattedId}`;
}

// Add table header
const header = document.createElement("li");
header.textContent = formatCartItem("Qty", "Product Name", "Price($)", "ID"); // Header text
cartList.appendChild(header);


addToCartButton.forEach(button => {
  button.addEventListener("click", () => {
    const productDiv = button.closest('.product_page');
    const productName = productDiv.dataset.name;
    const productPrice = productDiv.dataset.price;

    const existingItem = Array.from(cartList.children).find(item => {
      const parts = item.textContent.match(/^(\d+)\s+(.+)\s+([\d\.]+)\s+ID:(\d+)/);
      return parts && parts[2].trim() === productName;
    });

    if (existingItem) {
      const parts = existingItem.textContent.match(/^(\d+)\s+(.+)\s+([\d\.]+)\s+ID:(\d+)/);
      if (parts) {
        let quantity = parseInt(parts[1]);
        quantity++;
        const productId = parts[4];
        existingItem.textContent = formatCartItem(quantity, productName, productPrice, productId);
      } else {
        console.error("Cart item format is invalid:", existingItem.textContent);
        cartList.removeChild(existingItem);
      }
    } else {
      const newItem = document.createElement("li");
      newItem.textContent = formatCartItem(1, productName, productPrice, nextProductId);
      cartList.appendChild(newItem);
      nextProductId++;
    }
  });
});

//The product category part in the product page

const menu1_icon = document.getElementById("menu1_icon");
const remove1_icon = document.getElementById("remove1_icon");
const category_btn = document.querySelectorAll(".category_btn");



category_btn.forEach(button => {
  remove1_icon.addEventListener("click", ()=>{
    button.classList.remove('show-category-button');
    menu1_icon.classList.remove('remove-icon-menu');
    remove1_icon.classList.remove('add-remove-icon');
  });
})

category_btn.forEach(button => {
  menu1_icon.addEventListener("click", ()=>{
    button.classList.toggle('show-category-button');
    menu1_icon.classList.add('remove-icon-menu');
    remove1_icon.classList.add('add-remove-icon');
  });
})
 
//this is for the login pages

 const buyer = document.querySelector(".buyer");
 const seller = document.querySelector(".seller");

 buyer.addEventListener("click", ()=>{
  buyer.classList.toggle("show-border");
  seller.classList.remove("show-border");
 });
 seller.addEventListener("click", ()=>{
  seller.classList.toggle("show-border");
  buyer.classList.remove("show-border");
 })


