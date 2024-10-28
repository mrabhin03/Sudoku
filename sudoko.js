 board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  function resetBoard(){
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            board[row][col]=0;
        }
    }
  }
  const questionDiv = document.getElementById('question');
  const aswerDiv = document.getElementById('answer');
  aswerDiv.style.display='none';
function inputInsert(){
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.id=row+","+col;
            input.maxLength = 1;  
            input.classList.add('cell-input');
            input.setAttribute('data-row', row);
            input.setAttribute('data-col', col);
            input.addEventListener('input', function() {
            this.value = this.value.replace(/[^1-9]/g, '');  
            });

            questionDiv.appendChild(input);
        }
    }
}
inputInsert()
async function datacalculate(){
    const notfilled = [];
    let index = 0;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
            notfilled[index] = [i, j];  
            index++;
            }
        }
    }
    if(!(await AssignNumber(notfilled,0))){
        return false;
    }else{
        await displayAnswer(notfilled)
    }

    

}
function sleep() {
    ms=20;
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function AssignNumber(notfilled,pos){
    
    if(pos>=notfilled.length){
        return true;
    }
   
    
    
    for(let i=1;i<=9;i++){
        let row=notfilled[pos][0];
        let col=notfilled[pos][1];
        if(checkExist(row,col,i)){
            themainobject=document.getElementById(row+","+col)
            themainobject.style.backgroundColor='green'
            themainobject.style.color='white'
            board[row][col]=i;
            themainobject.value=i
            await sleep();
            if( await AssignNumber(notfilled,pos+1)){
                await sleep();
                return true
            }
            board[row][col]=0;
            themainobject.value=''
            themainobject.style.backgroundColor='red'
        }
        
    }
    
    return false;
}
function checkExist(row,col,value){
    
    for(let i=0;i<9;i++){
        if(board[row][i]==value){
            return false
        }
    }
    for(let i=0;i<9;i++){
        if(board[i][col]==value){
            return false
        }
    }
    let startrow=row-row%3;
    let startcol=col-col%3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(board[i+startrow][j+startcol]==value){
                return false;
            }
        }
    }
    
    return true
}
function getdata(){
    resetBoard()
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            TheObject=document.getElementById(row+","+col);
            TheObject.style.backgroundColor='white';
            value=TheObject.value;
            if(value==''){
                
                board[row][col]=0;
            }else{
                if(!checkExist(row,col,value)){
                    TheObject.style.backgroundColor='red';
                    resetBoard();
                    return false
                }
                board[row][col]=value
            }
        }
    }
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            NObject=document.getElementById(row+","+col);
            value=NObject.value;
            if(value==''){
                NObject.style.backgroundColor='#e4e4e4';
            }
        }
    }
    datacalculate()
}
async function displayAnswer(notfilled){

    for (let row = notfilled.length-1; row >= 0; row--) {
       
            document.getElementById(notfilled[row][0]+","+notfilled[row][1]).style.backgroundColor="#e1e1e1"
            document.getElementById(notfilled[row][0]+","+notfilled[row][1]).style.color="black"
            await sleep();
    }
}
// datacalculate()