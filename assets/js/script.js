const arr=document.querySelectorAll('.to-cart')
for(let i =0 ;i<arr.length;i++){
    arr[i].addEventListener('click',()=>{
        const element =arr[i].parentElement.parentElement.parentElement
        let url=element.getElementsByTagName('img')[i].src
        let price= element.querySelector('.product-price').textContent
        let productName= element.querySelector('.product-name').textContent

        const obj={
            url:url,
            price:price,
            productName:productName,
        }
        saving(obj)
    });
    
}
const saving=(obj)=>{
    let array=localStorage.getItem('products')||[]
    array=JSON.parse(array)
    array.push(obj)
    const products=JSON.stringify(array)
    localStorage.setItem('products',products)
    console.log(array)
  
}
    const retFun=()=>{
        const retArr=JSON.parse(localStorage.getItem('products'))
        return retArr
    }
    function createProductCard(product) {
        return `
            <div class="product-card">
                <img src="${product.url}"alt="${product.name}">
                <h3>${product.productName}</h3>
                <p>${product.price}</p>
                
                <div class="button-group">
                    <button class="buy-now">BUY NOW</button>
                    <button class="add-to-cart">TO CART</button>
                </div>
            </div>
        `;
    }


    
