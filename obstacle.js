class Obstacle{
    constructor(pos){
        this.height = random(30,105)
        this.pos = createVector(pos,Height-this.height)
        this.wid = 20
        this.color = [random(255),random(255),random(255)]

    }
    show(pos,x)
    {
        if(x)
        {push()
        stroke(255)
        strokeWeight(3)
        noFill()
        rect(this.pos.x-pos.x+width/2,this.pos.y,this.wid,this.height)}
        else
        {push()
        stroke(this.color)
        strokeWeight(3)
        noFill()
        rect(this.pos.x-pos.x+width/2,this.pos.y,this.wid,this.height)

        }
        pop()
        fill(255)
        stroke(255)
        strokeWeight(1)
        textSize(15)
        textAlign(CENTER)
        text(floor(this.pos.x),this.pos.x-pos.x+width/2+this.wid/2,this.pos.y-10)
    }
    update()
    {

    }
}
