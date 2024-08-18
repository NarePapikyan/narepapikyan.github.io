document.addEventListener('DOMContentLoaded', () => {
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        let cart = localStorage.getItem('cart');
        if (cart) {
            cart = JSON.parse(cart);
            if (cart.length > 0) {
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div class="cart-item-image">
                            <img src="${item.image || ''}" class="cart-item-cover">
                        </div>
                        <div class="cart-item-flex">
                            <p class="cart-item-text">${item.name}</p>
                            <div class="price_flex">
                                <p class="item_price">${item.price}</p>
                                ${item.sale === 'onSale' ? `<p class="item_price_before">${item.oldPrice || ''}</p>` : ''}
                            </div>
                            <p class="cart-item-quantity">Քանակ։ ${item.quantity}</p>
                            ${item.sale === 'onSale' ? '<input type="button" value="ԶԵՂՉ" class="cart-sale-button">' : ''}
                            <button class="remove-from-cart" data-product-id="${item.id}">ՀԵՌԱՑՆԵԼ ԶԱՄԲՅՈՒՂԻՑ</button>
                            <a href="sign in.html" class="buy-button-a">
                            <button class="buy-button">ԳՆԵԼ</button>
                            </a>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });
                console.log('Cart items displayed');
            } else {
                cartItemsContainer.innerHTML = '<p class="empty-cart">Ձեր զամբյուղը դեռ դատարկ է</p>';
                console.log('Cart is empty');
            }
        } else {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Ձեր զամբյուղը դեռ դատարկ է</p>';
            console.log('No cart found in localStorage');
        }

        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');

                let cart = localStorage.getItem('cart');
                if (cart) {
                    cart = JSON.parse(cart);
                    const updatedCart = cart.filter(item => item.id !== productId);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));

                    updateCartDisplay();
                    console.log(`Removed product with ID ${productId} from cart`);
                }
            });
        });
    }

    function addToCart(productId, productName, productPrice, productImage, productSale, productOldPrice) {
        let cart = localStorage.getItem('cart');
        if (cart) {
            cart = JSON.parse(cart);
        } else {
            cart = [];
        }

        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1,
                sale: productSale,
                oldPrice: productOldPrice
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Added ${productName} to cart`);
        showCustomAlert('ԶԱՄԲՅՈՒՂ', `${productName} արդեն զամյուղում է!`);
    }

    function showCustomAlert(title, message) {
        document.getElementById('alertTitle').innerText = title;
        document.getElementById('alertMessage').innerText = message;
        document.getElementById('customAlert').style.display = 'flex';
    }

    function closeCustomAlert() {
        document.getElementById('customAlert').style.display = 'none';
    }

    const addToCartButtons = document.querySelectorAll('.button,.berserk-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = button.getAttribute('data-product-price');
            const productImage = button.getAttribute('data-product-image');
            const productSale = button.getAttribute('data-product-sale');
            const productOldPrice = button.getAttribute('data-product-old-price');

            addToCart(productId, productName, productPrice, productImage, productSale, productOldPrice);
        });
    });

    if (window.location.pathname.endsWith('mycart.html')) {
        console.log("On mycart.html page");
        updateCartDisplay();
    }
});


 function closeCustomAlert() {
        document.getElementById('customAlert').style.display = 'none';
    }


let slideIndex = 0;

function moveSlide(n) {
  const slides = document.getElementsByClassName("slide");
  slideIndex += n;
  
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  const slideWidth = slides[0].clientWidth;
  document.querySelector(".slides").style.transform = `translateX(${-slideIndex * slideWidth}px)`;
}
