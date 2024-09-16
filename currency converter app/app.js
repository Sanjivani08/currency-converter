const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");  
const fromcurr = document.querySelector(".from select"); 
const tocurr = document.querySelector(".to select"); 
const msg = document.querySelector(".msg");


const updateExchangeRate = async ()=>{
let amount = document.querySelector(".amount input"); 
    let amtVal= amount.value; 
    if(amtVal==="" || amtVal<0){
        amtVal=1; 
        amount.value="1"; 
    }

    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase() }.json`;

    let response = await fetch(URL); 
    let data = await response.json();
 
    let rate = data[tocurr.value.toLowerCse()]; 
     
    let finalAmount = amtVal*rate; 
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
}

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option"); 
        newOption.innerText = currcode; 
        newOption.value = currcode;
        select.append(newOption); 
        
        if(select.name=="From" && currcode=="USD")
            newOption.selected="selected"; 
        else if(select.name=="To" && currcode=="INR")
            newOption.selected="selected"; 
    }

    select.addEventListener("change", (evt)=>{
       updateFlag(evt.target); 
    })
};

const updateFlag = (element)=>{
    let currcode = element.value; 
    let cutcode = countryList[currcode]; 
    let newsrc =`https://flagsapi.com/${cutcode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;  
};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault(); 
    updateExchangeRate(); 
});

window.addEventListener("load" ,()=>{
updateExchangeRate(); 
})

