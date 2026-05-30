const PDFDocument = require('pdfkit');

function generateEmployeeInfoPDF(data) {
  const doc = new PDFDocument({ margin: 40 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).font('Helvetica-Bold').text('EMPLOYEE INFORMATION FORM', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica').text('Please complete all sections. This information is confidential and used for employment records only.', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Personal Information');
  doc.moveDown(0.3);
  
  const fields = [
    ['Legal First Name:', data.firstName],
    ['Middle Name:', data.middleName],
    ['Last Name:', data.lastName],
    ['Preferred Name:', data.preferredName],
    ['Date of Birth:', data.dateOfBirth],
    ['Social Security Number:', data.ssn]
  ];

  fields.forEach(([label, value]) => {
    doc.fontSize(10).font('Helvetica-Bold').text(label);
    doc.fontSize(10).font('Helvetica').text(value || '___________________________________');
    doc.moveDown(0.2);
  });

  doc.moveDown();
  doc.fontSize(12).font('Helvetica-Bold').text('Contact Information');
  doc.moveDown(0.3);

  const contactFields = [
    ['Street Address:', data.streetAddress],
    ['City:', data.city],
    ['State:', data.state],
    ['ZIP Code:', data.zip],
    ['Primary Phone:', data.primaryPhone],
    ['Secondary Phone:', data.secondaryPhone],
    ['Personal Email:', data.email]
  ];

  contactFields.forEach(([label, value]) => {
    doc.fontSize(10).font('Helvetica-Bold').text(label);
    doc.fontSize(10).font('Helvetica').text(value || '___________________________________');
    doc.moveDown(0.2);
  });

  doc.moveDown();
  doc.fontSize(10).font('Helvetica').text('I certify that the information provided above is true and accurate to the best of my knowledge.');
  doc.moveDown(0.5);
  doc.fontSize(9).text(data.signature || '___________________________________');
  doc.fontSize(9).text('Employee Signature');
  doc.moveDown(0.2);
  doc.fontSize(9).text(new Date().toLocaleDateString() || '_______________');
  doc.fontSize(9).text('Date');

  doc.end();
  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
}

function generateEmergencyContactPDF(data) {
  const doc = new PDFDocument({ margin: 40 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).font('Helvetica-Bold').text('EMERGENCY CONTACT INFORMATION', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica').text('Please provide at least two emergency contacts.', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Primary Emergency Contact');
  doc.moveDown(0.3);

  const primaryFields = [
    ['Full Name:', data.primaryName],
    ['Relationship:', data.primaryRelationship],
    ['Primary Phone:', data.primaryPhone1],
    ['Secondary Phone:', data.primaryPhone2],
    ['Email:', data.primaryEmail]
  ];

  primaryFields.forEach(([label, value]) => {
    doc.fontSize(10).font('Helvetica-Bold').text(label);
    doc.fontSize(10).font('Helvetica').text(value || '___________________________________');
    doc.moveDown(0.2);
  });

  doc.moveDown();
  doc.fontSize(12).font('Helvetica-Bold').text('Secondary Emergency Contact');
  doc.moveDown(0.3);

  const secondaryFields = [
    ['Full Name:', data.secondaryName],
    ['Relationship:', data.secondaryRelationship],
    ['Primary Phone:', data.secondaryPhone1],
    ['Secondary Phone:', data.secondaryPhone2],
    ['Email:', data.secondaryEmail]
  ];

  secondaryFields.forEach(([label, value]) => {
    doc.fontSize(10).font('Helvetica-Bold').text(label);
    doc.fontSize(10).font('Helvetica').text(value || '___________________________________');
    doc.moveDown(0.2);
  });

  doc.moveDown();
  doc.fontSize(10).text(data.signature || '___________________________________');
  doc.fontSize(9).text('Employee Signature');
  doc.moveDown(0.2);
  doc.fontSize(9).text(new Date().toLocaleDateString() || '_______________');
  doc.fontSize(9).text('Date');

  doc.end();
  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
}

function generateEquipmentPDF(data) {
  const doc = new PDFDocument({ margin: 40 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).font('Helvetica-Bold').text('EQUIPMENT & ASSET ACKNOWLEDGMENT', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica').text('I acknowledge receipt of the following company property and agree to return all items in good condition.', { align: 'center' });
  doc.moveDown();

  const items = [
    { name: 'Company Vehicle', desc: data.eq1Desc, date: data.eq1Date },
    { name: 'Vehicle Keys', desc: data.eq2Desc, date: data.eq2Date },
    { name: 'iPad/Tablet', desc: data.eq3Desc, date: data.eq3Date },
    { name: 'Company Credit Card', desc: data.eq4Desc, date: data.eq4Date },
    { name: 'Office Keys', desc: data.eq5Desc, date: data.eq5Date },
    { name: 'Phone/Phone Number', desc: data.eq6Desc, date: data.eq6Date }
  ];

  items.forEach((item) => {
    doc.fontSize(10).font('Helvetica-Bold').text(`☐ ${item.name}`);
    doc.fontSize(9).font('Helvetica').text(`Description: ${item.desc || '___________________________________'}`);
    doc.fontSize(9).text(`Date Issued: ${item.date || '_______________'}`);
    doc.moveDown(0.3);
  });

  doc.moveDown();
  doc.fontSize(10).text(data.signature || '___________________________________');
  doc.fontSize(9).text('Employee Signature');

  doc.end();
  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
}

function generateJobDescriptionPDF(data) {
  const doc = new PDFDocument({ margin: 40 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).font('Helvetica-Bold').text('JOB DESCRIPTION ACKNOWLEDGMENT', { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).font('Helvetica-Bold').text('Position:');
  doc.fontSize(10).font('Helvetica').text(data.position || '___________________________________');
  doc.moveDown();
  doc.fontSize(10).text('I acknowledge that I have received, read, and understand my job description. I understand that my employment is at-will.');
  doc.moveDown();
  doc.fontSize(10).text(data.signature || '___________________________________');
  doc.fontSize(9).text('Employee Signature');
  doc.moveDown(0.2);
  doc.fontSize(9).text(new Date().toLocaleDateString() || '_______________');
  doc.fontSize(9).text('Date');

  doc.end();
  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
}

function generateEmploymentPoliciesPDF(data) {
  const doc = new PDFDocument({ margin: 40 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).font('Helvetica-Bold').text('EMPLOYMENT POLICIES ACKNOWLEDGMENT', { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text('I acknowledge that I have read and understand the employment policies outlined, including: 90-day mutual review period, at-will employment, wage compensation, Washington State paid sick leave, and professional conduct expectations. I agree to comply with all company policies and procedures.');
  doc.moveDown();
  doc.fontSize(10).text(data.signature || '___________________________________');
  doc.fontSize(9).text('Employee Signature');
  doc.moveDown(0.2);
  doc.fontSize(9).text(new Date().toLocaleDateString() || '_______________');
  doc.fontSize(9).text('Date');

  doc.end();
  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
}

function generateDirectDepositPDF(data) {
  const doc = new PDFDocument({ margin: 40 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).font('Helvetica-Bold').text('DIRECT DEPOSIT AUTHORIZATION', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica').text('Authorization to deposit paycheck directly to bank account.', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Account Holder Information');
  doc.moveDown(0.3);
  
  const holderFields = [
    ['First Name:', data.firstName],
    ['Last Name:', data.lastName]
  ];

  holderFields.forEach(([label, value]) => {
    doc.fontSize(10).font('Helvetica-Bold').text(label);
    doc.fontSize(10).font('Helvetica').text(value || '___________________________________');
    doc.moveDown(0.2);
  });

  doc.moveDown();
  doc.fontSize(12).font('Helvetica-Bold').text('Bank Account Information');
  doc.moveDown(0.3);

  const bankFields = [
    ['Bank Name:', data.bankName],
    ['Account Type:', data.accountType],
    ['Routing Number:', data.routingNumber],
    ['Account Number:', data.accountNumber]
  ];

  bankFields.forEach(([label, value]) => {
    doc.fontSize(10).font('Helvetica-Bold').text(label);
    doc.fontSize(10).font('Helvetica').text(value || '___________________________________');
    doc.moveDown(0.2);
  });

  doc.moveDown();
  doc.fontSize(10).text(data.signature || '___________________________________');
  doc.fontSize(9).text('Employee Signature');
  doc.moveDown(0.2);
  doc.fontSize(9).text(new Date().toLocaleDateString() || '_______________');
  doc.fontSize(9).text('Date');

  doc.end();
  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
}

module.exports = {
  generateEmployeeInfoPDF,
  generateEmergencyContactPDF,
  generateEquipmentPDF,
  generateJobDescriptionPDF,
  generateEmploymentPoliciesPDF,
  generateDirectDepositPDF
};
