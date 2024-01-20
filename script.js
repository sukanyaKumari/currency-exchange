const cURL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; 
const drop = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromC = document.querySelector(".from");
const toC = document.querySelector(".to");
const msg = document.querySelector(".msg")

for(let d of drop){
    for(let code in countryList){
        let newOp = document.createElement("option");
        newOp.innerText = code;
        newOp.value=code;
        if(d.name ==="from" && code ==="USD"){
            newOp.selected="selected";
        }else if(d.name ==="to" && code ==="INR"){
            newOp.selected="selected"; 
        }
        d.append(newOp);
    
    }
    d.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    });
}
const updateRate = async()=>{
    let amount = document.querySelector("form input");
   let amountVal = amount.value;
   
   if(amountVal<1 || amountVal==="" ){
    amountVal=1;
    amount.value="1"
   }
  const URL =`${cURL}/${fromC.value.toLowerCase()}/${toC.value.toLowerCase()}.json`
  let respose = await fetch(URL);
  let data = await respose.json();
  let rate = data[toC.value.toLowerCase()];
  console.log(rate);
  let totalRate = amountVal* rate;
  msg.innerText =`${amountVal} ${fromC.value} = ${totalRate} ${toC.value}`

};
const updateFlag=(element)=>{
    let code = element.value;
    let crCode = countryList[code];
    let newSrc =`https://flagsapi.com/${crCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc
}
btn.addEventListener("click",async(evt)=>{
   evt.preventDefault();
   updateRate();
});

window.addEventListener("load",()=>{
    updateRate();
})