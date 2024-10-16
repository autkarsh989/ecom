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
    let array=localStorage.getItem('products')||'[]'
    array=JSON.parse(array)
    array.push(obj)
    alert("item added in cart")
  
    const products=JSON.stringify(array)
    localStorage.setItem('products',products)
    
}
    const retFun=()=>{
        const retArr=JSON.parse(localStorage.getItem('products'))
        return retArr
    }


// to hide and show the details(toggle)
    const toggleButtons = document.querySelectorAll('.toggle-details-p');


    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // find the parent product-card
            const productCard = button.closest('.product-card');

            
            const detailsInfo = productCard.querySelector('.product-details-info');
            detailsInfo.classList.toggle('hidden');
        });
    });

//end