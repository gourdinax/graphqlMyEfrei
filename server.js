import express from "express";
import { PrismaClient } from "@prisma/client"
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";


const app = express()
const prisma = new PrismaClient()

async function main(){
    const eleves = await prisma.eleves.findMany()
    const classes = await prisma.classes.findMany()
    
    
    const notes = await prisma.notes.findMany({
        include:{
            eleves:{
                include:{
                    classes:{      
                    }
                }
            }
        }
    })

console.log(notes)

}

main().then((value)=>{

}).catch((err) =>{
}).finally( async ()=>{
    await prisma.$disconnect();
})

let schema = buildSchema(`
    
type Eleves {

    idEleves : ID
    nomEleves : String
    prenomEleves : String 
    idClasses : ID
    notes : [Notes]

}

type Formateurs {

    idFormateurs : ID
    nomFormateurs : String
    prenomFormateurs : String
    cours : [Cours]
        
}

type Matieres {

    idMatieres : ID
    nomMatieres : String
    parcours :  [Parcours]
    cours :  [Cours]
    notes : [Notes]
        
}

type Cours {

    idCours : ID
    idFormateurs : ID
    idMatieres : ID
    dateDebut : String
    dateFin : String
    lieu : String
        
}

type Parcours {

    idParcours : ID
    nomParcours : String
    matieres :  [Matieres]
    classes :  [Classes]
        
}

type Classes {

    idClasses : ID
    nomClasses : String
    idParcours :  Int
    eleves :  [Eleves]

}

type Notes {

    idNote : ID
    note : Int
    idMatieres :  Int
    idEleves :  Int

}


type Query{
    getEleves : [Eleves]
    getElevesByNom(nom : String) : [Eleves]
}

type Mutation{
    addEleves(id: Int, nom : String, prenom : String, idClasses : Int) 
    : [Eleves]
    delEleves(id: Int) 
    : [Eleves]
}

`)

let root = {

// ELEVES 

    getEleves: async () => {
        return await prisma.eleves.findMany({
        });
    },

    getElevesByNom: async ({nom}) => {
        return await prisma.eleves.findMany({
            where: {
                nomEleves: nom
            }
        });    
    },

    addEleves : async ({id, nom, prenom, idClasses}) => {

        await prisma.eleves.create({
         data:{
             idEleves : id,
             nomEleves : nom,
             prenomEleves : prenom,
             idClasses : idClasses
         }
         })
         return await prisma.eleves.findMany({
         });
     },

     delEleves : async ({id}) => {

        const eleve = await prisma.eleves.findUnique({
            where:{
                 idEleves : id,
             }
             })
            
        if(!eleve) throw new Error('Eleve non exist')
             
        await prisma.eleves.delete({
        where:{
             idEleves : id,
         }
         })
         return await prisma.eleves.findMany({
         });
     },
}

app.use("/graphql", graphqlHTTP ({
    schema : schema,
    rootValue : root,
    graphiql : true

}))

app.listen(3000, () => {
    console.log("Serveur démarée");
})
