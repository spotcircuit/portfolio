"""Lead management commands."""

from .grab import get_next_lead
from .update import update_lead_status

__all__ = ['get_next_lead', 'update_lead_status']
