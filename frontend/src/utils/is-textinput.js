export default function isTextInput(element) {
  var tagName = element.tagName.toLowerCase();
  if (tagName === 'textarea') return true;
  if (tagName !== 'input') return false;
  var type = element.getAttribute('type').toLowerCase(),
    // if any of these input types is not supported by a browser, it will behave as input type text.
    inputTypes = [
      'text',
      'password',
      'number',
      'email',
      'tel',
      'url',
      'search',
      'date',
      'datetime',
      'datetime-local',
      'time',
      'month',
      'week'
    ];
  return inputTypes.indexOf(type) >= 0;
}
