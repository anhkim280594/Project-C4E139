//fetch API
const fetchAPI = () => {
    const selectItem = document.getElementById('list-item')
    selectItem.innerHTML = ""

    const result = fetch('https://api-c4e.onrender.com/flower').then((data) => {
        const returnData = data.json().then(listItem => {
            for (let i = 0 ; i < listItem.length; i++){
                const div = `
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="product-item">
                        <div class="product-image">
                             <img src="${listItem[i].thumbnail}" alt="...">
                        </div>
                        <div class="product-bottom">
                            <h3>${listItem[i].name}</h3>
                            <span>${listItem[i].unit_price}</span>
                            <form action="/cart/add" method="post" class="variants" enctype="multipart/form-data">
                                <input class="btn add-to-cart" type="submit" value="Mua hàng" />
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

//add SessionStorage

