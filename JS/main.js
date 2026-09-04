const products = [

    {
        id: 1,
        name: "Hill's Science Diet",
        productName: "Chicken & Barley Recipe",
        category: "Dry Food",
        pet: "Dogs",
        price: 39.99,
        image: "Images/hills-dog-food.jpg",
        description:
            "Science-backed nutrition with balanced ingredients for healthy adult dogs."
    },

    {
        id: 2,
        name: "Weruva B.F.F.",
        productName: "Topsy Turvy Paté",
        category: "Wet Food",
        pet: "Cats",
        price: 21.48,
        image: "Images/weruva-wet-food.jpg",
        description:
            "A delicious chicken and turkey recipe served in a hydrating purée."
    },

    {
        id: 3,
        name: "World’s Best Cat Litter",
        productName: "World’s Best Cat Litter",
        category: "Litter",
        pet: "Cats",
        price: 24.99,
        image: "Images/worlds-best-litter.jpg",
        description:
            "Natural clumping litter made from whole-kernel corn with excellent odor control."
    },

    {
        id: 4,
        name: "KONG",
        productName: "Signature Bone",
        category: "Toys",
        pet: "Dogs",
        price: 7.99,
        image: "Images/kong-bone.jpg",
        description:
            "A soft and durable bone-shaped toy made for fun games of tug and fetch."
    },

    {
        id: 5,
        name: "Hill's Science Plan",
        productName: "Hill's Science Plan Chicken Dry Mix",
        category: "Dry Food",
        pet: "Cats",
        price: 34.99,
        image: "Images/hills-cat-dry-food.jpg",
        description:
            "Complete dry nutrition for adult cats made with chicken and formulated to support their everyday energy needs."
    },

    {
        id: 6,
        name: "Purina",
        productName: "Friskies Party Mix",
        category: "Treats",
        pet: "Cats",
        price: 3.49,
        image: "Images/friskies-cat-treats.jpg",
        description:
            "Crunchy cat treats made with real chicken and flavors of liver and turkey, with under 2 calories per treat."
    },

    {
        id: 7,
        name: "Purina",
        productName: "Pro Plan Chicken & Rice Entrée",
        category: "Wet Food",
        pet: "Dogs",
        price: 3.49,
        image: "Images/purina-dog-wet-food.jpg",
        description:
            "Complete and balanced wet food for adult dogs made with real chicken as the first ingredient and highly digestible rice."
    },

    {
        id: 8,
        name: "Purina",
        productName: "Beggin Bacon Treats",
        category: "Treats",
        pet: "Dogs",
        price: 5.99,
        image: "Images/beggin-dog-treats.jpg",
        description:
            "Soft dog treats made with real meat as the number one ingredient and real bacon flavor."
    }

];

const menuButton = document.getElementById("menuButton");

const navLinks = document.getElementById("navLinks");


if (menuButton && navLinks) {

    menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("show");

        }
    );

}

let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }


    const totalItems = cart.reduce(
            function (total, item) {

                return total + item.quantity;

            },
            0
        );


    cartCount.textContent = totalItems;

}

function addToCart(productId) {

    const product = products.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {
        return;
    }


    const existingProduct = cart.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

}

const featuredProducts = document.getElementById("featuredProducts");


function displayFeaturedProducts() {

    if (!featuredProducts) {
        return;
    }

    featuredProducts.innerHTML = "";

    const featured = products.slice(0, 4);

    featured.forEach(function (product) {

            const productCard =
                document.createElement("div");


            productCard.className = "home-product-card";


            productCard.innerHTML = `

                <div class="home-product-image">

                    <img
                        src="${product.image}"
                        alt="${product.productName}"
                    >

                </div>

                <span class="home-product-pet">

                    ${
                        product.pet === "Cats"
                            ? "🐱 Cats"
                            : "🐶 Dogs"
                    }

                </span>

                <h3>
                    ${product.productName}
                </h3>

                <p class="home-product-description">

                    ${product.description}

                </p>

                <div class="home-product-bottom">

                    <span class="home-product-price">

                        $${product.price.toFixed(2)}

                    </span>

                    <button
                        class="home-product-button"
                        type="button"
                        title="Add to cart"
                    >

                        <i class="fa-solid fa-cart-plus"></i>

                    </button>

                </div>

            `;


            const addButton = productCard.querySelector(".home-product-button");

            addButton.addEventListener("click", function () {

                    addToCart(product.id);

                }
            );

            featuredProducts.appendChild(
                productCard
            );

        }
    );

}

function updateLoginStatus() {
    const loginLink = document.querySelector(".login-link");
    const loginText = document.getElementById("loginText");

    if (!loginLink || !loginText) return;

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const savedName = localStorage.getItem("fullName");

    if (isLoggedIn === "true" && savedName) {
 
        loginText.textContent = "Logout";
        loginLink.href = "#";
        loginLink.onclick = function(e) {
            e.preventDefault();
            logout();
        };
    } else {
    
        loginText.textContent = "Login";
        loginLink.href = "login.html";
        loginLink.onclick = null;
    }
}

updateCartCount();

displayFeaturedProducts();

updateLoginStatus();

function logout() {

    localStorage.removeItem("isLoggedIn");

    updateLoginStatus();

    window.location.href = "index.html";
}