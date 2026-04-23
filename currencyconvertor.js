const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const msg = document.querySelector(".msg");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from"&&currcode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to"&&currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

    });
    
}

const updateExchangeRate = async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    try {
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    console.log("Fetching from:", URL); // Debug log
    console.log("From Currency:", fromCurr.value); // Debug log
    console.log("To Currency:", toCurr.value); // Debug log
    
    let response = await fetch(URL);
    console.log("Response Status:", response.status); // Debug log
    
    if (!response.ok) {
      console.error("Response status:", response.status, response.statusText);
      throw new Error(`API response not OK: ${response.status}`);
    }
    
    let data = await response.json();
    console.log("API Data:", data); // Debug log
    console.log("Exchange Rate Data:", data[fromCurr.value.toLowerCase()]); // Debug log
    
    let rate =
      data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log("Conversion Rate:", rate); // Debug log
    
    let finalAmount = amtVal * rate;
    console.log("Final Amount:", finalAmount); // Debug log
    
    msg.innerText=` ${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`
  } catch (err) {
    console.error("Full Error Details:", err);
    console.error("Error Message:", err.message);
    console.error("Error Stack:", err.stack);
    msg.innerText = "Error fetching exchange rate. Please try again.";
  }
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});
