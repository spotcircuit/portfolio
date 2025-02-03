let leads = [];

export function addLeads(newLeads) {
  // Validate that each lead has at least url and ceo
  newLeads.forEach((lead) => {
    if (lead.url && lead.ceo) {
      leads.push({
        ...lead,
        videoUrl: null,
        emailSent: false,
        processingStatus: 'pending'
      });
    }
  });
}

export function getLeads() {
  return leads;
}

export function updateLead(index, updateData) {
  leads[index] = { ...leads[index], ...updateData };
}

export function clearLeads() {
  leads = [];
}
