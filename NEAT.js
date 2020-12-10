let same = 0
let prev = 0
let maxxx = 0
let Generation = 0
let adder = false
function nextGen(){
    maxxx = calFitnesses()

    if (prev<=maxxx)
    {
        same++
    }
    // let adder  = false
    if (same>50)
    {
        adder = true
        same = 0
    }

    for(let i = 0 ;i<POP;i++)
    {
        players.push(PickOne(adder))
    }

    gen++
    Generation++
    fitnesses.push(0)
    saved =[]
    FormObs()
    // count =0
    // enemy =[new Enemy(lines)]

}
function calFitnesses(){
    for(let i of saved)
    {
        i.calFitness()
    }
    let maxx = 0
    for(let i = 0;i<saved.length;i++){
        if (saved[i].fitness>maxx){
            maxx = saved[i].fitness
        }
    }
    return maxx

}
function PickOne(mm){
    let index =0
    let maxx = 0
    for(let i = 0;i<saved.length;i++){
        if (saved[i].fitness>maxx){
            maxx = saved[i].fitness
            index = i
        }
    }
    let tmp
    if (mm){
        tmp = new Ball(saved[index].color,Generation*3,constrain(Generation/100,1,5))
    }
    else{
        tmp = new Ball(saved[index].color)
}
    tmp.Brain = saved[index].Brain.copy()
    if (players.length>=2)
    tmp.Brain.mutate(0.2)
    tmp.mutColor()
    return tmp
}
