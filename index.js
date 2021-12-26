// Fetching data on initial page load

document.addEventListener("DOMContentLoaded", list);

let cont=document.getElementById("wrapper")

const input = document.getElementById("search");

let row=document.getElementById("row")

  
  //Searching debouncing for optimising api calls
  const debounce = (fn, delay, timeout = 0) => (args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(args), delay);
  }
  const onKeyup =async(e)=>{
    
    let name=e.target.value
    if(name.length>=4){
    const data=await fetchData(`https://restcountries.com/v3.1/name/${name}`)
    cards(data)}
    else{
  row.style.display="flex"
  let cardDiv=cont.querySelectorAll(".card-outer")
  if(cardDiv.length>0){
    for (i = 0; i < cardDiv.length; i++) {
      cardDiv[i].innerHTML=""
    }
  }
  
    }
    }   
  input.addEventListener("keyup", debounce(onKeyup, 500));




const fetchData=async(url)=>{
    try{
const res=await axios.get(url)
if(res.status===200) return res.data;
else{
    return null;
}
    }
    catch(err){
   console.log(err)
    }
}





async function list() {
    const data = await fetchData("https://restcountries.com/v3.1/all");
    data.forEach((item,index) => {
       
        let div = document.createElement("div");
         
        
        div.innerHTML = item.name.common.length<16?`${item.name.common}`:item.name.common.slice(0,15);
        div.className=`col-6 col-md-2 column`;
        let image=document.createElement("img")
        image.classList.add("img-responsive","img","ms-2");
        image.src=item.flags.png;
        image.style.height="4vh"
        div.append(image)
        row.append(div);
       
       
    });
   
}
// Functioning of helper text on focus and blurr
let helper=document.getElementById("helper")
input.addEventListener("focus",()=>{
  helper.style.display="block"
})
input.addEventListener("blur",()=>{
  helper.style.display="none"
})



const cards=(data)=>{
  if(data){
    row.style.display="none"
    
   let cardDiv=document.createElement("div");
   cardDiv.className="card-outer";
   cardDiv.innerHTML=`<div class="card" style="width: 18rem;">
   <img class="card-img-top" src=${data[0].flags.png} alt="Card image cap">
   <div class="card-body text-center">
     <h4 class="card-text">Name: ${data[0].name.common} </h4>
     <h6>Languages: ${Object.values(data[0].languages).toString()}</h6>
    <p>Timezone: ${data[0].timezones}</p>
    <p class="mt-0">Population: ${data[0].population}</p>
    <a href=${data[0].maps.googleMaps} target="_blank" class=" btn btn-primary text-decoration-none" > Click for directions <i style="font-size:1.5rem"
    class="fas fa-compass"></i></a>
   </div>
 </div> `
  cont.append(cardDiv)
  }
else{
  row.style.display="flex"
  let cardDiv=cont.querySelectorAll(".card-outer")
  
  for (i = 0; i < cardDiv.length; i++) {
    cardDiv[i].innerHTML=""
  }
   alert("Invalid name of the country!"); 
   
}
}







  

