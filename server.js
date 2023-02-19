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
            },
            matieres : true
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
    classes : [Classes]
    matieres : Matieres
    formateurs : [Formateurs]
        
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
    cours : [Cours]

}

type Notes {

    idNotes : ID
    note : Float
    idMatieres :  Int
    idEleves :  Int
    matieres : Matieres
    eleves : Eleves

}

type Query{
    getEleves : [Eleves]
    getElevesByNom(nom : String) : [Eleves]

    getNotes: [Notes]
    getNotesByNom(nom : String) : [Notes]
}

type Mutation{
    addEleves(id: Int, nom : String, prenom : String, idClasses : Int) 
    : [Eleves]
    delEleves(id: Int) 
    : [Eleves]
    updateEleves(id: Int, nom : String, prenom : String, idClasses : Int) 
    : [Eleves]

    addNotes(id: Int, note : Float, idMatieres : Int, idEleves : Int) 
    : [Notes]
    delNotes(id: Int) 
    : [Notes]
    updateNotes(id: Int, note : Float, idMatieres : Int, idEleves : Int) 
    : [Notes]
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

        const eleveF = await prisma.eleves.findMany({
            where:{
                 nomEleves : nom,
                 prenomEleves : prenom,
             }
        })
            
        if(!eleveF) throw new Error('Eleve avec meme nom et même prenom existe déjà')

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
     updateEleves : async ({id, nom, prenom, idClasses}) => {

        const eleve = await prisma.eleves.findUnique({
            where:{
                 idEleves : id,
             }
             })
            
        if(!eleve) throw new Error('Eleve non exist')

        const eleveF = await prisma.eleves.findMany({
            where:{
                 nomEleves : nom,
                 prenomEleves : prenom,
             }
        })
            
        if(!eleveF) throw new Error('Eleve avec meme nom et même prenom existe déjà')
             
        await prisma.eleves.update({
        where:{
             idEleves : id,
         },
         data: {
            nomEleves : nom,
            prenomEleves : prenom,
            idClasses : idClasses
         }
         })
         return await prisma.eleves.findMany({
         });
     },

//NOTES
     getNotes: async () => {
        return await prisma.notes.findMany({
            include:{ 
                eleves: true,
                matieres : true
             },
        });
    },
    getNotesByNom: async ({nom}) => {
        return await prisma.notes.findMany({
            where: {
                    eleves:{
                        nomEleves: nom
                    }
                },
            include: { 
                eleves : true,
                matieres : true
            }
        });    
    },
    addNotes : async ({id, note, idEleves, idMatieres}) => {

        if(note<0 || note >20) throw new Error('Note doit etre compris entre 0 et 20')

        await prisma.notes.create({
         data:{
             idNotes : id,
             note : note,
             idMatieres : idMatieres,
             idEleves : idEleves,
         }
         })
         return await prisma.notes.findMany({
            include: { 
                eleves : true,
                matieres : true
            }
         });
     },

     delNotes : async ({id}) => {

        const note = await prisma.notes.findUnique({
            where:{
                 idNotes : id,
             }
             })
            
        if(!note) throw new Error('Note non exist')

        await prisma.notes.delete({
            where:{
                 idNotes : id,
             }
             })
             return await prisma.notes.findMany({
             });
     },

     updateNotes : async ({id, note, idEleves, idMatieres}) => {

        if(note<0 || note >20) throw new Error('Note doit etre compris entre 0 et 20')

        const noteF = await prisma.notes.findUnique({
            where:{
                 idNotes : id,
             }
             })
            
        if(!noteF) throw new Error('Note non exist')
             
        await prisma.notes.update({
        where:{
             idNotes : id,
         },
         data: {
            idNotes : id,
            note : note,
            idEleves : idEleves,
            idMatieres : idMatieres
         }
         })
         return await prisma.notes.findMany({
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
