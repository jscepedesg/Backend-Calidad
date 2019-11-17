'use strict'

//Models
var TypePay = require('../models/typePay');
var Plan = require('../models/plan');
/*var Company = require('../models/company');
var Client = require('../models/client');
var MedicalProfile = require('../models/medical_profile');
var Kid = require('../models/kid');
var Lunchbox = require('../models/lunchbox');
var Order = require('../models/order');*/

var fs = require('fs');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
var path = require('path');

var controller = {
    //Controladores para modelo TypePay
    saveTypePay: function(req, res)
    {
        var typePay = new TypePay();
        var params = req.body;

        typePay.name = params.name;

        typePay.save((err, typePayStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if(! typePayStored) return res.status(404).send({message: 'No se ha podido guardar el tipo de pago.'});

            return res.status(200).send({typePay: typePayStored});
        });
    },
    getTypePay: function(req, res)
    {
        var typePayId = req.params.id;

        if(typePayId == null)
        {
            return res.status(404).send({message: 'El tipo de pago no existe.'});
        }

        TypePay.findById(typePayId, (err, typePay) => {

            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(! typePay) return res.status(404).send({message: 'El tipo de pago no existe.'});

            return res.status(200).send({
                typePay
            });

        });
    },
    getTypePays: function (req, res)
    {
        TypePay.find({}).exec((err, typePays) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});  
            
            if(!typePays) return res.status(404).send({message: 'No hay datos para mostrar.'});

            return res.status(200).send({typePays});
        });
    },
    updateTypePay: function(req, res)
    {
        var TypePayId = req.params.id;
        var update = req.body;

        TypePay.findByIdAndUpdate(TypePayId, update,{new: true}, (err, typePayUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!typePayUpdate) return res.status(404).send({message: 'No exite el typePay para actualizar.'});

            return res.status(200).send({typePay: typePayUpdate});
        });
    },
    deleteTypePay: function(req, res)
    {
        var typePayId = req.params.id;

        TypePay.findByIdAndDelete(typePayId, (err, typePayRemoved) =>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar el documento.'});

            if(!typePayRemoved) return res.status(404).send({message: 'No se puede eliminar ese typePay.'});

            return res.status(200).send({typePay: typePayRemoved});
        });
    },
    //Controladores para modelo Plan
    savePlan: function(req, res)
    {
        var plan = new Plan();
        var params = req.body;

        plan.plan_premiun = params.plan_premiun;
        plan.payment_period = params.payment_period;
        plan.lunchbox_amount = params.lunchbox_amount;
        plan.pay = params.pay;

        plan.save((err, planStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if(! planStored) return res.status(404).send({message: 'No se ha podido guardar el plan.'});

            return res.status(200).send({plan: planStored});
        });
    },
    getPlan: function(req, res)
    {
        var planId = req.params.id;

        if(planId == null)
        {
            return res.status(404).send({message: 'El plan no existe.'});
        }

        Plan.findById(planId, (err, plan) => {

            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(! plan) return res.status(404).send({message: 'El plan no existe.'});

            TypePay.populate(plan, {path: "pay"},function(err, plan)
            {
                return res.status(200).send({plan});
            });
        });
    },
    getPlans: function (req, res)
    {
        Plan.find({}).exec((err, plans) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});  
            
            if(!plans) return res.status(404).send({message: 'No hay datos para mostrar.'});

            TypePay.populate(plans, {path: "pay"},function(err, plans)
            {
                return res.status(200).send({plans});
            });
        });
    },
    updatePlan: function(req, res)
    {
        var PlanId = req.params.id;
        var update = req.body;

        Plan.findByIdAndUpdate(PlanId, update,{new: true}, (err, planUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!planUpdate) return res.status(404).send({message: 'No exite el plan para actualizar.'});

            return res.status(200).send({plan: planUpdate});
        });
    },
    deletePlan: function(req, res)
    {
        var planId = req.params.id;

        Plan.findByIdAndDelete(planId, (err, planRemoved) =>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar el documento.'});

            if(!planRemoved) return res.status(404).send({message: 'No se puede eliminar ese plan.'});

            return res.status(200).send({plan: planRemoved});
        });
    },
    //Controladores para modelo company
    /*saveCompany: function(req, res)
    {
        var company = new Company();
        var params = req.body;

        company.name = params.name;

        company.save((err, companyStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if(! companyStored) return res.status(404).send({message: 'No se ha podido guardar la empresa.'});

            return res.status(200).send({company: companyStored});
        });
    },
    getCompany: function(req, res)
    {
        var companyId = req.params.id;

        if(companyId == null)
        {
            return res.status(404).send({message: 'La empresa no existe.'});
        }

        Company.findById(companyId, (err, company) => {

            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(! company) return res.status(404).send({message: 'La empresa no existe.'});

            
            return res.status(200).send({company});
        });
    },
    getCompanys: function (req, res)
    {
        Company.find({}).exec((err, companys) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});  
            
            if(!companys) return res.status(404).send({message: 'No hay datos para mostrar.'});

            return res.status(200).send({companys});
        });
    },
    updateCompany: function(req, res)
    {
        var companyId = req.params.id;
        var update = req.body;

        Company.findByIdAndUpdate(companyId, update,{new: true}, (err, companyUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!companyUpdate) return res.status(404).send({message: 'No exite la empresa para actualizar.'});

            return res.status(200).send({company: companyUpdate});
        });
    },
    deleteCompany: function(req, res)
    {
        var companyId = req.params.id;

        Company.findByIdAndDelete(companyId, (err, companyRemoved) =>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar el documento.'});

            if(!companyRemoved) return res.status(404).send({message: 'No se puede eliminar la empresa.'});

            return res.status(200).send({company: companyRemoved});
        });
    },
    //Controladores para modelo Cliente
    saveClient: function(req, res)
    {
        var client = new Client();
        var params = req.body;

        client.name = params.name;
        client.lastName = params.lastName;
        client.email = params.email;
        client.user = params.user;
        client.password = params.password;
        client.birthday = params.birthday;
        client.gender = params.gender;
        client.phone = params.phone;
        client.address = params.address;
        client.plan = params.plan;
        client.is_company = params.is_company;
        client.company = params.company;

        client.save((err, clientStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if(! clientStored) return res.status(404).send({message: 'No se ha podido guardar el cliente.'});

            return res.status(200).send({client: clientStored});
        });
    },
    getClient: function(req, res)
    {
        var clientId = req.params.id;

        if(clientId == null)
        {
            return res.status(404).send({message: 'El cliente no existe.'});
        }

        Client.findById(clientId, (err, client) => {

            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(! client) return res.status(404).send({message: 'El cliente no existe.'});

            Plan.populate(client, {path: "plan"},function(err, client)
            {
                Company.populate(client, {path: "company"}, function(err, client)
                {
                    return res.status(200).send({client});
                });
            });
        });
    },
    getClients: function (req, res)
    {
        Client.find({}).exec((err, clients) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});  
            
            if(!clients) return res.status(404).send({message: 'No hay datos para mostrar.'});

            Plan.populate(clients, {path: "plan"},function(err, client)
            {
                Company.populate(client, {path: "company"}, function(err, client)
                {
                    return res.status(200).send({client});
                });
            });
        });
    },
    updateClient: function(req, res)
    {
        var ClientId = req.params.id;
        var update = req.body;

        Client.findByIdAndUpdate(ClientId, update,{new: true}, (err, clientUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!clientUpdate) return res.status(404).send({message: 'No exite el cliente para actualizar.'});

            Plan.populate(clientUpdate, {path: "plan"},function(err, client)
            {
                Company.populate(client, {path: "company"}, function(err, client)
                {
                    return res.status(200).send({client: client});
                });
            });
        });
    },
    deleteClient: function(req, res)
    {
        var clientId = req.params.id;

        Client.findByIdAndDelete(clientId, (err, clientRemoved) =>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar el documento.'});

            if(!clientRemoved) return res.status(404).send({message: 'No se puede eliminar ese cliente.'});

            return res.status(200).send({client: clientRemoved});
        });
    },
    //Controladores para modelo medical_profile
    saveMedicalProfile: function(req, res)
    {
        var medicalProfile = new MedicalProfile();
        var params = req.body;

        medicalProfile.description = params.description;
        medicalProfile.allergies = params.allergies;

        medicalProfile.save((err, medicalProfileStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if(! medicalProfileStored) return res.status(404).send({message: 'No se ha podido guardar el perfil medico.'});

            return res.status(200).send({medicalProfile: medicalProfileStored});
        });
    },
    getMedicalProfile: function(req, res)
    {
        var medicalProfileId = req.params.id;

        if(medicalProfileId == null)
        {
            return res.status(404).send({message: 'El perfil medico no existe.'});
        }

        MedicalProfile.findById(medicalProfileId, (err, medicalProfile) => {

            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(! medicalProfile) return res.status(404).send({message: 'El perdil medico no existe.'});

            
            return res.status(200).send({medicalProfile});
        });
    },
    getMedicalProfiles: function (req, res)
    {
        MedicalProfile.find({}).exec((err, medicalProfiles) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});  
            
            if(!medicalProfiles) return res.status(404).send({message: 'No hay datos para mostrar.'});

            return res.status(200).send({medicalProfiles});
        });
    },
    updateMedicalProfile: function(req, res)
    {
        var medicalProfileId = req.params.id;
        var update = req.body;

        MedicalProfile.findByIdAndUpdate(medicalProfileId, update,{new: true}, (err, medicalProfileUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!medicalProfileUpdate) return res.status(404).send({message: 'No exite el perfil medico para actualizar.'});

            return res.status(200).send({medicalProfile: medicalProfileUpdate});
        });
    },
    deleteMedicalProfile: function(req, res)
    {
        var medicalProfileId = req.params.id;

        MedicalProfile.findByIdAndDelete(medicalProfileId, (err, medicalProfileRemoved) =>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar el documento.'});

            if(!medicalProfileRemoved) return res.status(404).send({message: 'No se puede eliminar el perfil medico.'});

            return res.status(200).send({medicalProfile: medicalProfileRemoved});
        });
    },
    //Controladores para modelo kid
    saveKid: function(req, res)
    {
        var kid = new Kid();
        var params = req.body;

        kid.name = params.name;
        kid.lastName = params.lastName;
        kid.gender = params.gender;
        kid.birthday = params.birthday;
        kid.dad = params.dad;
        kid.medicalProfile = params.medicalProfile;

        kid.save((err, kidStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if(! kidStored) return res.status(404).send({message: 'No se ha podido guardar el niño.'});

            return res.status(200).send({kid: kidStored});
        });
    },
    getKid: function(req, res)
    {
        var kidId = req.params.id;

        if(kidId == null)
        {
            return res.status(404).send({message: 'El niño no existe.'});
        }

        Kid.findById(kidId, (err, kid) => {

            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(! kid) return res.status(404).send({message: 'El niño no existe.'});

            Client.populate(kid, {path: "dad"},function(err, kid)
            {
                MedicalProfile.populate(kid, {path: "medicalProfile"}, function(err, kid)
                {
                    return res.status(200).send({kid});
                });
            });
        });
    },
    getKids: function (req, res)
    {
        Kid.find({}).exec((err, kids) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});  
            
            if(!kids) return res.status(404).send({message: 'No hay datos para mostrar.'});

            Client.populate(kids, {path: "dad"},function(err, kid)
            {
                MedicalProfile.populate(kid, {path: "medicalProfile"}, function(err, kid)
                {
                    return res.status(200).send({kid});
                });
            });
        });
    },
    updateKid: function(req, res)
    {
        var kidId = req.params.id;
        var update = req.body;

        Kid.findByIdAndUpdate(kidId, update,{new: true}, (err, kidUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!kidUpdate) return res.status(404).send({message: 'No exite el niño para actualizar.'});

            Client.populate(kidUpdate, {path: "dad"},function(err, kid)
            {
                MedicalProfile.populate(kid, {path: "medicalProfile"}, function(err, kid)
                {
                    return res.status(200).send({kid});
                });
            });
        });
    },
    deleteKid: function(req, res)
    {
        var kidId = req.params.id;

        Kid.findByIdAndDelete(kidId, (err, kidRemoved) =>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar el documento.'});

            if(!kidRemoved) return res.status(404).send({message: 'No se puede eliminar ese niño.'});

            return res.status(200).send({kid: kidRemoved});
        });
    },
    //Controladores para modelo lunchbox
    saveLunchbox: function(req, res)
    {
        var lunchbox = new Lunchbox();
        var params = req.body;

        lunchbox.name = params.name;
        lunchbox.ingredients = params.ingredients;
        lunchbox.plan = params.plan;

        lunchbox.save((err, lunchboxStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if(! lunchboxStored) return res.status(404).send({message: 'No se ha podido guardar la lonchera.'});

            return res.status(200).send({lunchbox: lunchboxStored});
        });
    },
    getLunchbox: function(req, res)
    {
        var lunchboxId = req.params.id;

        if(lunchboxId == null)
        {
            return res.status(404).send({message: 'La lonchera no existe.'});
        }

        Lunchbox.findById(lunchboxId, (err, lunchbox) => {

            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(! lunchbox) return res.status(404).send({message: 'La lonchera no existe.'});

            Plan.populate(lunchbox, {path: "plan"},function(err, lunchbox)
            {
                    return res.status(200).send({lunchbox});
            });
        });
    },
    getLunchboxs: function (req, res)
    {
        Lunchbox.find({}).exec((err, lunchboxs) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});  
            
            if(!lunchboxs) return res.status(404).send({message: 'No hay datos para mostrar.'});

            Plan.populate(lunchboxs, {path: "plan"},function(err, lunchbox)
            {
                    return res.status(200).send({lunchbox});
            });
        });
    },
    updateLunchbox: function(req, res)
    {
        var lunchboxId = req.params.id;
        var update = req.body;

        Lunchbox.findByIdAndUpdate(lunchboxId, update,{new: true}, (err, lunchboxUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!lunchboxUpdate) return res.status(404).send({message: 'No exite la lonchera para actualizar.'});

            Plan.populate(lunchboxUpdate, {path: "plan"},function(err, lunchbox)
            {
                    return res.status(200).send({lunchbox});
            });
        });
    },
    deleteLunchbox: function(req, res)
    {
        var lunchboxId = req.params.id;

        Lunchbox.findByIdAndDelete(lunchboxId, (err, LunchBoxRemoved) =>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar el documento.'});

            if(!LunchBoxRemoved) return res.status(404).send({message: 'No se puede eliminar esa lonchera.'});

            return res.status(200).send({lunchbox: LunchBoxRemoved});
        });
    },
    //Controladores para modelo order
    saveOrder: function(req, res)
    {
        var order = new Order();
        var params = req.body;

        order.type_lunchbox = params.type_lunchbox;
        order.quantity = params.quantity;

        order.save((err, orderStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if(! orderStored) return res.status(404).send({message: 'No se ha podido guardar el pedido.'});

            return res.status(200).send({order: orderStored});
        });
    },
    getOrder: function(req, res)
    {
        var orderId = req.params.id;

        if(orderId == null)
        {
            return res.status(404).send({message: 'El pedido no existe.'});
        }

        Order.findById(orderId, (err, order) => {

            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(! order) return res.status(404).send({message: 'El pedido no existe.'});

            Lunchbox.populate(order, {path: "type_lunchbox"},function(err, order)
            {
                    return res.status(200).send({order});
            });
        });
    },
    getOrders: function (req, res)
    {
        Order.find({}).exec((err, orders) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});  
            
            if(!orders) return res.status(404).send({message: 'No hay datos para mostrar.'});

            Lunchbox.populate(orders, {path: "type_lunchbox"},function(err, order)
            {
                    return res.status(200).send({order});
            });
        });
    },
    updateOrder: function(req, res)
    {
        var orderId = req.params.id;
        var update = req.body;

        Order.findByIdAndUpdate(orderId, update,{new: true}, (err, orderUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!orderUpdate) return res.status(404).send({message: 'No exite el pedido para actualizar.'});

            Lunchbox.populate(orderUpdate, {path: "type_lunchbox"},function(err, order)
            {
                    return res.status(200).send({order});
            });
        });
    },
    deleteOrder: function(req, res)
    {
        var orderId = req.params.id;

        Order.findByIdAndDelete(orderId, (err, orderRemoved) =>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar el documento.'});

            if(!orderRemoved) return res.status(404).send({message: 'No se puede eliminar el pedido.'});

            return res.status(200).send({order: orderRemoved});
        });
    },
    loginUsuario: function(req, res)
    {
        Client.find({email: req.body.email, password: req.body.password }, (err, client) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if(!client) return res.status(404).send({message: 'No existe el usuario'});

            req.client= client;

            if(client!="")
            {
              return res.status(200).send(
                {
                    message: "Te has logueado correctamente",
                    usuario: client,
                    token:createToken(client)
                });
            }

            return res.status(401).send({message: 'No autorizado'});
            
        });
    }*/

};

function createToken(user)
{
    const payload = 
    {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix
    }

    return jwt.encode(payload, config.SECRET_TOKEN);
}

module.exports = controller;