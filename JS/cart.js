const cartContent = document.getElementById("cartContent");

const emptyCart = document.getElementById("emptyCart");

const cartItems = document.getElementById("cartItems");

const itemsCount = document.getElementById("itemsCount");

const subtotal = document.getElementById("subtotal");

const total = document.getElementById("total");

const clearCartButton = document.getElementById("clearCart");

const checkoutButton = document.getElementById("checkoutButton");

function displayCart() {

    if (!cartContent || !emptyCart || !cartItems) {
        return;
    }

    if (cart.length === 0) {

        cartContent.classList.add("hidden");

        emptyCart.classList.remove("hidden");

        return;
    }

    cartContent.classList.remove("hidden");

    emptyCart.classList.add("hidden");

    cartItems.innerHTML = "";

    const totalItems =
        cart.reduce(
            function (total, item) {

                return total + item.quantity;

            },
            0
        );

    const totalPrice =
        cart.reduce(
            function (total, item) {

                return total +
                    item.price * item.quantity;

            },
            0
        );

    if (itemsCount) {

        itemsCount.textContent = totalItems + " " + (totalItems === 1
                    ? "item"
                    : "items"
        );

    }


    if (subtotal) {

        subtotal.textContent =
            `$${totalPrice.toFixed(2)}`;

    }


    if (total) {

        total.textContent = "$" + totalPrice.toFixed(2);

    }

    cart.forEach(function (item) {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product">

                <div class="cart-image">

                    <img
                        src="${item.image}"
                        alt="${item.productName}"
                    >

                </div>


                <div class="cart-product-info">

                    <span class="cart-category">
                        ${item.category}
                    </span>

                    <h3>
                        ${item.productName}
                    </h3>

                    <p>
                        ${item.name}
                    </p>

                    <span class="cart-pet">
                        ${item.pet}
                    </span>

                </div>

            </div>


            <div class="cart-price">

                $${item.price.toFixed(2)}

            </div>


            <div class="quantity-control">

                <button
                    class="quantity-button decrease"
                    data-id="${item.id}"
                    type="button"
                >
                    −
                </button>


                <span class="quantity">

                    ${item.quantity}

                </span>


                <button
                    class="quantity-button increase"
                    data-id="${item.id}"
                    type="button"
                >
                    +
                </button>

            </div>


            <div class="cart-item-total">

                $${(
                    item.price *
                    item.quantity
                ).toFixed(2)}

            </div>


            <button
                class="remove-item"
                data-id="${item.id}"
                type="button"
                title="Remove item"
            >

                <i class="fa-solid fa-trash-can"></i>

            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    addCartButtonEvents();

}


function addCartButtonEvents() {


    const increaseButtons =
        document.querySelectorAll(
            ".increase"
        );


    const decreaseButtons =
        document.querySelectorAll(
            ".decrease"
        );


    const removeButtons =
        document.querySelectorAll(
            ".remove-item"
        );

    increaseButtons.forEach(
        function (button) {

            button.addEventListener("click", function () {

                    const productId =
                        Number(
                            button.dataset.id
                        );

                    increaseQuantity(
                        productId
                    );

                }
            );

        }
    );

    decreaseButtons.forEach(
        function (button) {

            button.addEventListener("click", function () {

                    const productId =
                        Number(
                            button.dataset.id
                        );

                    decreaseQuantity(
                        productId
                    );

                }
            );

        }
    );

    removeButtons.forEach(
        function (button) {

            button.addEventListener("click", function () {

                    const productId =
                        Number(
                            button.dataset.id
                        );

                    removeFromCart(
                        productId
                    );

                }
            );

        }
    );

}

function increaseQuantity(productId) {

    const item =
        cart.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!item) {
        return;
    }


    item.quantity++;


    saveCart();

    displayCart();

}

function decreaseQuantity(productId) {

    const item =
        cart.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!item) {
        return;
    }


    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeFromCart(productId);

        return;

    }


    saveCart();

    displayCart();

}

function removeFromCart(productId) {

    cart =
        cart.filter(
            function (item) {

                return item.id !== productId;

            }
        );


    saveCart();

    displayCart();

}

function clearCart() {

    if (cart.length === 0) {
        return;
    }


    const confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmClear) {
        return;
    }


    cart = [];


    saveCart();

    displayCart();

}


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

}

if (clearCartButton) {

    clearCartButton.addEventListener("click", clearCart);

}

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

            if (cart.length === 0) {
                return;
            }

            window.location.href =
                "checkout.html";

        }
    );

}

displayCart();