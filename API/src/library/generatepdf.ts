
const PDFDocument = require('pdfkit');
const fs = require('fs');


// Function to generate user profile PDF
export const generateUserProfilePDF = (res: any, user: any) => {
    // Set response headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="profile.pdf"');
    // Create a new PDF document
    const doc = new PDFDocument();
    // Pipe the PDF document to a writable stream
    const outputStream = fs.createWriteStream('profile.pdf');
    doc.pipe(outputStream);
    // Function to align text to the left side
    function leftAlignText(text: string, y: number, fontSize: number = 12) {
        const x = doc.page.margins.left;
        doc.font('Helvetica').fontSize(fontSize).text(text, x, y);
    }
    // Set document properties
    doc.info.Title = 'User Profile';
    doc.info.Author = 'Your Company Name';
    // Add header
    //   doc.image('logo.png', doc.page.margins.left, doc.page.margins.top, { width: 100 });
    doc.fontSize(14).text('Bio Data', doc.page.margins.left, doc.page.margins.top - 2, { align: 'center' });
    // Add user profile information
    leftAlignText(`ProfileId: ${user?.profileId}`,150)
    leftAlignText(`Name: ${user?.firstName + user?.lastName}`, 170);
    leftAlignText(`DOB:${user?.dateOfBirth}`,190)
    leftAlignText(`Time of Birth: ${user?.horoscopeDetails?.timeOfBirth?.hours+`:`+user?.horoscopeDetails?.timeOfBirth?.minutes+user?.horoscopeDetails?.timeOfBirth?.hourPeriod}`,210)
    leftAlignText(`Gender:${user?.gender}`,240)
    leftAlignText(`Age: ${user?.age}`, 260);
    leftAlignText(`Height: ${user?.generalDetails?.height}`, 280);
    leftAlignText(`PhysicalStatus: ${user?.generalDetails?.physicalStatus}`, 300);
    leftAlignText(`Education: ${user?.generalDetails?.education}`, 320);
    leftAlignText(`EmployedIn: ${user?.generalDetails?.employedIn}`, 340);
    leftAlignText(`Occupation: ${user?.generalDetails?.occupation}`, 360);
    leftAlignText(`Income: ${user?.generalDetails?.income}`, 380);
    leftAlignText(`Family Status: ${user?.generalDetails?.familyStatus}`, 400);
    leftAlignText(`Family Value: ${user?.generalDetails?.familyValue}`, 420);
    leftAlignText(`family Type: ${user?.generalDetails?.familyType}`, 440);

    leftAlignText(`Email: ${user?.email}`, 500);
    
    // Add footer
    doc.fontSize(8).text('© 2023 Your Company. All rights reserved.', doc.page.margins.left, doc.page.height - doc.page.margins.bottom - 10);
    // Stream the PDF document directly to the response
    doc.pipe(res);
    doc.end();
};

