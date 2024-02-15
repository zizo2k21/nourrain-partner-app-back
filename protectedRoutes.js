//routes protegés
const express =require('express');
const protectedRouter = express.Router();
const db = require('./db.js');
const verifyToken = require('./verifyToken');

protectedRouter.use('/', verifyToken);

//ajout d'offre
protectedRouter.post('/offers', async (req, res, next)=>{
  try {
    const {description, credits, details} = req.body;
    if(!description || !credits || !details || !req.authData.id_partenaire){
      return res.sendStatus(400);
    }
    const offer = await db.insertOffer(description, credits, details, req.authData.id_partenaire);
    res.status(200).json(offer);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//modification d'offre
protectedRouter.put('/offers/:id', async (req, res, next)=>{
  try {
    if(!req.params.id){
        return res.sendStatus(400);
      }
    const {description, credits, details} = req.body;
    if(!description || !credits || !details || !req.authData.id_partenaire){
      return res.sendStatus(400);
    }
    const existingoffer = await db.oneOffer(req.params.id);
    if(!existingoffer){
      return res.sendStatus(400);
    }
    if(req.authData.id_partenaire !== existingoffer.id_partenaire){
      return res.sendStatus(400);
    }
    const offer = await db.updateOffer(req.params.id, description, credits, details);
    res.status(200).json(offer);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//supression d'offre
protectedRouter.delete('/offers/:id', async (req, res, next)=>{
  try {
    if(!req.params.id){
        return res.sendStatus(400);
      }
    const existingoffer = await db.oneOffer(req.params.id);
    if(!existingoffer){
      return res.sendStatus(400);
    }
    if(req.authData.id_partenaire !== existingoffer.id_partenaire){
      return res.sendStatus(400);
    }
    const offer = await db.deleteOffer(req.params.id);
    res.status(200).json(offer);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//get toutes les offres par partenaire
protectedRouter.get('/offers', async (req, res, next)=>{
  try {
    const offers = await db.allOfferbyPart(req.authData.id_partenaire);
    res.status(200).json(offers);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//get une offre
protectedRouter.get('/offers/:id', async (req, res, next)=>{
  try {
    if(!req.params.id){
        return res.sendStatus(400);
      }
    const offer = await db.oneOffer(req.params.id);
    //check que c'est bien le partenaire qui a l'offre
    if(req.authData.id_partenaire !== offer.id_partenaire){
      return res.sendStatus(400);
    }
    res.status(200).json(offer);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});


//Events

protectedRouter.post('/events', async (req, res, next)=>{
  try {
    const {titre, description, date_debut, date_fin, lieu, details} = req.body;
    if(!titre || !description || !date_debut || !date_fin || !lieu || !req.authData.id_partenaire){
      return res.sendStatus(400);
    }
    const offer = await db.insertEvent(titre, description, date_debut, date_fin, req.authData.id_partenaire, lieu, details);
    res.status(200).json(offer);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//modificattion event
protectedRouter.put('/events/:id', async (req, res, next)=>{
  try {
    if(!req.params.id){
        return res.sendStatus(400);
      }
    const {titre, description, date_debut, date_fin, lieu, details} = req.body;
    if(!titre || !description || !date_debut || !date_fin || !lieu || !details || !req.authData.id_partenaire){
      return res.sendStatus(400);
    }
    const existingevent = await db.oneEvent(req.params.id);
    if(!existingevent){
      return res.sendStatus(400);
    }
    if(req.authData.id_partenaire !== existingevent.id_partenaire){
      return res.sendStatus(400);
    }
    const offer = await db.updateEvent(req.params.id, titre, description, date_debut, date_fin, lieu, details);
    res.status(200).json(offer);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//suppression event
protectedRouter.delete('/events/:id', async (req, res, next)=>{
  try {
    if(!req.params.id){
        return res.sendStatus(400);
      }
    const existingevent = await db.oneEvent(req.params.id);
    if(!existingevent){
      return res.sendStatus(400);
    }
    if(req.authData.id_partenaire !== existingevent.id_partenaire){
      return res.sendStatus(400);
    }
    const offer = await db.deleteEvent(req.params.id);
    res.status(200).json(offer);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//get les events par partenaire
protectedRouter.get('/events', async (req, res, next)=>{
  try {
    const events = await db.allEventbyPart(req.authData.id_partenaire);
    res.status(200).json(events);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//get un event
protectedRouter.get('/events/:id', async (req, res, next)=>{
  try {
    if(!req.params.id){
        return res.sendStatus(400);
      }
    const event = await db.oneEvent(req.params.id);
    //check que c'est bien le partenaire qui a l'event
    if(req.authData.id_partenaire !== event.id_partenaire){
      return res.sendStatus(400);
    }
    res.status(200).json(event);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});


module.exports = protectedRouter;

