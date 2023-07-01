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
                                <input class="btn add-to-cart" type="submit" action="#" onclick="addToCart('${[i]}')" value="Mua hàng" />
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

//chặn form khi submit
const form = document.querySelectorAll(".variants");
form.addEventListener("submit", (event) => {
  event.preventDefault();
})


//add SessionStorage
function addToCart(product) {
  let cartItems = sessionStorage.getItem('cartItems');
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
  } else {
    cartItems = [];
  }
  cartItems.push(product);
  sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  renderCart();
}
function renderCart() {
  const cart = document.getElementById('list-item-reserve');
  cart.innerHTML = '';
  const cartItems = sessionStorage.getItem('cartItems');
  if (cartItems) {
    const items = JSON.parse(cartItems);
    items.forEach(item => {
      items.textContent = item;
      const result = fetch('https://api-c4e.onrender.com/flower').then((data) => {
        const returnData = data.json().then(dataItem => {
          const divItem = `
            <div class="card-item col-12">
            <div class="product-bottom">
                <h3>${dataItem[item].name}</h3>
                <span>${dataItem[item].unit_price}</span>
                <form class="variants">
                    <input class="btn add-to-cart" type="submit" action="#"  value="Xoá khỏi giỏ hàng" />
                </form>
            </div>
          </div>
            `
          cart.innerHTML += divItem
        })
      })
    });
  } else {
    console.log('No items in cart.');
  }
}
renderCart();