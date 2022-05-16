let allCartItems=document.body.querySelectorAll('.cartSpace__item');


allCartItems.forEach(item=>{
    item.addEventListener('mouseover',()=>{
        let allColorsInItemOutPut=[];
        let allColorsInItem=document.body.querySelector('.cartItem__colors');
        allColorsInItem=allColorsInItem.childNodes;
        for (let i=1; i<=9; i=i+2){
            allColorsInItemOutPut.push(allColorsInItem[i]);
        }
        allColorsInItemOutPut.forEach(item=>{
            item.addEventListener('click',(e)=>{
                let itemInnerContent=e.target.innerHTML;
                console.log(itemInnerContent=="");
                if(itemInnerContent==""){
                    allColorsInItemOutPut.forEach(item=>{
                        item.innerHTML="";
                    })
                    e.target.innerHTML=` <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.49993 10.8001L3.69993 8.00006L2.7666 8.9334L6.49993 12.6667L14.4999 4.66673L13.5666 3.7334L6.49993 10.8001Z" fill="#F2F2F2"></path>
                    </svg>`;
                }
            })
        })
    })
})