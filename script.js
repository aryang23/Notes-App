let filterOptions=document.querySelectorAll(".filter-colors__container");
let mainContainer=document.querySelector(".main-container");
let modalContainer=document.querySelector(".modal_container");
let modalFilters = document.querySelectorAll(".modal_filters");
let addBtn=document.querySelector(".add");
let descBox=document.querySelector(".desc-box");
let colors=["lightpink","lightblue","lightgreen","black"];
// let idElem=document.querySelector(".id");
// let textElem=document.querySelector(".text");
let allTasks=document.querySelector(".allTasks");
// let ticketColor=document.querySelector(".ticket-color");
let ticketContainer=document.querySelector(".ticket")
// let allTickets=document.querySelector(".allTickets");
let removeBtn=document.querySelector(".action-container__icons.remove");
let deleteState=false;
let lockBtn=document.querySelector(".lock");
let lockState=false;
let unlockBtn=document.querySelector(".unlock");
let unlockState=false;
let ticketsArr=[];




let flag=false;
let cColor=colors[colors.length-1];

//allTasks -> allNotes
if(localStorage.getItem("allNotes"))
{
    let strArr=localStorage.getItem("allNotes");
    ticketsArr=JSON.parse(strArr);
    for(let i=0;i<ticketsArr.length;i++)
    {
        let id=ticketsArr[i][0];
        let task=ticketsArr[i][1];
        let color=ticketsArr[i][2];

        let ticketContainer=document.createElement("div");
        ticketContainer.setAttribute("class","ticker-container");

    
        ticketContainer.innerHTML=`
        <div class="ticket-color ${color}"></div>
        <div class="ticket_sub-container">
            <h3 class="ticket-id">#${id}</h3>
            <p class="task-desc" contenteditable="true">${task}</p>
        </div>
        `;

        mainContainer.appendChild(ticketContainer);
        let colorStripElement=ticketContainer.querySelector(".ticket-color");
        handleColorContainer(colorStripElement,ticketsArr[i])
        handleDeleteContainer(ticketContainer,ticketsArr);
        handleLockContainer(ticketContainer);
        handleUnlockContainer(ticketContainer);
    }
}

for(let i=0;i<filterOptions.length;i++)
{
    filterOptions[i].addEventListener("click",function(e){
        let arr=filterOptions[i].children;
        let chclassesArr=arr[0].classList;
        console.log(chclassesArr[0]);

        //Changing BGC by directly clicking on the color
        // mainContainer.style.backgroundColor=chclassesArr[0];

        let mainColor=chclassesArr[0];

        //Getting all elements with the same color that I clicked in reqArr
        let strArr=localStorage.getItem("allNotes");
        ticketsArr=JSON.parse(strArr);
        let reqArr=[];
        for(let i=0;i<ticketsArr.length;i++)
        {
            let color=ticketsArr[i][2];
            //Getting all elements in reqArr
            
            if(color==mainColor)
            {
                // mainContainer.appendChild(ticketContainer);
                reqArr.push(ticketsArr[i]);
            }
        }
        //All Elements with same color that is clicked are in reqArr


        //Clearing the UI by removing all elements
        //Here it is removed from ui because I have directly selected ticket-containenr
        //So Direct, It will gonna remove all the tasks from the main container only
        let ticketElemsArr=document.querySelectorAll(".ticker-container");
        let length=ticketElemsArr.length;
        for(let i=0;i<length;i++)
        {
            ticketElemsArr[i].remove();
        }

            
        // console.log(reqArr);
        for(let i=0;i<reqArr.length;i++)
        {
            let id=reqArr[i][0];
            let task=reqArr[i][1];
            let color=reqArr[i][2];

            let ticketContainer=document.createElement("div");
            ticketContainer.setAttribute("class","ticker-container");

            //reqArr se new tickets bnaayi
        
            ticketContainer.innerHTML=`
            <div class="ticket-color ${color}"></div>
            <div class="ticket_sub-container">
            <h3 class="ticket-id">#${id}</h3>
            <p class="task-desc">${task}</p>
            </div>
            `;

            //Direct Push those ticketContainers in mainContainer
            mainContainer.appendChild(ticketContainer);
            }
    });
}

//BEST WAY: -
//1. createTicket ko har baar use kro, as Sir used in that
//2. filterColors se direct remove, add krne ki bjaaye, css display:none krdo(BEST WAY)

addBtn.addEventListener("click",function(e){
    if(flag==false)
    {
        modalContainer.style.display="flex";
    }
    else
    {
        modalContainer.style.display="none";
    }
    flag=!flag;
    descBox.value="";
})

for(let i=0;i<modalFilters.length;i++)
{
    modalFilters[i].addEventListener("click", function (){
        modalFilters.forEach(function (modalFilter) {
            // classList remove-> 
            modalFilter.classList.remove("border");
        })
        modalFilters[i].classList.add("border");
        cColor=modalFilters[i].classList[1];
    })   
}


descBox.addEventListener("keydown", function (e) {

    if (e.key == "Enter") {
        let task = descBox.value;
        // console.log("task is ", task, "cColor ", cColor);
        // tiket create 
        // ticket create 
        //  clean up 
        createTicket(task,cColor);
        cColor = colors[colors.length - 1];
        modalContainer.style.display = "none";
        flag = false;
        descBox.value = "";
    }
})

