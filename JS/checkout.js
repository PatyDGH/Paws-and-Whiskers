const checkoutForm = document.getElementById("checkoutForm");

const checkoutContent = document.getElementById("checkoutContent");

const emptyCheckout = document.getElementById("emptyCheckout");

const checkoutItems = document.getElementById("checkoutItems");

const checkoutItemsCount = document.getElementById("checkoutItemsCount");

const checkoutSubtotal = document.getElementById("checkoutSubtotal");

const checkoutTotal = document.getElementById("checkoutTotal");

const successMessage = document.getElementById("successMessage");

const successOrderNumber = document.getElementById("successOrderNumber");

const deliveryMethods = document.querySelectorAll('input[name="delivery"]' );

const paymentMethods = document.querySelectorAll('input[name="payment"]');

const scheduledFields = document.getElementById("scheduledFields");

const deliveryDate = document.getElementById("deliveryDate");

const deliveryTime = document.getElementById("deliveryTime");

const shamCashFields = document.getElementById("shamCashFields");

const shamCashNumber = document.getElementById("shamCashNumber");

const fullName = document.getElementById("fullName");

const phone = document.getElementById("phone");

const governorate = document.getElementById("governorate");

const city = document.getElementById("city");

const street = document.getElementById("street");

const addressDetails = document.getElementById("addressDetails");

function displayCheckoutItems() {

if (!checkoutItems) {
    return;
}

checkoutItems.innerHTML = "";

if (!cart || cart.length === 0) {

    if (checkoutContent) {
        checkoutContent.classList.add(
            "hidden"
        );
    }

    if (emptyCheckout) {
        emptyCheckout.classList.remove(
            "hidden"
        );
    }

    return;
}

if (checkoutContent) {
    checkoutContent.classList.remove(
        "hidden"
    );
}

if (emptyCheckout) {
    emptyCheckout.classList.add(
        "hidden"
    );
}

let totalItems = 0;

let totalPrice = 0;

cart.forEach(function (item) {

    totalItems += item.quantity;

    totalPrice +=
        item.price *
        item.quantity;

    const itemElement =
        document.createElement("div");

    itemElement.className =
        "checkout-product";

    itemElement.innerHTML =

        '<div class="checkout-product-image">' +

            '<img' +
                ' src="' +
                    item.image +
                '"' +
                ' alt="' +
                    item.productName +
                '"' +
            '>' +

        '</div>' +

        '<div class="checkout-product-info">' +

            '<span class="checkout-product-category">' +
                item.category +
            '</span>' +

            '<h3>' +
                item.productName +
            '</h3>' +

            '<p>' +
                item.name +
            '</p>' +

        '</div>' +

        '<div class="checkout-product-quantity">' +

            "Qty: " +
            item.quantity +

        '</div>' +

        '<div class="checkout-product-price">' +

            "$" +
            (
                item.price *
                item.quantity
            ).toFixed(2) +

        '</div>';

    checkoutItems.appendChild(
        itemElement
    );
});

if (checkoutItemsCount) {

    checkoutItemsCount.textContent =
        totalItems +
        " " +
        (
            totalItems === 1
                ? "item"
                : "items"
        );
}

if (checkoutSubtotal) {

    checkoutSubtotal.textContent =
        "$" +
        totalPrice.toFixed(2);
}

if (checkoutTotal) {

    checkoutTotal.textContent =
        "$" +
        totalPrice.toFixed(2);
}


}

function updateDeliveryFields() {


let selectedDelivery = "";

deliveryMethods.forEach(
    function (radio) {

        if (radio.checked) {

            selectedDelivery =
                radio.value;
        }
    }
);

if (
    selectedDelivery ===
    "scheduled"
) {

    scheduledFields.classList.remove(
        "hidden"
    );

    deliveryDate.required =
        true;

    deliveryTime.required =
        true;

} else {

    scheduledFields.classList.add(
        "hidden"
    );

    deliveryDate.required =
        false;

    deliveryTime.required =
        false;
}


}

