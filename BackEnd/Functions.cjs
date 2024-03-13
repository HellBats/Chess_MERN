let players = [];
let rooms = [];

function Push(queue,val)
{
    queue.push(val);
}

function Pop(queue)
{
    queue.shift()
}

function GenerateId(length)
{
    return Math.random().toString(36).substring(length)+Math.random().toString(36).substring(length);
}

// (Math.random()*10).toString()

module.exports = {GenerateId,players,rooms,Pop,Push}

