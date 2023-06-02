import { __dirname } from '#utils/file.js';
import path from 'path';
import hbs from 'hbs';
import helpers from 'handlebars-helpers';

export default function handlebars() {
  helpers({ handlebars: hbs });
  hbs.registerPartials(path.join(__dirname, 'views/partials'));
}
