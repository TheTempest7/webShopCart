let openPoint=document.body.querySelector('.headSelect__header');

openPoint.addEventListener('click',function(){
openPoint.closest('.upSideHeader__select').classList.toggle('active');
})

let targetItems=document.body.querySelectorAll('.headSelect__body-item');

targetItems.forEach(item=>{
item.addEventListener('click',(e)=>{
    item.closest('.upSideHeader__select').classList.add('active');
    let replace=document.body.querySelector('.headSelect__header-content');
    let targetText=item.innerHTML;
    replace.innerHTML=targetText;
})
})

document.addEventListener('click',(e)=>{

if((e.target.closest('.upSideHeader__select'))){

}
else{
    openPoint.closest('.upSideHeader__select').classList.add('active');
}
})
