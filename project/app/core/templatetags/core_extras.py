from django import template
import re

register = template.Library()

# @register.filter

@register.simple_tag
def splitbytag(value, arg):
    # split by html tag. Rule: <*>*</*>
    # return re.split('(<[^>]*>[^<]*</[^>]*>)', html)[1::2]
    return value
