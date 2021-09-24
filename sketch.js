let matrix;
let score;
let maxi;
function setup() {
  score = 0;
  maxi = 0;
  createCanvas(350, 350);
  noLoop();
  //highscore();
  matrix = [[0,0,0],[0,0,0],[0,0,0]];
  spawn_number();
  spawn_number();
  updateCanvas();
}



//Compares the two matrices
function is_changed(a,b){
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      if(a[i][j] !== b[i][j])
      return true;
    }
}
  return false;
}

//Copy and return the matrix
function copy_matrix (matrix){
  let old = [[0,0,0],[0,0,0],[0,0,0]];
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      old[i][j] = matrix[i][j];
    }
}  
return old;
}

function flip(matrix){
  for(var i=0;i<3;i++){
    matrix[i].reverse();
  }
return matrix;
}

function rotate_m(matrix){
  let a = [[0,0,0],[0,0,0],[0,0,0]];
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      a[i][j] = matrix[j][i];
    }  
  }
return a;
}

// Checks if player has won the game 

function isGamewon(){
  if(maxi >= 128){
     return true;
  }  
 return false;
}

//// Checks if player has any moves left 
function isGameover(){
   for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      if(matrix[i][j] == 0)
          return false;
    }
   }  
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
    if(j!=2 && matrix[i][j] == matrix[i][j+1]){
      return false;
    }
       if(i!=2 && matrix[i][j] == matrix[i+1][j]){
      return false;
    }
  }
}
  return true;
}

function keyPressed(){
  let gameover = isGameover();
  if(gameover){
    alert("Oops! No more moves, Please press Restart to play again");
  }
  let gamewon = isGamewon();
  if(gamewon){
    alert("Hurray! You've Won! Please press Restart to play again");
    return;
  }
  let flipped = false;
  let rotated = false;
  let played = true;
  let past = copy_matrix(matrix);
  if(keyCode === DOWN_ARROW){
    //Already working
  }
  else if(keyCode === UP_ARROW){
    matrix = flip(matrix);
    flipped = true;
  }
  else if(keyCode === RIGHT_ARROW){
    matrix = rotate_m(matrix);
    rotated = true; 
  }
  else if(keyCode === LEFT_ARROW){
    matrix = rotate_m(matrix);
    matrix = flip(matrix);
    flipped = true;
    rotated = true;
  }
  else {
    played = false;
  }
    for(var i = 0; i<3 ; i++){
      matrix[i] = operate(matrix[i]);
    }
  
  if(flipped){
    matrix = flip(matrix);
  }
  if(rotated){
     matrix = rotate_m(matrix);
     matrix = rotate_m(matrix);
     matrix = rotate_m(matrix);
  }
   let changed = is_changed(past,matrix);
  if(changed){
  spawn_number();
  }
  updateCanvas();
}


function operate(row){
  row = slide(row);
  row = combine(row);
  row = slide(row);
return row;
}

function grt_zero(x){
  if(x>0) return x;
}

function slide (row){
  let arr = row.filter(grt_zero);
  let missing = 3-arr.length;
  let zeroes = Array(missing).fill(0);
  arr = zeroes.concat(arr);
  return arr; 
}
function combine(row){
    for(var i=2;i>0;i--){
       let a = row[i];
      let b = row[i-1];
      if(a == b && a != 0){
        row[i] = a+b;
        score += row[i];
        row[i-1] = 0;
        maxi = a+b;
        break;
      }
    }  
return row;
}
function spawn_number(){
  let avail_spots = [];
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      if(matrix[i][j] === 0){
        avail_spots.push({x:i,y:j});
      }     
    }
  }
  if(avail_spots.length > 0){
    let spot = random(avail_spots);
    let x = random();
    if(x>0.5){
      matrix[spot.x][spot.y] = 2;
    }
    else if(x>0.2 && x <= 0.5) matrix[spot.x][spot.y] = 4;
    else matrix[spot.x][spot.y] = 8;
  }
  
}

function updateCanvas() {
  background("#f0f0f5");
  draw_matrix();
  select('#score').html(score);
}

function draw_matrix(){
  let w = 100;
  let value;
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      noFill();
      strokeWeight(2);
      stroke(0);
       value = matrix[i][j];
      let s = value.toString();
      if(value !== 0){
        stroke(0);
        fill(colours[s].color);
      }
        else {
          fill("#c2d6d6");
        }
     rect(25+i*w,25+j*w,w,w);
      if(value !== 0){
        textAlign(CENTER,CENTER);
      textSize(40);
        fill(0);
       noStroke();
     text(value,25+i*w+w/2,25+j*w+w/2);
      }
      
    }
  }
  
}
