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
    let response = await fetch(URL);
    if (!response.ok) {
      throw new Error("API response not OK");
    }
    let data = await response.json();
    let rate =
      data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
      let finalAmount = amtVal * rate;
    msg.innerText=` ${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`
  } catch (err) {
    console.error("Error:", err);
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


