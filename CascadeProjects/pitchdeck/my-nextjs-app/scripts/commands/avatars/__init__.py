"""Avatar management commands."""

from .list import list_avatars
from .check import check_avatar, check_all_avatars
from .capture import capture_all_avatars

__all__ = ['list_avatars', 'check_avatar', 'check_all_avatars', 'capture_all_avatars']
