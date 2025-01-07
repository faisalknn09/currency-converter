const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");



for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from"&& currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to"&& currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}
const updateExchangeRate= async () => {
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    console.log(amtVal);
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    //api doesnt accept uppercase so convert it to lower case.
    const from=fromCurr.value.toLowerCase();
    const to=toCurr.value.toLowerCase();
    console.log(from,to);
    const URL=`${base_url}/${from}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    const rate=data[from][to];
    console.log(rate);

    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

 const updateFlag=(element) => {
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
 };
    
 btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",() => {
    updateExchangeRate();
});

