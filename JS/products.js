const productsGrid = document.getElementById("productsGrid");

const productNameInput = document.getElementById("productName");
const petFilter = document.getElementById("petFilter");
const categoryFilter = document.getElementById("categoryFilter");
const sortProducts = document.getElementById("sortProducts");

const clearFilters = document.getElementById("clearFilters");
const clearFiltersEmpty = document.getElementById("clearFiltersEmpty");

const noResults = document.getElementById("noResults");
const productsResult = document.getElementById("productsResult");

function displayProducts(productList) {

    if (!productsGrid) {
        return;
    }

    productsGrid.innerHTML = "";

    if (productList.length === 0) {
        if (noResults) {
        noResults.classList.remove("hidden");
    }

        if (productsResult) {
            productsResult.textContent = "0 products found";
        }

        return;
    }

    if (noResults) {
        noResults.classList.add("hidden");
    }

    if (productsResult) {
        productsResult.textContent = productList.length + " products found";
    }

    productList.forEach(function (product) {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `

            <div class="product-image-container">

                <img
                    src="${product.image}"
                    alt="${product.productName}"
                    class="product-image"
                >

                <span class="pet-badge">
                    ${product.pet}
                </span>

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3 class="product-brand">
                    ${product.name}
                </h3>

                <h2 class="product-name">
                    ${product.productName}
                </h2>

                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <span class="product-price">
                        $${product.price.toFixed(2)}
                    </span>

                    <button
                        class="add-to-cart"
                        data-id="${product.id}"
                    >
                        <i class="fa-solid fa-cart-plus"></i>
                        Add to Cart
                    </button>

                </div>

            </div>
        `;


        productsGrid.appendChild(productCard);

    });

    const addButtons = document.querySelectorAll(".add-to-cart");

    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId =
                Number(button.dataset.id);

            addToCart(productId);

        });

    });

}

function filterProducts() {

    let filteredProducts = [...products];

    const searchValue =
        productNameInput.value
            .trim()
            .toLowerCase();


    if (searchValue !== "") {

        filteredProducts =
            filteredProducts.filter(function (product) {

                return (
                    product.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    product.productName
                        .toLowerCase()
                        .includes(searchValue)
                );

            });

    }

    const selectedPet = petFilter.value;


    if (selectedPet !== "") {

        filteredProducts =
            filteredProducts.filter(function (product) {

                return product.pet === selectedPet;

            });

    }

    const selectedCategory = categoryFilter.value;

    if (selectedCategory !== "") {

        filteredProducts =
            filteredProducts.filter(function (product) {

                return product.category === selectedCategory;

            });

    }

    const sortValue = sortProducts.value;

    if (sortValue === "name-asc") {

        filteredProducts.sort(function (a, b) {

            return a.productName.localeCompare(
                b.productName
            );

        });

    }

    else if (sortValue === "name-desc") {

        filteredProducts.sort(function (a, b) {

            return b.productName.localeCompare(
                a.productName
            );

        });

    }

    else if (sortValue === "price-low") {

        filteredProducts.sort(function (a, b) {

            return a.price - b.price;

        });

    }

    else if (sortValue === "price-high") {

        filteredProducts.sort(function (a, b) {

            return b.price - a.price;

        });

    }

    else if (sortValue === "default") {

        filteredProducts.sort(function (a, b) {

            if (a.pet === "Cats" && b.pet === "Dogs") {
                return -1;
            }

            if (a.pet === "Dogs" && b.pet === "Cats") {
                return 1;
            }

            return a.id - b.id;

        });

    }


    displayProducts(filteredProducts);

}

function clearAllFilters() {

    productNameInput.value = "";

    petFilter.value = "";

    categoryFilter.value = "";

    sortProducts.value = "default";

    filterProducts();

}

productNameInput.addEventListener("input", filterProducts);

petFilter.addEventListener("change", filterProducts);

categoryFilter.addEventListener("change", filterProducts);

sortProducts.addEventListener("change", filterProducts);

clearFilters.addEventListener("click", clearAllFilters);

if (clearFiltersEmpty) {

    clearFiltersEmpty.addEventListener("click", clearAllFilters);

}

const urlParams =
    new URLSearchParams(window.location.search);

const petFromURL =
    urlParams.get("pet");


if (petFromURL) {

    const validPets = [
        "Cats",
        "Dogs"
    ];


    if (
        validPets.includes(petFromURL)
    ) {

        petFilter.value =
            petFromURL;

    }

}

const categoryFromURL =
    urlParams.get("category");


if (categoryFromURL) {

    const validCategories = [
        "Dry Food",
        "Wet Food",
        "Litter",
        "Toys",
        "Treats"
    ];


    if (
        validCategories.includes(categoryFromURL)
    ) {

        categoryFilter.value =
            categoryFromURL;

    }

}

filterProducts();