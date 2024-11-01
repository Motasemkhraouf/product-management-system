let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let searchbutton = document.getElementById('scbtt');
let searchgate = document.getElementById('catbutt');
let mod = 'create'
let tmp;

function getTotallly() 
{
    if (price.value !=''){
    let priceValue = parseInt(price.value) || 0;
    let taxesValue = parseInt(taxes.value) || 0;
    let adsValue = parseInt(ads.value) || 0;
    let discountValue = parseInt(discount.value) || 0;
 

    let result1 = (priceValue + taxesValue + adsValue) ;
    let result = result1 - (result1 * (discountValue/100)) ;
    total.innerHTML = result; 
    total.style.backgroundColor = '#040'; 
}
else{
    total.innerHTML='';
    total.style.backgroundColor = '#a00d02'; 
}
}


let datas;
if (localStorage.product != null)
{
    datas=JSON.parse(localStorage.product);
}
else{
    datas =[];
}

submit.onclick = function()
{
let newitem={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),

} 
if(mod=='create')
    {
    if(newitem.count > 1)
    {
for (let i=0; i<newitem.count; i++)
    {
        datas.push(newitem);
    }

}
else{
    datas.push(newitem);
}
}
else{
    datas[tmp]=newitem;
    mood='create';
    submit.innerHTML='create';
    count.style.display='block';
}

cleardata();
showdata();

localStorage.setItem('product', JSON.stringify(datas))

}

function cleardata()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    total.innerHTML='';
    category.value='';
}

function showdata() {
    let tab = '';
    
    for (let i = 0; i < datas.length; i++) {
        tab += `<tr>
                    <td>${i}</td>
                    <td>${datas[i].title}</td>
                    <td>${datas[i].price}</td>
                    <td>${datas[i].taxes}</td>
                    <td>${datas[i].ads}</td>
                    <td>${datas[i].discount}</td>
                    <td>${datas[i].total}</td>
                    <td>${datas[i].category}</td>
                    <td><button onclick="updateproduct(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteproduct(${i})" id="delete">Delete</button></td>
                </tr>`;
    
}
    document.getElementById('tbody').innerHTML = tab;
    let btn=document.getElementById('delall');
    if (datas.length >0){
btn.innerHTML=`<button onclick="deleteall()">Deleta All (${datas.length})</button>`
    }
    else{
        btn.innerHTML='';
    }
}


showdata()

function deleteproduct(i)
{
    datas.splice(i,1);
    localStorage.product=JSON.stringify(datas);
    showdata();

}
function deleteall()
{
    localStorage.clear()
    datas.splice(0)
    showdata()
}

function updateproduct(i)
{
title.value = datas[i].title;
price.value=datas[i].price;
taxes.value=datas[i].taxes;
ads.value=datas[i].ads;
discount.value=datas[i].discount;
getTotallly()
count.style.display='none';
category.value=datas[i].category;
submit.innerHTML='update';
mod='update';
tmp=i;
scroll({
    top:0, 
    behavior:'smooth',
})


}
let salomood = 'title';

function searchbyT(id)
{
    let search = document.getElementById('search');
    if(id=='scbtt')
    {
        salomood ='title';
        search.placeholder = 'search by title'

    }
    else {
        salomood='category';
        search.placeholder = 'search by category'
    }
    search.focus()
   

}

function SearchData(value)
{
    let table='';
if(salomood=='title')
{

for (let i=0; i <datas.length; i++)
{
    if (datas[i].title.includes(value.toLowerCase()))
    {
        table += `<tr>
                    <td>${i}</td>
                    <td>${datas[i].title}</td>
                    <td>${datas[i].price}</td>
                    <td>${datas[i].taxes}</td>
                    <td>${datas[i].ads}</td>
                    <td>${datas[i].discount}</td>
                    <td>${datas[i].total}</td>
                    <td>${datas[i].category}</td>
                    <td><button onclick="updateproduct(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteproduct(${i})" id="delete">Delete</button></td>
                </tr>`;
    }
}




}






else {
    for (let i=0; i <datas.length; i++)
        {
            if (datas[i].category.includes(value.toLowerCase()))
            {
                table += `<tr>
                            <td>${i}</td>
                            <td>${datas[i].title}</td>
                            <td>${datas[i].price}</td>
                            <td>${datas[i].taxes}</td>
                            <td>${datas[i].ads}</td>
                            <td>${datas[i].discount}</td>
                            <td>${datas[i].total}</td>
                            <td>${datas[i].category}</td>
                            <td><button onclick="updateproduct(${i})" id="update">Update</button></td>
                            <td><button onclick="deleteproduct(${i})" id="delete">Delete</button></td>
                        </tr>`;
            }
        }
}
document.getElementById('tbody').innerHTML = table;

}



