import { addLeads, clearLeads } from '../../lib/leadStore';
import { processCSV } from '../../lib/csvProcessor';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Clear previous leads
      clearLeads();

      if (req.headers['content-type']?.includes('multipart/form-data')) {
        // Handle CSV file upload
        const form = new IncomingForm({
          uploadDir: './lead-input',
          keepExtensions: true
        });

        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error('Error parsing form:', err);
            return res.status(500).json({ message: 'Error processing CSV file' });
          }

          const file = files.file[0];
          try {
            const leads = await processCSV(file.filepath);
            addLeads(leads);
            
            // Clean up the uploaded file
            fs.unlink(file.filepath, (err) => {
              if (err) console.error('Error deleting temporary file:', err);
            });

            return res.status(200).json({ 
              message: `${leads.length} leads uploaded successfully from CSV.`,
              leads: leads 
            });
          } catch (error) {
            console.error('Error processing CSV:', error);
            return res.status(500).json({ message: 'Error processing CSV data' });
          }
        });
      } else {
        // Handle JSON data
        const { leads } = req.body;
        if (!Array.isArray(leads)) {
          return res.status(400).json({ message: 'Invalid lead list format.' });
        }
        addLeads(leads);
        return res.status(200).json({ 
          message: `${leads.length} leads uploaded successfully from JSON.`,
          leads: leads 
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ message: 'Server error processing upload' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
