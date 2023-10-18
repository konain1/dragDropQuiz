
const UlList = document.querySelector('.ullist')

const check = document.getElementById('check')

const quiz = ["maradona","pele","cruyff","gullit","zidane"]

const listArr = []
let startIndex;

function create(){

    [...quiz].map((q)=>({value:q,sort:Math.random()})).sort((a,b)=>a.sort-b.sort)
    .map((a)=>a.value).forEach((item,index)=>{

        let itemLi = document.createElement('li')
        itemLi.classList.add('itemLi')
        itemLi.setAttribute('data-index',index)

        itemLi.innerHTML = `
        <span class="spanindex">${index+1} </span>
        <div class="draggable" draggable="true"> 
        
        <p>${item} </p>
        </div>
        `;
        listArr.push(itemLi)
        UlList.appendChild(itemLi)
        dragEvents()
    })

}
create()

function dragEvents(){
    let draggables = document.querySelectorAll('.draggable')
    let listLi = document.querySelectorAll('.itemLi')
    draggables.forEach((draggableDiv)=>{
        draggableDiv.addEventListener('dragstart',dragStart)
    })

    listLi.forEach((lis)=>{

        lis.addEventListener('dragenter',dragEnter);
        lis.addEventListener('dragleave',dragLeave);
        lis.addEventListener('dragover',dragOver)
        lis.addEventListener('drop',dragDrop)

    })
}

function dragStart(){
    startIndex = +this.closest('li').getAttribute('data-index')

}

function dragEnter(){
    console.log('enter')
}
function dragLeave(){
    console.log('leave')
}

function dragOver(e){
    console.log('over')
    e.preventDefault();
}

function dragDrop(){
    console.log('drop')
    let endIndex = +this.closest('li').getAttribute('data-index')
    swapIndex(startIndex,endIndex)
}

function swapIndex(start,end){
    let one = listArr[start].querySelector('.draggable')
    let two = listArr[end].querySelector('.draggable')
    console.log(one)

    listArr[start].appendChild(two)
    listArr[end].appendChild(one)



}

check.addEventListener('click',()=>{
    listArr.forEach((item,index)=>{
        let ans = listArr[index].querySelector('.draggable').innerText.trim()
        if(ans !== quiz[index]){
            item.classList.add('wrong')
        }else{
            item.classList.remove('wrong')

            item.classList.add('right')

        }
    })
    
})