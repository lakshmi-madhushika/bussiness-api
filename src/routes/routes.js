const express = require('express');
const router = express.Router();
const controllerConfig=require('../controllers/controllers');
const updatesConfig=require('../controllers/updates');
const chartsConfig=require('../controllers/charts');
const chartsgarConfig=require('../controllers/chartsgar');
const getordersconfig=require('../controllers/getorders');
 
router.post('/createreports',controllerConfig.createreport); // create all reports when we create dailyreport db at first time
router.get('/readone/:id/:month/:year',controllerConfig.getareport); //read a reports according to garment id, year, month
router.get('/read',controllerConfig.getreports);    // read all reports
router.delete('/delete/:id',controllerConfig.deletereport);  // delete a report 
router.put('/update/:id',controllerConfig.updaterepo);  // update a report

router.get('/acount',updatesConfig.updatesadmincount); // calculate ongoing,late orders and quotations  of admin
router.get('/ccount/:id',updatesConfig.updatescustomercount); // calculate ongoing,late orders and quotations  of customer
router.get('/gcount/:id',updatesConfig.updatesgarmentcount); // calculate ongoing,late orders and quotations  of garment

router.get('/chart',chartsConfig.achartcreate);  // get last 12 month revenus for admin
router.get('/chartg/:id',chartsgarConfig.gchartcreate); // get last 12 month revenus for garment

router.get('/getorders',getordersconfig.getadminorders); 
router.get('/getordersg/:id',getordersconfig.getgarmentorders);

module.exports = router;