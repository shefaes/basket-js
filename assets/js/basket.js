let button;

function GetItemsfromBasket() {
    let basket = JSON.parse(localStorage.getItem('basket'));
    console.log(basket);    
    let item = '';

    basket.forEach(x => {
        item += `
        <div class="basket-box col-lg-9 d-flex align-items-center justify-content-between">
            <img src=${x.Image} alt="">
            <h6>${x.Name}</h6>
            <input type="number" value=${x.Count} min='1'>
            <p>${x.Price}</p>
            <button class='btn btn-danger'>Delete</button>
        </div>
        `
    })
    document.getElementById('basket-list').innerHTML = item
    
    button = document.querySelectorAll(".btn-danger");
}

GetItemsfromBasket();

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

 if (button){

      for(let i = 0; i<button.length; i++){
       button[i].addEventListener('click',function(){

        button[i].parentElement.remove();
       })

      }
 }

  var priceList = $('#items').find('.price');

  var totalPrice = 0;

  $.each(priceList, function(i, price){
  
  totalPrice += parseInt($(price).text())
  
  });

  $('.total_price').text(totalPrice);