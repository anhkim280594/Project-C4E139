//fetch API
const fetchAPI = () => {
  const selectItem = document.getElementById('list-item')
  selectItem.innerHTML = ""
  const result = fetch('https://api-c4e.onrender.com/flower').then((data) => {
    const returnData = data.json().then(listItem => {
      for (let i = 0; i < listItem.length; i++) {
        const div = `
                <div class="card-item col-md-3 col-sm-6 col-xs-12">
                    <div class="product-item">
                        <div class="product-image">
                             <img src="${listItem[i].thumbnail}" alt="...">
                        </div>
                        <div class="product-bottom">
                            <h3>${listItem[i].name}</h3>
                            <span>${listItem[i].unit_price}</span>
                            <form class="variants">
                                <input class="btn add-to-cart" type="submit" action="#" onclick="addToCart('${[i]}')" value="Thêm vào giỏ hàng" />
                            </form>
                        </div>
                    </div>
                </div>
                `
        selectItem.innerHTML += div
      }
    })
  })
}
fetchAPI()


// // //add SessionStorage
function addToCart(product) {
  let cartItems = sessionStorage.getItem('cartItems');
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
  } else {
    cartItems = [];
  }
  if (!cartItems.includes(product)) {
    cartItems.push(product);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
  }
}

function removeFromCart(index) {
  let cartItems = sessionStorage.getItem('cartItems');
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    cartItems.splice(index, 1);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
  }
}
function renderCart() {
  const cart = document.getElementById('list-item-reserve');
  cart.innerHTML = '';
  const cartItems = sessionStorage.getItem('cartItems');
  if (cartItems) {
    const items = JSON.parse(cartItems);
    items.forEach((item, index) => {
      const div = document.createElement('div');



      const result = fetch('https://api-c4e.onrender.com/flower').then((data) => {
        const returnData = data.json().then(dataItem => {
          const divItem = `
            <div class="cart-reserve col-10" style="border: 1px solid #333; border-radius: 8px; margin: 5px auto;">
              <div class="product-bottom">
                  <h3>${dataItem[item].name}</h3>
                  <span>${dataItem[item].unit_price}</span>
              </div>
            </div>
            `
          div.innerHTML = divItem;
          div.className = "text-center";
          const removeButton = document.createElement('button');
          removeButton.className = "btn btn-danger"
          removeButton.textContent = 'Xóa khỏi giỏ hàng';
          const payButton = document.createElement('button');
          payButton.className = "btn btn-warning px-4"
          payButton.textContent = 'Thanh Toán';
          removeButton.onclick = function () {
            removeFromCart(index);
          };
          div.appendChild(payButton);
          div.appendChild(removeButton);
          cart.appendChild(div);
        });
      });
    });
  } else {
    console.log('No items in cart.');
  }
}
renderCart();