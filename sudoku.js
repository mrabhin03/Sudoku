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
//   for(i=0;i<=200000;i++){
//     let j = Math.pow(10, Math.floor(Math.log10(i)))/10;
//     if(i%j!=0){
//         console.log(i)
//     }
//   }

  function resetBoard(){
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            board[row][col]=0;        }
    }
  }
  var Reset=true;
  var work=true;
  var count=0;
  function resetall(){
    count=0;
    if(Reset){
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                board[row][col]=0;
                document.getElementById(row+","+col).value='';
                document.getElementById(row+","+col).classList.remove('Wrong')
                document.getElementById(row+","+col).classList.remove('active')
                document.getElementById(row+","+col).classList.remove('Pass')
            }
        }
    }
  }
  const questionDiv = document.getElementById('question');
function inputInsert(){
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.id=row+","+col;
            input.classList.add('cell-input');
            input.setAttribute('data-row', row);
            input.setAttribute('data-col', col);
            input.addEventListener('input', function() {
            this.value = this.value.replace(/[^1-9]/g, '');  
            if (this.value.length > 1) {
                this.value = this.value.charAt(1);
            }
            checkdata(this,row,col)
            });
            input.addEventListener('click', function () {
                if (this.value.length > 0) {
                    this.setSelectionRange(1,1);
                }
            });
            input.addEventListener('focus', function() {
                Avalable(row,col,1)
            });
            input.addEventListener('blur', function() {
                Avalable(row,col,0)
            });
            questionDiv.appendChild(input);
        }
    }
}
function Avalable(row,col,Mode){
    for (let rowt = 0; rowt < 9; rowt++) {
        for (let colt = 0; colt < 9; colt++) {
            document.getElementById(rowt+","+colt).classList.remove("active")
        }
    }
    for(let i=0;i<9;i++){
        let obj=document.getElementById(row+","+i);
        if(Mode==1)obj.classList.add("active")
        else obj.classList.remove("active")
        
    }
    for(let i=0;i<9;i++){
        let obj=document.getElementById(i+","+col)
        if(Mode==1)obj.classList.add("active")
        else obj.classList.remove("active")
    }
    let startrow=row-row%3;
    let startcol=col-col%3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let obj = document.getElementById((i+startrow)+","+(j+startcol))
            if(Mode==1)obj.classList.add("active")
            else obj.classList.remove("active")
        }
    }
    if(Mode==1){
        document.getElementById(row+","+col).classList.remove("active")
        document.getElementById(row+","+col).classList.add("this")
    }
    else{ 
        document.getElementById(row+","+col).classList.remove("this")
    }
}
function checkdata(object,row,col){
    value=object.value
    if(value!=''){
        object.value='';
        board[row][col]=0
        if(!checkExist(row,col,value)){
            object.classList.add('Wrong');
            work=true;
        }else{
            object.classList.remove('Wrong');
            work=true;
        }
    }else{
        object.classList.remove('Wrong');
        work=true;
    }
    object.value=value
    board[row][col]=value

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
        alert("No solution")
        resetall()
        return false;
    }else{
        await displayAnswer(notfilled)
    }

    

}

function sleep(ms) {
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
            themainobject.classList.remove("Wrong")
            themainobject.classList.add("Pass");
            board[row][col]=i;
            themainobject.value=i
            if(count>500){
                divValue=count < 1000 ? 60 : Math.pow(10, Math.floor(Math.log10(count)))/10;
            }else{
                divValue=5;
            }
            if(notfilled.length>(9*9)/2){
                if(count%divValue==0){
                    await sleep(0);
                }
            }else{
                await sleep(50);
            }
            count++;
            if( await AssignNumber(notfilled,pos+1)){
                return true
            }
            board[row][col]=0;
            themainobject.value=''
            themainobject.classList.remove("Pass");
            themainobject.classList.add("Wrong")
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
    Reset=false;
    if(work){
        resetBoard()
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                TheObject=document.getElementById(row+","+col);
                value=TheObject.value;
                if(value==''){
                    
                    board[row][col]=0;
                }else{
                    if(!checkExist(row,col,value)){
                        TheObject.classList.add('Wrong')
                        resetBoard();
                        work=false;
                        Reset=true;
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
                    // NObject.style.backgroundColor='white';
                }else{
                    NObject.classList.add('active')
                }
            }
        }
        datacalculate()
    }
}
async function displayAnswer(notfilled){
    await sleep(100);
    for (let row = notfilled.length-1; row >= 0; row--) {
            document.getElementById(notfilled[row][0]+","+notfilled[row][1]).classList.remove('Pass')
            document.getElementById(notfilled[row][0]+","+notfilled[row][1]).classList.remove('Wrong')
            await sleep(20);
    }
    Reset=true;
}
// datacalculate()