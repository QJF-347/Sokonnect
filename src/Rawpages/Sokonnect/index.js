//this is for the menu, cart and the search buttons

 
const searchIcon = document.getElementById('search_icon');
const searchContainer = document.getElementById('search_container');

searchIcon.addEventListener('click', () => {
  searchContainer.classList.toggle('show-search');
});

//this is for the login pages 

const login_button = document.getElementById("login_button");
const remove = document.getElementById("remove");
const wrapper = document.getElementById("wrapper");
const remove2 = document.getElementById("remove2");


login_button.onclick =() => {
    wrapper.classList.toggle('show_login')
};

remove2.onclick = () =>{
  wrapper.classList.add('show_login');
};

//switching from the registration form to the login form or viceversa

const register_link = document.getElementById("register_link");
const login_link = document.getElementById("login_link");
const wrapper1 = document.querySelector(".wrapper1");

register_link.addEventListener("click", ()=>{
  wrapper1.classList.toggle('change_to_register_form');
});

login_link.addEventListener("click", ()=>{
  wrapper1.classList.remove('change_to_register_form');
}); 

