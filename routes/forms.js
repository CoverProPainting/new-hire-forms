const express = require('express');
const router = express.Router();
const { sendFormEmail } = require('../utils/email');
const {
  generateEmployeeInfoPDF,
  generateEmergencyContactPDF,
  generateEquipmentPDF,
  generateJobDescriptionPDF,
  generateEmploymentPoliciesPDF,
  generateNewHireChecklistPDF
} = require('../utils/pdf');

router.get('/employee-information', (req, res) => {
  res.render('forms/employee-information');
});

router.post('/employee-information', async (req, res) => {
  try {
    const pdfBuffer = await generateEmployeeInfoPDF(req.body);
    await sendFormEmail('EMPLOYEE INFORMATION FORM', req.body, pdfBuffer);
    res.render('forms/success', { formName: 'Employee Information Form' });
  } catch (error) {
    res.render('forms/error', { error: error.message });
  }
});

router.get('/emergency-contact', (req, res) => {
  res.render('forms/emergency-contact');
});

router.post('/emergency-contact', async (req, res) => {
  try {
    const pdfBuffer = await generateEmergencyContactPDF(req.body);
    await sendFormEmail('EMERGENCY CONTACT INFORMATION', req.body, pdfBuffer);
    res.render('forms/success', { formName: 'Emergency Contact Form' });
  } catch (error) {
    res.render('forms/error', { error: error.message });
  }
});

router.get('/equipment', (req, res) => {
  res.render('forms/equipment');
});

router.post('/equipment', async (req, res) => {
  try {
    const pdfBuffer = await generateEquipmentPDF(req.body);
    await sendFormEmail('EQUIPMENT & ASSET ACKNOWLEDGMENT', req.body, pdfBuffer);
    res.render('forms/success', { formName: 'Equipment & Asset Acknowledgment' });
  } catch (error) {
    res.render('forms/error', { error: error.message });
  }
});

router.get('/job-description', (req, res) => {
  res.render('forms/job-description');
});

router.post('/job-description', async (req, res) => {
  try {
    const pdfBuffer = await generateJobDescriptionPDF(req.body);
    await sendFormEmail('JOB DESCRIPTION ACKNOWLEDGMENT', req.body, pdfBuffer);
    res.render('forms/success', { formName: 'Job Description Acknowledgment' });
  } catch (error) {
    res.render('forms/error', { error: error.message });
  }
});

router.get('/employment-policies', (req, res) => {
  res.render('forms/employment-policies');
});

router.post('/employment-policies', async (req, res) => {
  try {
    const pdfBuffer = await generateEmploymentPoliciesPDF(req.body);
    await sendFormEmail('EMPLOYMENT POLICIES ACKNOWLEDGMENT', req.body, pdfBuffer);
    res.render('forms/success', { formName: 'Employment Policies Acknowledgment' });
  } catch (error) {
    res.render('forms/error', { error: error.message });
  }
});

router.get('/new-hire-checklist', (req, res) => {
  res.render('forms/new-hire-checklist');
});

router.post('/new-hire-checklist', async (req, res) => {
  try {
    const pdfBuffer = await generateNewHireChecklistPDF(req.body);
    await sendFormEmail('NEW HIRE CHECKLIST', req.body, pdfBuffer);
    res.render('forms/success', { formName: 'New Hire Checklist' });
  } catch (error) {
    res.render('forms/error', { error: error.message });
  }
});

module.exports = router;
