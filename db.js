const mysql = require('mysql');
   
    
    
const pool = mysql.createPool({   
    password: process.env.DB_PASSWORD||"root_password",
    user: process.env.DB_USER ||"root_user",
    database: process.env.MYSQL_DB ||"app_partner",
    host: process.env.DB_HOST ||"mysql",
    port: process.env.DB_PORT || 3306
    
});

   

    
   
    
let db = {}; //create an empty object you will use later to write  and export your queries. 

db.insertPartenaire = (name, prenom, adresse, telephone, email, password, others="" ) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO partenaires (nom, prénom, adresse, tel, email, password, others) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, prenom, adresse, telephone, email, password, others], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}

db.getPartenaireByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM partenaires WHERE email = ?', [email], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
    });
}

db.insertOffer = (description, credits, details, id_partenaire) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO offres (description, credits, details, id_partenaire) VALUES (?, ?, ?, ?)', [description, credits, details, id_partenaire], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}

db.allOfferbyPart = (id_partenaire) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM offres WHERE id_partenaire = ?', [id_partenaire], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
    });
}

db.oneOffer = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM offres WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
    });
}

db.updateOffer = (id, description, credits, details) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE offres SET description = ?, credits = ?, details = ? WHERE id = ?', [description, credits, details, id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}

db.deleteOffer = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM offres WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}

db.insertEvent = (titre, description, date_debut, date_fin, id_partenaire, lieu, details="") => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO événements (titre, description, date_debut, date_fin, id_partenaire, lieu, details) VALUES (?, ?, ?, ?, ?, ?, ?)', [titre, description, date_debut, date_fin, id_partenaire, lieu, details], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}

db.allEventbyPart = (id_partenaire) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM événements WHERE id_partenaire = ?', [id_partenaire], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
    });
}

db.oneEvent = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM événements WHERE id_event = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
    });
}

db.updateEvent = (id, titre, description, date_debut, date_fin, lieu, details) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE événements SET titre = ?, description = ?, date_debut = ?, date_fin = ?, lieu = ?, details = ? WHERE id_event = ?', [titre, description, date_debut, date_fin, lieu, details, id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}

db.deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM événements WHERE id_event = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}


    
module.exports = db