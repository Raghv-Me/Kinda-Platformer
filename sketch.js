let Height = 360

let players =[]
let saved = []
let  POP = 400
let ObsNo = 50
let obs = []
let best = 0
let max_x = 0
let maxx = 0
let minn = Infinity
let jump = 0
let bestshow
let but
let speed
let fitnesses =[]
let gen = 1
function FormObs(){
    obs = []
    // console.log(x)
    let di = width*0.5
    for(let i = 0;i<ObsNo;i++){
        if(random()>0){
        obs.push(new Obstacle(width*2.75/4+di*i))
    }
}}
function setup() {
  createCanvas(800,600);
  for (let i = 0 ;i<POP;i++){
  players.push(new Ball())}
  FormObs()
  bestshow = !false
  speed = createSlider(1,3000,1,1)
  fitnesses[0] = 0
  fitnesses[gen] = 0
  but = createButton('Best')
  but.mousePressed(BEST)
}
function BEST(){
    bestshow =! bestshow
}
function draw() {

  background(25);
  let img;
  for (let mm = 0; mm<speed.value();mm++){
  for (let player of players){
      player.think(obs)
      player.update(players[best].pos)

  }


  for(let i = players.length-1;i>=0;i--){
    if(players[i].gameover == true)
    {
        saved.push(players.splice(i,1)[0])

    }
}

  max_x=0
  best = 0
  for (let i =0 ;i<players.length;i++){
      if (players[i].pos.x>max_x)
      {
          max_x = players[i].pos.x
          best = i
      }
  }
  for (let i =0 ;i<players.length;i++){
      if (players[i].pos.y<minn)
      {
          minn = players[i].pos.y
          jump = 360-minn
      }
  }

  // console.log(players.length)
  if(players.length==0)
  {
      nextGen()
  }
  for (let i =obs.length-1 ;i>=0;i--){
      if (obs[i].pos.x+obs[i].wid<players[best].pos.x-width/2)
      {
          obs.splice(i,1)

      }
  }
  if (fitnesses[gen] <=max_x)
  fitnesses[gen] = max_x
}
  // console.log(obs.length)
 if (speed.value()<100)
{

  players[best].show()
  // players[best].sightt()

  // console.log(players[best].timer)
  // translate(players[best].pos.x,0)

  if(!bestshow)
   for (let i =0 ;i<players.length;i++){
       if (i == best){}
       else{
           players[i].show(players[best].pos)
   }
}
for (let ob of obs){
    if(ob.pos.x-players[best].pos.x<width/2 && ob.pos.x-players[best].pos.x>-width/2){
    ob.show(players[best].pos)
}
}
if (maxx<max_x)
{
    maxx = max_x
}
  push()
  stroke(255)
  strokeWeight(3)
  line(0,Height,width,Height)
  pop()
  for (let player of players){
  if (isKeyPressed){
      if(keyCode == UP_ARROW)
      player.jump()
      if(keyCode == RIGHT_ARROW)
      player.right()
      if (keyCode == LEFT_ARROW)
      player.left()
  }
  else{

  }

}
// console.log(fitnesses,gen)


}
showGraph()
// img.loadPixels()
// console.log(img)
// for (let i = 0 ;i<img.pixels.length;i+=4){
//     if (img.pixels[i] == 255){
//         console.log('i')
//     }
// }
// noLoop()

}
function showGraph(){
    if (fitnesses.length>301){
        fitnesses.splice(0,1)
        gen--
    }
    let H2 = Height+30
    stroke(255)

    textSize(20)
push()
    textAlign(LEFT,TOP)
    text('Generation Vs Fitness',10,Height+5)
    textAlign(CENTER,TOP)
    text('Generations : '+(Generation+1),width/2,Height+5)
    textAlign(RIGHT,TOP)
    text('Max Fitness : '+round(max(fitnesses)),width-10,Height+5)
    pop()
    strokeWeight(3)

    line(0,H2,width,H2)
    let start =[0,map(fitnesses[0],0,max(fitnesses),height,H2+2)]
    let dis = width/(fitnesses.length-1)
    noFill()
    stroke(255,255,0)
    strokeWeight(1)
    beginShape()
    vertex(start[0],start[1])
    // console.log(max(fitnesses),fitnesses[gen])
    for(let i = 1;i<fitnesses.length;i++){
        let h = map(fitnesses[i],0,max(fitnesses),0,1)
        vertex(start[0]+dis,map(h,0,1,height,H2+2))
        start = [start[0]+dis,map(h,0,1,height,H2+2)]
    }
    endShape()
}