function updatePaymentFields() {


let selectedPayment = "";

paymentMethods.forEach(
    function (radio) {

        if (radio.checked) {

            selectedPayment =
                radio.value;
        }
    }
);

if (
    selectedPayment ===
    "shamcash"
) {

    shamCashFields.classList.remove(
        "hidden"
    );

    shamCashNumber.required =
        true;

} else {

    shamCashFields.classList.add(
        "hidden"
    );

    shamCashNumber.required =
        false;
}


}

function setMinimumDeliveryDate() {


if (!deliveryDate) {
    return;
}

const today =
    new Date();

const year =
    today.getFullYear();

const month =
    String(
        today.getMonth() + 1
    ).padStart(2, "0");

const day =
    String(
        today.getDate()
    ).padStart(2, "0");

deliveryDate.min =
    year +
    "-" +
    month +
    "-" +
    day;


}

function clearFieldError(field) {


if (!field) {
    return;
}

field.classList.remove(
    "field-error"
);


}

function showFieldError(field) {


if (!field) {
    return;
}

field.classList.add(
    "field-error"
);


}

function validateCheckout() {


let valid = true;

const requiredFields = [
    fullName,
    phone,
    governorate,
    city,
    street
];

requiredFields.forEach(
    function (field) {

        clearFieldError(field);

        if (
            field.value.trim() ===
            ""
        ) {

            showFieldError(field);

            valid = false;
        }
    }
);


const phonePattern =
    /^(09\d{8}|\+9639\d{8})$/;

clearFieldError(phone);

if (
    !phonePattern.test(
        phone.value.trim()
    )
) {

    showFieldError(phone);

    valid = false;
}


let selectedDelivery = "";

deliveryMethods.forEach(
    function (radio) {

        if (radio.checked) {

            selectedDelivery =
                radio.value;
        }
    }
);


if (
    selectedDelivery ===
    "scheduled"
) {

    clearFieldError(
        deliveryDate
    );

    clearFieldError(
        deliveryTime
    );

    if (
        deliveryDate.value ===
        ""
    ) {

        showFieldError(
            deliveryDate
        );

        valid = false;
    }

    if (
        deliveryTime.value ===
        ""
    ) {

        showFieldError(
            deliveryTime
        );

        valid = false;
    }
}


let selectedPayment = "";

paymentMethods.forEach(
    function (radio) {

        if (radio.checked) {

            selectedPayment =
                radio.value;
        }
    }
);


if (
    selectedPayment ===
    "shamcash"
) {

    clearFieldError(
        shamCashNumber
    );

    if (
        shamCashNumber.value.trim() ===
        ""
    ) {

        showFieldError(
            shamCashNumber
        );

        valid = false;
    }
}

return valid;


}

function generateOrderNumber() {


const number =
    Math.floor(
        100000 +
        Math.random() *
        900000
    );

return "PW-" + number;


}

deliveryMethods.forEach(
function (radio) {


    radio.addEventListener(
        "change",
        updateDeliveryFields
    );
}


);

paymentMethods.forEach(
function (radio) {


    radio.addEventListener(
        "change",
        updatePaymentFields
    );
}


);

const formFields =
document.querySelectorAll(
"input, select, textarea"
);

formFields.forEach(
function (field) {


    field.addEventListener(
        "input",
        function () {

            clearFieldError(
                field
            );
        }
    );

    field.addEventListener(
        "change",
        function () {

            clearFieldError(
                field
            );
        }
    );
}


);

if (checkoutForm) {


checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (
            !cart ||
            cart.length === 0
        ) {

            return;
        }

        if (
            !validateCheckout()
        ) {

            const firstError =
                document.querySelector(
                    ".field-error"
                );

            if (firstError) {

                firstError.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            return;
        }

        const orderNumber =
            generateOrderNumber();

        if (successOrderNumber) {

            successOrderNumber.textContent =
                orderNumber;
        }

        if (checkoutContent) {

            checkoutContent.classList.add(
                "hidden"
            );
        }

        if (successMessage) {

            successMessage.classList.remove(
                "hidden"
            );
        }

        cart = [];

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        updateCartCount();
    }
);

}

setMinimumDeliveryDate();

updateDeliveryFields();

updatePaymentFields();

displayCheckoutItems();