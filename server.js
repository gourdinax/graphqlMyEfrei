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

    getClasses: [Classes]
    getClassesByNom(nom : String) : [Classes]

    getFormateurs: [Formateurs]
    getFormateursByNom(nom : String) : [Formateurs]
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

    addClasses(id: Int, nom : String, idParcours : Int) 
    : [Classes]
    delClasses(id: Int) 
    : [Classes]
    updateClasses(id: Int, nom : String, idParcours : Int) 
    : [Classes]

    addFormateurs(id: Int, nom : String, prenom : String) 
    : [Formateurs]
    delFormateurs(id: Int) 
    : [Formateurs]
    updateFormateurs(id: Int, nom : String, prenom : String) 
    : [Formateurs]
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
            
        if(eleveF[0]) throw new Error('Eleve avec meme nom et même prenom existe déjà')


        const idClassesF = await prisma.classes.findUnique({
            where:{
                 idClasses : idClasses,
             }
        })

        if(!idClassesF) throw new Error('Classe non exist')

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
            
        if(eleveF[0]) throw new Error('Eleve avec meme nom et même prenom existe déjà')

        const idClassesF = await prisma.classes.findUnique({
            where:{
                 idClasses : idClasses,
             }
        })

        if(!idClassesF) throw new Error('Classe non exist')
             
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

        const idMatieresF = await prisma.matieres.findUnique({
            where:{
                 idMatieres : idMatieres,
             }
        })

        if(!idMatieresF) throw new Error('Matiere non exist')

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

        const idMatieresF = await prisma.matieres.findUnique({
            where:{
                 idMatieres : idMatieres,
             }
        })

        if(!idMatieresF) throw new Error('Matiere non exist')
             
        await prisma.notes.update({
        where:{
             idNotes : id,
         },
         data: {
            note : note,
            idEleves : idEleves,
            idMatieres : idMatieres
         }
         })
         return await prisma.notes.findMany({
         });
     },

//CLASSES
getClasses: async () => {
    return await prisma.classes.findMany({
        include:{ 
            parcours: true,
            eleves : true,
            cours : true
         },
    });
},
getClassesByNom: async ({nom}) => {
    return await prisma.classes.findMany({
        where: {
             nomClasses: nom  
            },
        include: { 
            parcours: true,
            eleves : true,
            cours : true 
        }
    });    
},
addClasses : async ({id, nom, idParcours}) => {

    const classeF = await prisma.classes.findMany({
        where:{
             nomClasses : nom,
         }
         })

    if(classeF) throw new Error('Classe avec le même nom existe deja')

    await prisma.classes.create({
     data:{
         idClasses : id,
         nomClasses : nom,
         idParcours : idParcours,
     }
     })
     return await prisma.classes.findMany({
        include: { 
            parcours: true,
            eleves : true,
            cours : true 
        }
     });
 },

 delClasses: async ({id}) => {

    const classeF = await prisma.classes.findUnique({
        where:{
             idClasses : id,
         }
         })
        
    if(!classeF) throw new Error('Note non exist')

    await prisma.classes.delete({
        where:{
             idClasses : id,
         }
         })
         return await prisma.classes.findMany({
         });
 },

 updateClasses : async ({id, nom, idParcours}) => {

    const classeN = await prisma.classes.findMany({
        where:{
             nomClasses : nom,
         }
         })

    if(classeN[0]) throw new Error('Classe avec le même nom existe deja')

    const classeF = await prisma.classes.findUnique({
        where:{
             idClasses : id,
         }
         })
        
    if(!classeF) throw new Error('Classe non exist')

    const idParcoursF = await prisma.parcours.findUnique({
        where:{
             idParcours : idParcours,
         }
    })

    if(!idParcoursF) throw new Error('Parcours non exist')
    
    await prisma.classes.update({
    where:{
         idClasses : id,
     },
     data: {
        nomClasses : nom,
        idParcours : idParcours,
     }
     })
     return await prisma.classes.findMany({
     });
 },
 // FORMATEURS

 getFormateurs: async () => {
    return await prisma.formateurs.findMany({
        include: { 
            cours : true 
        }
    });
},

getFormateursByNom: async ({nom}) => {
    return await prisma.formateurs.findMany({
        where: {
            nomFormateurs: nom
        },
        include: { 
            cours : true 
        }
    });    
},

addFormateurs : async ({id, nom, prenom}) => {

    const formateurF = await prisma.formateurs.findMany({
        where:{
            nomFormateurs : nom,
            prenomFormateurs : prenom,
         }
    })
        
    if(formateurF[0]) throw new Error('Formateur avec meme nom et même prenom existe déjà')

    await prisma.formateurs.create({
     data:{
         idFormateurs : id,
         nomFormateurs : nom,
         prenomFormateurs : prenom,
     }
     })
     return await prisma.formateurs.findMany({
        include: { 
            cours : true 
        }
     });
 },

 delFormateurs : async ({id}) => {

    const formateurF = await prisma.formateurs.findUnique({
        where:{
             idFormateurs : id,
         }
         })
        
    if(!formateurF) throw new Error('Formateur non exist')
         
    await prisma.formateurs.delete({
    where:{
         idFormateurs : id,
     }
     })
     return await prisma.formateurs.findMany({
        include: { 
            cours : true 
        }
     });
 },
 updateFormateurs : async ({id, nom, prenom}) => {

    const formateurF = await prisma.formateurs.findUnique({
        where:{
             idFormateurs : id,
         }
         })
        
    if(!formateurF) throw new Error('Formateur non exist')

    const formateurN = await prisma.formateurs.findMany({
        where:{
             nomFormateurs : nom,
             prenomFormateurs : prenom,
         }
    })
        
    if(formateurN[0]) throw new Error('Formateur avec meme nom et même prenom existe déjà')
         
    await prisma.formateurs.update({
    where:{
         idFormateurs : id,
     },
     data: {
        nomFormateurs : nom,
        prenomFormateurs : prenom,
     }
     })
     return await prisma.formateurs.findMany({
        include: { 
            cours : true 
        }
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
