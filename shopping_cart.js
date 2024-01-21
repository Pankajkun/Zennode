function apply_discount(cart_total, cart_quantity, cart, products) {
    let tiered_50_discount = null;
    let bulk_5_discount = null;

    let discounts = [
        cart_total > 200 ? ["flat_10_discount", 10] : null,
        cart_quantity > 20 ? ["bulk_10_discount", cart_total * 0.1] : null,
    ];

    for (let product in cart) {
        let details = cart[product];

        if (details.quantity > 10) {
            let temp_5_discount = details.quantity * products[product] * 0.05;
            bulk_5_discount = bulk_5_discount === null ? temp_5_discount : bulk_5_discount + temp_5_discount;
        }

        if (cart_quantity > 30 && details.quantity > 15) {
            let temp_50_discount = (details.quantity - 15) * products[product] * 0.5;
            tiered_50_discount = tiered_50_discount === null ? temp_50_discount : tiered_50_discount + temp_50_discount;
        }
    }

    discounts.push(["bulk_5_discount", bulk_5_discount]);
    discounts.push(["tiered_50_discount", tiered_50_discount]);

    discounts = discounts.filter(Boolean);
    let best_discount = discounts.reduce((prev, current) => (current[1] > prev[1] ? current : prev), [null, 0]);
    return best_discount;
}

function fun_cart() {
    const shipping_fee_per_package = 5;
    const units_per_package = 10;
    const products = { 'A': 20, 'B': 40, 'C': 50 };

    let cart = {};
    let total_quantity = 0;
    let cart_total = 0;
    let gift_wrap_fee = 0;

    for (let product in products) {
        let product_price = products[product];
        let quantity = parseInt(prompt(`Enter the quantity of Product ${product}: `), 10);
        let gift_units = 0;

        if (quantity > 0) {
            gift_units = parseInt(prompt(`How many units of Product ${product} should be gift-wrapped? `), 10);
            while (gift_units > quantity) {
                alert("Invalid input: Gift units cannot exceed the quantity. Please enter a valid amount.");
                gift_units = parseInt(prompt(`How many units of Product ${product} should be gift-wrapped? `), 10);
            }
        }

        let product_total_price = product_price * quantity;
        gift_wrap_fee += gift_units * (gift_units > 0 ? 1 : 0);

        cart[product] = { "quantity": quantity, "total": product_total_price };
        total_quantity += quantity;
        cart_total += product_total_price;
    }

    let [discount_name, discount_amount] = apply_discount(cart_total, total_quantity, cart, products) || ["No discount", 0];

    let total_shipping_fee = Math.ceil(total_quantity / units_per_package) * shipping_fee_per_package;

    console.log("\nCart Summary:");
    for (let product in cart) {
        let details = cart[product];
        console.log(`${product} - Quantity: ${details.quantity}, Total: $${details.total}`);
    }

    console.log(`\nSubtotal: $${cart_total}`);
    console.log(`Shipping Fee: $${total_shipping_fee}`);
    console.log(`Gift Wrap Fee: $${gift_wrap_fee}`);
    console.log(`Discount Applied (${discount_name}): -$${discount_amount}`);
    console.log(`Total: $${cart_total + total_shipping_fee + gift_wrap_fee - discount_amount}`);
}

fun_cart();

