if(localStorage.getItem('basket') === null) {
    localStorage.setItem('basket',JSON.stringify([]))
}


function GetProducts() {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        let item = '';
        data.forEach(product => {
            item += `
            <div class="col-lg-4">
            <div id=${product.id} class="card">
              <img class="card-img-top" src=${product.image} alt="Card image cap">
              <div class="card-body">
                <h6 class="card-title">${product.title}</h6>
                <p class="card-text">${product.description.length > 20 ? product.description.slice(0,20) + "..." : product.description}</p>
                <p>${product.price} AZN</p>
                <button class="btn btn-success btn_add"><i class="fa-solid fa-basket-shopping"></i> Add to cart</button>
              </div>
            </div>
          </div>
            `
        })
        document.getElementById('list').innerHTML = item
    })
    .catch(error => console.log(error))
}
GetProducts();


function CountBasket() {
    let basket = JSON.parse(localStorage.getItem('basket'));
    if(basket.length === 0 ) {
        document.getElementById('count').style.display = 'none'
    }
    else{
        document.getElementById('count').style.display = 'block'
    }
    document.getElementById('count').innerHTML = basket.length
}

CountBasket()

let btns = document.getElementsByClassName('btn_add');

setTimeout(() => {
    for(let btn of btns) {
        btn.onclick = function(e) {
            let basket = JSON.parse(localStorage.getItem('basket'))
            let id = e.target.parentElement.parentElement.id;
            let price = e.target.previousElementSibling.innerHTML;
            let title = e.target.parentElement.children[0].innerHTML;
            let image = e.target.parentElement.previousElementSibling.src;

            let existProd = basket.find(x => x.Id == id);
            let filter = basket.filter(x => x.Id != id);

            if(existProd == undefined) {
                basket.push({
                    Id: id,
                    Name: title,
                    Price: price,
                    Image: image,
                    Count: 1
                })
            }
            else{
                existProd.Count += 1;
            }

            

            localStorage.setItem('basket',JSON.stringify(basket));
            CountBasket();
        }
    }
}, 1000);


