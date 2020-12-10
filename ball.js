class Ball{
    constructor(colour,x = 0,vel = 0){
        this.size = 15
        this.pos = createVector(width/2,Height-this.size-30)
        this.acc = createVector(0,0)
        this.vel = createVector(0,0)
        if(!colour)
        this.color = [random(255),random(255),random(255)]
        else
        this.color = colour
        this.maxJumpForce =8
        this.maxVelX = 7+ vel
        this.sideForce = 0.5
        this.jumpAvail = false
        this.Brain  = new NeuralNetwork([7,25,25,4])
        this.timer =0
        this.timer_plus = x
        this.gameover = false
        this.angle = 0

    }
    sightt(){
        if (this.sight)
        line(width/2,this.pos.y,this.sight.pos.x-this.pos.x+width/2,this.sight.pos.y)
    }
    show(pos){
        if (pos)
        {
        push()
        noFill()
        strokeWeight(3)
        stroke(this.color[0],this.color[1],this.color[2])
        translate(width/2+(this.pos.x-pos.x),this.pos.y)
        rotate(this.angle)
        circle(0,0,this.size*2)
        pop()
    }
    else
    {
        push()
        noFill()
        strokeWeight(3)
        stroke(this.color[0],this.color[1],this.color[2])
        translate(width/2,this.pos.y)
        rotate(this.angle)
        circle(0,0,this.size*2)
pop()
    }
}

think(ob){

    // img.resize(00,360)
    // console.log(img)
    // if(frameCount>0)
    // noLoop()
    // background(255)
    // image(img,0,0)
    // loadPixels()

    let imm = []
    // for (let i = 0 ;i<pixels.length;i+=4){
    //     imm[floor(i/4)] = (pixels[i]+pixels[i+1]+pixels[i+2])/3
    // }

    // for (let i = 0;i<imm.length;i++)
    // if (imm[i]==255){
    //     console.log(i)
    // }
    // let ratio = width/Height

    // let im = createImage(width,Height)
    // im.loadPixels()
    // for (let i = 0 ; i<iii.length;i++){
    //     im.pixels[i]  = iii[i]
    // }
    // im.updatePixels()
    let index = 0
    let minn = width
    for (let i = 0; i<10;i++)
    {
        let dis = ob[i].pos.x+ob[i].wid-this.pos.x-this.size

        if (dis>0 && dis<minn ){
            index = i
            minn = dis
        }
    }
    this.sight = ob[index]


    // this.sight.show(this.pos,3)
    // console.log(this.sight)



for (let i = 0; i<2;i++)
{
    if(this.pos.x+this.size>ob[i].pos.x && this.pos.x-this.size<ob[i].pos.x+ob[i].wid){
        if(this.pos.y+this.size>ob[i].pos.y){
            this.gameover = true
        }
    }
}
    let inputs = imm

    inputs[0] = (this.pos.x-this.sight.pos.x)/width
    inputs[1] = this.pos.y/Height
    inputs[2] = this.sight.pos.x/width
    inputs[3] = this.sight.pos.y/Height
    inputs[4] = this.sight.height/Height
    inputs[5] = this.vel.x/this.maxVelX
    inputs[6] = this.vel.y/15
    // console.log(inputs)
    let outputs = this.Brain.predict(inputs)
        // console.log(outputs)

        outputs = this.softmax(outputs)
        // console.log(outputs)
        let maxarg = 0
        let maxx = 0
        for (let i = 0;i<outputs.length;i++)
        {
            if(outputs[i]>maxx){
                maxx = outputs[i]
                maxarg = i
            }
        }
        for (let i = 0;i<outputs.length;i++)
        {
            if(i == maxarg){
                outputs[i] = 1
            }
            else{
                outputs[i] = 0
            }
        }

        // console.log(outputs)
        let dir = this.vel.x!=0?this.vel.x/sqrt(pow(this.vel.x,2)):0
        let change = this.vel.x/this.size
        if (outputs[0]){
        this.left()}
        else if(outputs[1]){
        this.right()}
        else if(outputs[2]){
            this.jump()
        }
        else{}
        if(this.jumpAvail)
        this.angle+=change*dir

        // return im

    }
    softmax(x)
    {   let tmp = x.slice()
        let sum = 0
        for(let i = 0;i<tmp.length;i++)
            sum += exp(tmp[i])
        // console.log(sum)
        for(let i = 0;i<tmp.length;i++)
            tmp[i] = exp(tmp[i])/sum
        return tmp
    }


    update(pos)
    {   this.timer++
        if(this.timer>1000+this.timer_plus || this.pos.x - pos.x < -width/2)
        this.gameover = true
        // console.log(this.timer)
        if(!this.gameover){
        this.gravity()
        this.vel.add(this.acc)
        this.vel.x = constrain(this.vel.x,-this.maxVelX,this.maxVelX)
        this.pos.add(this.vel)
        this.acc.set(0,0)
        this.vel.x*=0.965
        if(this.pos.y+this.size+2>Height){
        this.pos.y = Height-this.size-2
        this.jumpAvail = true
        this.vel.y = 0
    }
    }
    }
    gravity()
    {
        let grav = createVector(0,1)
        grav.setMag(0.25)
        this.addForce(grav)
    }
    addForce(x)
    {
        this.acc.add(x)
    }
    right(){
        let right = createVector(1,0)
        right.setMag(this.sideForce)
        this.addForce(right)
    }
    left()
    {
        let left = createVector(-1,0)
        left.setMag(this.sideForce)
        this.addForce(left)
    }
    jump(){
        if(this.jumpAvail){
        let up = createVector(0,-1)
        up.setMag(this.maxJumpForce)
        this.addForce(up)}
        this.jumpAvail= false
    }
    mutColor(){
        this.color[0]+=random(-2,2)
        this.color[1]+=random(-2,2)
        this.color[2]+=random(-2,2)

    }
    calFitness(){
        this.fitness = this.pos.x
    }

}
