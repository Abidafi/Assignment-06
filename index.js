// Category List

const loadCategory = () => {
  const uri = "https://openapi.programming-hero.com/api/categories";

  fetch(uri)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const displayCategory = (categories) => {
  const catContainer = document.getElementById("category-container");
  catContainer.innerHTML = "";

  const gridContainer = document.createElement("div");
  gridContainer.className = "grid grid-cols-2 gap-3";

  for (let cat of categories) {
    const categoryCard = document.createElement("div");
    categoryCard.className = "col-span-2";
    categoryCard.innerHTML = `
            <button id="cat-btn-${cat.id}" onclick="loadPlants(${cat.id})" class="btn btn-categories flex justify-start font-semibold text-gray-800 w-full hover:bg-green-800 hover:text-white transition-colors duration-200">
                ${cat.category_name}
            </button>`;
    gridContainer.append(categoryCard);
  }
  catContainer.append(gridContainer);
};
loadCategory();

// Specific Category-wise Plants

const loadPlants = (id) => {
  document.getElementById("plant-container").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");

  const url = `https://openapi.programming-hero.com/api/category/${id}`;

  const catBtns = document.querySelectorAll(".btn-categories");
  catBtns.forEach((btn) => btn.classList.remove("selected"));

  const currentButton = document.getElementById(`cat-btn-${id}`);
  currentButton.classList.add("selected");

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlants(data.plants));
};

const displayPlants = (plants) => {
  const plantContainer = document.getElementById("plant-container");
  plantContainer.innerHTML = "";

  plants.forEach((plant) => {
    const plantCard = document.createElement("div");
    plantCard.innerHTML = `
            <div  
              class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <!-- Image Section -->
              <img
                src="${plant.image}"
                alt="Product Name"
                onclick="loadPlantDetails(${plant.id})"
                class="h-48 w-full object-cover food-img"
              />

              <!-- Content Section -->
              <div
              onclick="loadPlantDetails(${plant.id})" 
              class="p-3 sm:p-4 flex flex-col flex-grow">
                <!-- Category -->
                <div class="mb-2">
                  <span
                    class="text-xs font-semibold text-blue-600 uppercase tracking-wide"
                    >${plant.category}</span
                  >
                </div>

                <!-- Title -->
                <h3
                  class="text-base plant-title sm:text-lg font-bold text-gray-900 mb-2 line-clamp-1"
                >
                  ${plant.name}
                </h3>

                <!-- Description -->
                <p
                  class="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow"
                >
                  ${plant.description}
                </p>

                <!-- Price and Button Section -->
                <div
                  class="flex flex-col xs:flex-row items-start xs:items-center justify-between mt-auto gap-2"
                >
                  <!-- Price -->
                  <div class="text-base sm:text-lg font-bold text-gray-900">
                    <span 
                      class="plant-price">${plant.price}</span
                    > BDT
                  </div>
                </div>
              </div>
              <!-- Add to Cart Button -->
              <div class="px-3 sm:px-4 pb-3 sm:pb-4 flex justify-center">
                <button
                  onclick="addToCart(this)"
                  class="bg-green-600 hover:bg-green-700 text-white font-medium py-1.5 sm:py-2 rounded-md text-xs sm:text-sm transition duration-200 w-full"
                >
                    Add to Cart
                </button>
              </div>                              
            </div>
     `;
    plantContainer.appendChild(plantCard);
  });
  document.getElementById("plant-container").classList.remove("hidden");
  document.getElementById("loading-spinner").classList.add("hidden");
};

// All Plants Showcasing
const loadAllData = () => {
  const url = `https://openapi.programming-hero.com/api/plants`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlants(data.plants));
};
loadAllData();

// Plant Details with Modal

const loadPlantDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlantDetails(data.plants));
};

const displayPlantDetails = (plant) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
        <div 
            class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <!-- Image Section -->
              <img
                src="${plant.image}"
                alt="Product Name"
                class="h-80 w-full object-cover"
              />

              <!-- Content Section -->
              <div class="p-3 sm:p-4 flex flex-col flex-grow">
                <!-- Category -->
                <div class="mb-2">
                  <span
                    class="text-xs font-semibold text-blue-600 uppercase tracking-wide"
                    >${plant.category}</span
                  >
                </div>

                <!-- Title -->
                <h3
                  class="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-1"
                >
                  ${plant.name}
                </h3>

                <!-- Description -->
                <p
                  class="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow"
                >
                  ${plant.description}
                </p>

                <!-- Price and Button Section -->
                <div
                  class="flex flex-col xs:flex-row items-start xs:items-center justify-between mt-auto gap-2"
                >
                  <!-- Price -->
                  <div>
                    <span class="text-base sm:text-lg font-bold text-gray-900"
                      >${plant.price} BDT</span
                    >                  
                </div>
              </div>
            </div>
    `;
  document.getElementById("my_modal_5").showModal();
};

// Display Items & Add Price to Cart Functionality

let cart = [];
let total = 0;

const addToCart = (btn) => {
  const card = btn.parentNode.parentNode.parentNode;
  const plantTitle = card.querySelector(".plant-title").innerText;
  const plantPrice = card.querySelector(".plant-price").innerText;
  const plantPriceNum = Number(plantPrice);
  const selectedItem = {
    id: cart.length + 1,
    plantTitle: plantTitle,
    plantPrice: plantPriceNum,
  };
  cart.push(selectedItem);
  total=total+plantPriceNum;
  displayCart(cart);
  displayTotal(total);
};

const displayTotal = (val) => {
  document.getElementById("cart-total").innerHTML=val;
}

const displayCart = (cart) => {
  const plantCart = document.getElementById("cart-container");
  plantCart.innerHTML = "";

  for (let item of cart) {
    const newItem = document.createElement("div");
    newItem.innerHTML = `
    <div class="bg-white rounded-lg shadow-sm p-1 border border-gray-100 hover:shadow-md transition-shadow relative">
        <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between">
               <div class="flex-1 min-w-0">
                   <span class="hidden cart-id">${item.id}</span>
                   <h3 class="text-sm font-semibold plant-title text-gray-800 truncate">
                       ${item.plantTitle}
                   </h3>
               </div>
           </div>
           <div class="flex items-center justify-between">
               <div class="text-sm font-semibold text-black">
                <span class="item-price whitespace-nowrap">${item.plantPrice}</span> BDT
               </div>
           </div>
        </div>
  
        <!-- Delete Icon - Absolutely positioned in middle-right -->
            <button 
            onclick="removeCart(this)" class="absolute top-1/2 right-2 transform -translate-y-1/2 text-black hover:text-gray-800 transition-colors">
               <i class="fas fa-trash-alt"></i>
            </button>
    </div>
       `;
    plantCart.append(newItem);
  }
};

// Delete Product from Cart 

const removeCart = (btn) => {
    const item = btn.parentNode;
    const id = Number(item.querySelector(".cart-id").innerText);
    const plantPrice = Number(item.querySelector(".item-price").innerText);
    cart = cart.filter((item) => item.id != id);
    total = 0; 
    cart.forEach((item) => (total += item.plantPrice));
    displayCart(cart); 
    displayTotal(total); 
};
