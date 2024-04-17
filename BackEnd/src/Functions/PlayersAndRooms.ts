let players:string[] = [];
let rooms:[] = [];

const GenerateId = (length:number) =>{
    return Math.random().toString(36).substring(length)+Math.random().toString(36).substring(length);
}


// (Math.random()*10).toString()

module.exports = {GenerateId,players,rooms}

