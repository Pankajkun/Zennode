import math

def apply_discount(cart_total, cart_quantity, cart, products):
    '''Returns the best discount applicable to the cart'''

    tiered_50_discount = None
    bulk_5_discount = None

    discounts = [
        ("flat_10_discount", 10) if cart_total > 200 else None,
        ("bulk_10_discount", cart_total * 0.1) if cart_quantity > 20 else None,
    ]

    for product, details in cart.items():

        if details["quantity"] > 10:
            temp_5_discount = details["quantity"] * products[product] * 0.05
            bulk_5_discount = temp_5_discount if bulk_5_discount is None else bulk_5_discount + temp_5_discount

        if cart_quantity > 30 and details["quantity"] > 15:
            temp_50_discount = (details["quantity"] - 15) * products[product] * 0.5
            tiered_50_discount = temp_50_discount if tiered_50_discount is None else tiered_50_discount + temp_50_discount

    discounts.append(("bulk_5_discount", bulk_5_discount))    
    discounts.append(("tiered_50_discount", tiered_50_discount))

    best_discount = max(filter(None, discounts), key=lambda x: x[1])
    return best_discount

def fun_cart():
    shipping_fee_per_package = 5
    units_per_package = 10
    products = {'A': 20, 'B': 40, 'C': 50}

    cart = {}
    total_quantity = 0
    cart_total = 0
    gift_wrap_fee = 0 

    for product, product_price in products.items():
        quantity = int(input(f"Enter the quantity of Product {product}: "))
        if quantity > 0:
            while True:
                try:
                    gift_units = int(input(f"How many units of Product {product} should be gift-wrapped? "))
                    if gift_units <= quantity:
                        break
                    else:
                        print("Invalid input: Gift units cannot exceed the quantity. Please enter a valid amount.")
                except ValueError:
                    print("Invalid input: Please enter a valid number of gift units.")
        else:
            gift_units = 0

        product_total_price = product_price * quantity
        gift_wrap_fee += gift_units * (gift_units > 0)

        cart[product] = {"quantity": quantity, "Total": product_total_price}
        total_quantity += quantity
        cart_total += product_total_price

    discount = apply_discount(cart_total, total_quantity, cart, products)
    discount_name, discount_amount = discount if discount else ("No discount", 0)

    total_shipping_fee = math.ceil(total_quantity / units_per_package) * shipping_fee_per_package

    print("\nCart Summary:")
    for product, details in cart.items():
        print(f"{product} - quantity: {details['quantity']}, Total: ${details['Total']}")

    print(f"\nSubtotal: ${cart_total}\n")

    print(f"Shipping fee: ${total_shipping_fee}")
    print(f"Gift wrap fee: ${gift_wrap_fee}\n")
    print(f"Discount applied ({discount_name}): ${discount_amount}")

    # Deduct the discount while printing the total
    print(f"\nTotal: ${cart_total + total_shipping_fee + gift_wrap_fee - discount_amount}")

fun_cart()


