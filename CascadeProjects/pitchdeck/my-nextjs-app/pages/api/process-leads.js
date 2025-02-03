import { getLeads, updateLead } from '../../lib/leadStore';
import { generateVideo } from '../../lib/video';
import { sendEmail } from '../../lib/email';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const leads = getLeads();

    // Process each lead sequentially (or you could use Promise.all for parallel processing)
    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      try {
        // Update processing status
        updateLead(i, { processingStatus: 'processing video' });
        const videoUrl = await generateVideo(lead);
        updateLead(i, { videoUrl, processingStatus: 'video generated' });

        // Now send the email with the video embedded or linked
        updateLead(i, { processingStatus: 'sending email' });
        const emailResult = await sendEmail({ ...lead, videoUrl });
        updateLead(i, { emailSent: true, processingStatus: 'completed' });
        console.log(emailResult);
      } catch (error) {
        updateLead(i, { processingStatus: 'error' });
        console.error(`Error processing lead ${lead.ceo}:`, error);
      }
    }

    res.status(200).json({ message: 'Processing complete', leads: getLeads() });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
