import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const GetAgents = (req, res) => {
    console.log('GetAgents');
    prisma.agent.findMany()
    .then((agents) => { res.json(agents); })
    .catch((error) => { res.json(error); });

    
}

const GetAgent = (req, res) => {
    let id = Number(req.params.id);
    prisma.agent.findUnique({ where: { id: id } })
    .then((agents) => { res.json(agents); })
    .catch((error) => { res.json(error); });
}

const CreateAgent = (req, res) => {

    prisma.agent.create({
        data: { name : req.body.name}
    }).then(agent => {res.json(agent);
    }).catch(error => {res.json(error); })


    console.log('CreateAgent');
    console.log(req.body);
    res.send("CreateAgent");     
}

const UpdateAgent  =  (req, res) => {
    let id = Number(req.params.id);
    let agent = req.body;
    prisma.agent.update({where: {id : id}, data :{name: agent.name,},})
    .then((agent) => { res.json(agent); })
    .catch((error) => { res.json(error); });
}

const DeleteAgent = (req, res) => {
let id = Number(req.params.id);
prisma.agent.delete({where: {id : id}})
.then((agent) => { res.json(agent); })
.catch((error) => { res.json(error); });
}


export { GetAgents, GetAgent, UpdateAgent, CreateAgent, DeleteAgent };