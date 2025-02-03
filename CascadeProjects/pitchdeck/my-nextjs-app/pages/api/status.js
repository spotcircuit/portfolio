import { getLeads } from '../../lib/leadStore';

export default function handler(req, res) {
  res.status(200).json({ leads: getLeads() });
}
