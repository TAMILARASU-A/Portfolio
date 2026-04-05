import PDFDocument from 'pdfkit';


export default function handler(req, res) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Tamilarasu_Resume.pdf"');


    const doc = new PDFDocument();
    doc.pipe(res);


    doc.fontSize(22).text('Tamilarasu A', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('MCA Graduate (May 2026) | Python Developer | AI Portfolio Builder');
    doc.moveDown();
    doc.text('- InterviewXpert');
    doc.text('- Neighborhood Services Network');


    doc.end();
}