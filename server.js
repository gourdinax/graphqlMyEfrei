import express from "express";
import { PrismaClient } from "@prisma/client"
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";


const app = express()
const prisma = new PrismaClient()


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
    formateurs : Formateurs
        
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
    getElevesById(id : Int) : [Eleves]

    getNotes: [Notes]
    getNotesByNom(nom : String) : [Notes]
    getNotesByIdEleves(id : Int) : [Notes]

    getClasses: [Classes]
    getClassesByNom(nom : String) : [Classes]

    getFormateurs: [Formateurs]
    getFormateursByNom(nom : String) : [Formateurs]
    getFormateursById(id : Int) : [Formateurs]

    getMatieres: [Matieres]
    getMatieresByNom(nom : String) : [Matieres]

    getParcours: [Parcours]
    getParcoursByNom(nom : String) : [Parcours]

    getCours: [Cours]
    getCoursByLieu(lieu : String) : [Cours]
    getCoursById(id : Int) : [Cours]

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

    addMatieres(id: Int, nom : String) 
    : [Matieres]
    delMatieres(id: Int) 
    : [Matieres]
    updateMatieres(id: Int, nom : String) 
    : [Matieres]

    addParcours(id: Int, nom : String) 
    : [Parcours]
    delParcours(id: Int) 
    : [Parcours]
    updateParcours(id: Int, nom : String) 
    : [Parcours]

    addCours(idCours: Int, idFormateur: Int, idMatieres: Int, dateDebut : String, dateFin: String, lieu : String) 
    : [Cours]
    delCours(id: Int) 
    : [Cours]
    updateCours(idCours: Int, idFormateur: Int, idMatieres: Int, dateDebut : String, dateFin: String, lieu : String) 
    : [Cours]
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

    getElevesById: async ({id}) => {
        return await prisma.eleves.findMany({
            where: {
                idEleves: id
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
            
        if(eleveF[0]) throw new Error('Eleve avec meme nom et m??me prenom existe d??j??')


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
            
        if(eleveF[0]) throw new Error('Eleve avec meme nom et m??me prenom existe d??j??')

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

    getNotesByIdEleves: async ({id}) => {
        return await prisma.notes.findMany({
            where: {
                idEleves: id
            },
            include:{
                eleves : true
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

        const idElevesF = await prisma.eleves.findUnique({
            where:{
                 idEleves : idEleves,
             }
        })

        if(!idElevesF) throw new Error('Eleve non exist')

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

        const idElevesF = await prisma.eleves.findUnique({
            where:{
                 idEleves : idEleves,
             }
        })

        if(!idElevesF) throw new Error('Eleve non exist')
             
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

    if(classeF) throw new Error('Classe avec le m??me nom existe deja')

    const idParcoursF = await prisma.parcours.findUnique({
        where:{
             idParcours : idParcours,
         }
    })

    if(!idParcoursF) throw new Error('Parcours non exist')

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

    if(classeN[0]) throw new Error('Classe avec le m??me nom existe deja')

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

getFormateursById: async ({id}) => {
    return await prisma.formateurs.findMany({
        where: {
            idFormateurs: id
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
        
    if(formateurF[0]) throw new Error('Formateur avec meme nom et m??me prenom existe d??j??')

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
        
    if(formateurN[0]) throw new Error('Formateur avec meme nom et m??me prenom existe d??j??')
         
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

  // MATIERES

  getMatieres: async () => {
    return await prisma.matieres.findMany({
        include: { 
            cours : true,
            notes : true,
            parcours : true
        }
    });
},

getMatieresByNom: async ({nom}) => {
    return await prisma.matieres.findMany({
        where: {
            nomMatieres: nom
        },
        include: { 
            cours : true,
            notes : true,
            parcours : true
        }
    });    
},

addMatieres : async ({id, nom}) => {

    const matieresF = await prisma.matieres.findMany({
        where:{
            nomMatieres : nom,
         }
    })
        
    if(matieresF[0]) throw new Error('Matieres avec meme nom existe d??j??')

    await prisma.matieres.create({
     data:{
         idMatieres : id,
         nomMatieres : nom,
     }
     })
     return await prisma.matieres.findMany({
        include: { 
            cours : true,
            notes : true,
            parcours : true
        }
     });
 },

 delMatieres : async ({id}) => {

    const matieresF = await prisma.matieres.findUnique({
        where:{
             idMatieres : id,
         }
         })
        
    if(!matieresF) throw new Error('Matieres non exist')
         
    await prisma.matieres.delete({
    where:{
         idMatieres : id,
     }
     })
     return await prisma.matieres.findMany({
        include: { 
            cours : true,
            notes : true,
            parcours : true
        }
     });
 },
 updateMatieres : async ({id, nom}) => {

    const matieresF = await prisma.matieres.findUnique({
        where:{
             idMatieres : id,
         }
         })
        
    if(!matieresF) throw new Error('Matieres non exist')

    const matieresN = await prisma.matieres.findMany({
        where:{
             nomMatieres : nom,
         }
    })
        
    if(matieresN[0]) throw new Error('Matieres avec meme nom existe d??j??')
         
    await prisma.matieres.update({
    where:{
         idMatieres : id,
     },
     data: {
        nomMatieres : nom,
     }
     })
     return await prisma.matieres.findMany({
        include: { 
            cours : true,
            notes : true,
            parcours : true
        }
     });
 },

   // PARCOURS

   getParcours: async () => {
    return await prisma.parcours.findMany({
        include: { 
            classes : true,
            matieres : true,
        }
    });
},

getParcoursByNom: async ({nom}) => {
    return await prisma.parcours.findMany({
        where: {
            nomParcours: nom
        },
        include: { 
            classes : true,
            matieres : true,
        }
    });    
},

addParcours : async ({id, nom}) => {

    const parcoursF = await prisma.parcours.findMany({
        where:{
            nomParcours : nom,
         }
    })
        
    if(parcoursF[0]) throw new Error('Parcours avec meme nom existe d??j??')

    await prisma.parcours.create({
     data:{
         idParcours : id,
         nomParcours : nom,
     }
     })
     return await prisma.parcours.findMany({
        include: { 
            classes : true,
            matieres : true,
        }
     });
 },

 delParcours : async ({id}) => {

    const parcoursF = await prisma.parcours.findUnique({
        where:{
             idParcours : id,
         }
         })
        
    if(!parcoursF) throw new Error('Parcours non exist')
         
    await prisma.parcours.delete({
    where:{
         idParcours : id,
     }
     })
     return await prisma.parcours.findMany({
        include: { 
            classes : true,
            matieres : true,
        }
     });
 },
 updateParcours: async ({id, nom}) => {

    const parcoursF = await prisma.parcours.findUnique({
        where:{
             idParcours : id,
         }
         })
        
    if(!parcoursF) throw new Error('Parcours non exist')

    const parcoursN = await prisma.parcours.findMany({
        where:{
             nomParcours : nom,
         }
    })
        
    if(parcoursN[0]) throw new Error('Parcours avec meme nom existe d??j??')
         
    await prisma.parcours.update({
    where:{
         idParcours : id,
     },
     data: {
        nomParcours : nom,
     }
     })
     return await prisma.parcours.findMany({
        include: { 
            classes : true,
            matieres : true,
        }
     });
 },

    // Cours

    getCours: async () => {
        return await prisma.cours.findMany({
            include: { 
                formateurs : true,
                matieres : true,
                classes : true
            }
        });
    },
    
    getCoursByLieu: async ({lieu}) => {
        return await prisma.cours.findMany({
            where: {
                lieu: lieu
            },
            include: { 
                formateurs : true,
                matieres : true,
                classes : true
            }
        });    
    },

    getCoursById: async ({id}) => {
        return await prisma.cours.findMany({
            where: {
                idCours: id
            },
            include: { 
                formateurs : true,
                matieres : true,
                classes : true
            }
        });    
    },
    
    
    addCours : async ({idCours, idFormateurs, idMatieres, dateDebut, dateFin, lieu}) => {
    
        const coursF = await prisma.cours.findMany({
            where:{
                dateDebut : dateDebut,
                lieu : lieu
             }
        })
            
        if(coursF[0]) throw new Error('Cours m??me lieu m??me horraire existe deja') // a revoir

        const idFormateursF = await prisma.formateurs.findUnique({
            where:{
                 idFormateurs : id,
             }
             })
            
        if(!idFormateursF) throw new Error('Formateurs non exist')

        const idMatieresF = await prisma.matieres.findUnique({
            where:{
                 idMatieres : id,
             }
             })
            
        if(!idMatieresF) throw new Error('Matieres non exist')
    
        await prisma.cours.create({
         data:{
             idCours : idCours,
             idFormateurs : idFormateurs,
             idMatieres : idMatieres,
             dateDebut : dateDebut,
             dateFin : dateFin,
             lieu : lieu
         }
         })
         return await prisma.cours.findMany({
            include: { 
                formateurs : true,
                matieres : true,
                classes : true
            }
         });
     },
    
     delCours : async ({id}) => {
    
        const coursF = await prisma.cours.findUnique({
            where:{
                 idCours : id,
             }
             })
            
        if(!coursF) throw new Error('Cours non exist')
             
        await prisma.cours.delete({
        where:{
             idCours : id,
         }
         })
         return await prisma.cours.findMany({
            include: { 
                formateurs : true,
                matieres : true,
                classes : true
            }
         });
     },
     updateCours: async ({id, idFormateurs, idMatieres, dateDebut, dateFin, lieu}) => {
    
        const coursF = await prisma.cours.findUnique({
            where:{
                 idCours : id,
             }
             })
            
        if(!coursF) throw new Error('Cours non exist')
    
        const coursLieuD = await prisma.cours.findMany({
            where:{
                dateDebut : dateDebut,
                lieu : lieu
             }
        })
            
        if(coursLieuD[0]) throw new Error('Cours m??me lieu m??me horraire existe deja') 
        const idFormateursF = await prisma.formateurs.findUnique({
            where:{
                 idFormateurs : id,
             }
             })
            
        if(!idFormateursF) throw new Error('Formateurs non exist')

        const idMatieresF = await prisma.matieres.findUnique({
            where:{
                 idMatieres : id,
             }
             })
            
        if(!idMatieresF) throw new Error('Matieres non exist')
             
        await prisma.cours.update({
        where:{
             idCours : id,
         },
         data:{
            idFormateurs : idFormateurs,
            idMatieres : idMatieres,
            dateDebut : dateDebut,
            dateFin : dateFin,
            lieu : lieu
        }
         })
         return await prisma.parcours.findMany({
            include: { 
                formateurs : true,
                matieres : true,
                classes : true
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
    console.log("Serveur d??mar??e");
})
