import { parse } from 'csv-parse';
import fs from 'fs';

export function processCSV(filePath) {
  return new Promise((resolve, reject) => {
    const leads = [];
    
    fs.createReadStream(filePath)
      .pipe(parse({
        columns: true,
        skip_empty_lines: true
      }))
      .on('data', (row) => {
        // Extract relevant information from CSV
        const lead = {
          firstName: row.firstName || '',
          lastName: row.lastName || '',
          email: row.email || '',
          companyName: row.companyName || '',
          companyDomain: row.companyDomain || '',
          linkedinUrl: row.linkedinUrl || '',
          city: row.city || '',
          country: row.country || '',
          role: row.employment_history_0_title || ''
        };
        leads.push(lead);
      })
      .on('end', () => {
        resolve(leads);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