function createTicket(task,cColor){

    let ticketContainer=document.createElement("div");
    ticketContainer.setAttribute("class","ticker-container");

    let id=uid();

    ticketContainer.innerHTML=`
    <div class="ticket-color ${cColor}"></div>
    <div class="ticket_sub-container">
        <h3 class="ticket-id">#${id}</h3>
        <p class="task-desc" contenteditable="true">${task}</p>
    </div>
    `;

    let singleArr=[id,task,cColor];
    ticketsArr.push(singleArr);
    let strArr=JSON.stringify(ticketsArr);
    localStorage.setItem("allNotes",strArr);

    mainContainer.appendChild(ticketContainer);
    let colorStripElement=ticketContainer.querySelector(".ticket-color");
    handleColorContainer(colorStripElement,singleArr);
    handleDeleteContainer(ticketContainer,singleArr);
    handleLockContainer(ticketContainer);
    handleUnlockContainer(ticketContainer);
    // deleteTicketFn(ticketContainer);
    // deleteTicket.addEventListener("click",function(){
    //     deleteState=true;
    //     deleteTicket();
    // })


}

removeBtn.addEventListener("click",function(){
    if(deleteState==false)
    {
        removeBtn.style.backgroundColor="#606060";
    }
    else
    {
        removeBtn.style.backgroundColor="rgb(85, 82, 82)";
    }
    deleteState=!deleteState;
})

lockBtn.addEventListener("click",function(){
    if(lockState==false)
    {
        lockBtn.style.backgroundColor="#606060";
    }
    else
    {
        lockBtn.style.backgroundColor="rgb(85, 82, 82)";
    }
    lockState=!lockState;
})

unlockBtn.addEventListener("click",function(){
    if(unlockState==false)
    {
        unlockBtn.style.backgroundColor="#606060";
    }
    else
    {
        unlockBtn.style.backgroundColor="rgb(85, 82, 82)";
    }
    unlockState=!unlockState;
})

function handleLockContainer(ticketContainer)
{
    ticketContainer.addEventListener("click",function(){
        if(lockState==true)
        {
            let taskDesc=ticketContainer.querySelector(".task-desc");
            taskDesc.removeAttribute("contenteditable");
        }
    })
}

function handleUnlockContainer(ticketContainer)
{
    ticketContainer.addEventListener("click",function(){
        if(unlockState==true)
        {
            let taskDesc=ticketContainer.querySelector(".task-desc");
            taskDesc.setAttribute("contenteditable","true");
        }
    })
}

function handleColorContainer(colorStripElement,ticketArr)
{
    
    // let classes=colorStripElement.getAttribute("class");
    colorStripElement.addEventListener("click",function(){
        let classes=colorStripElement.classList;
        let initColor=classes[1];

        let idx=colors.indexOf(initColor);
        let newIdx=(idx+1)%4;
        let newColor=colors[newIdx];

        colorStripElement.classList.remove(initColor);

        colorStripElement.classList.add(newColor);

        finalColorChange(newColor,ticketArr);
    })
    
}

function finalColorChange(color,singleArr)
{
    console.log("Hello");
    console.log(singleArr,"New Color",color);
    let strArr=localStorage.getItem("allNotes");
    ticketsArr=JSON.parse(strArr);
    for(let i=0;i<ticketsArr.length;i++)
    {
        console.log(ticketsArr[i],",,,,,,,",singleArr);
        if(ticketsArr[i][0]==singleArr[0])
        {
            console.log("Changing the color");
            // let initColor=singleArr[2];
            ticketsArr[i][2]=color;
            break;
        }
    }
    strArr=JSON.stringify(ticketsArr);
    localStorage.setItem("allNotes",strArr);
}

function handleDeleteContainer(ticketContainer,singleArr)
{
    ticketContainer.addEventListener("click",function(){
        if(deleteState==true)
        {
            let arr=singleArr;
            let idx=ticketsArr.indexOf(arr);
            ticketsArr.splice(idx,1);
            let strArr=JSON.stringify(ticketsArr);
            localStorage.setItem("allNotes",strArr);
            //ui
            ticketContainer.remove();
        
        }
    })
}

// function deleteTicket(ticketContainer)
// {
//     if(deleteState==true)
//     {
//         delete ticketContainer;
//     }
// }

// function deleteTicket(){

// }




// function deleteTicketFn(ticketContainer)
// {
//     deleteTicket.addEventListener("click",function(){
//         if(deleteState==true)
//         deleteState=false;
//         else
//         deleteState=true;
//     })
//     ticketContainer.addEventListener("click",function(){
//         if(deleteState==true)
//         {
//             mainContainer.remove(ticketContainer);
//         }
//     })
// }


// descBox.addEventListener("keydown",function(e){
//     if(e.key=="Enter"){
//         let task=descBox.value;
//         //ticket create
//         let taskElem=document.createElement("div");
        
//         taskElem.setAttribute("class","task");

//         let bgColorElem=document.createElement("div");
//         bgColorElem.setAttribute("class","bgcolor");
//         bgColorElem.style.backgroundColor=cColor;
//         taskElem.append(bgColorElem);

//         let idElem=document.createElement("div");
//         idElem.setAttribute("class","id");
//         idElem.innerText="#exampleId";
//         taskElem.append(idElem);

//         let textElem=document.createElement("div");
//         textElem.setAttribute("class","text");
//         textElem.innerText=task;
//         taskElem.append(textElem);

        
//         // textElem.innerText=task;
//         // taskElem.id="#exampleid";
//         allTasks.append(taskElem);
//         //clean up

        

//         cColor=colors[colors.length-1];
//         modalContainer.style.display="none";
//         flag=false;
//         descBox.value="";
//     }
// })