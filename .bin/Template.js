const slug = require('slug');
let Mark = require('markup-js');

Mark.pipes.slug = function (str) {
    return slug(str);
};

class Template {
  constructor(data, options = {}) {
    this.options = options;
    this.data = this.prepare(data);
  }

  render(context) {
    return Mark.up(this.data, context);
  }

  prepare(data) {
    let stripLeadingWhitespaces = this.options.stripLeadingWhitespaces || true;
    data = stripLeadingWhitespaces ? this.stripLeadingWhitespaces(data) : data;
    return data;
  }

  stripLeadingWhitespaces(data) {
    let tokens = data.split('\n');

    let minSpacesCount = tokens.reduce((min, val) => {
      if(val.trim() === '') {
        return min;
      }

      let count = val.indexOf(val.trim());
      if(count < min) {
        return count;
      } else {
        return min;
      }
    }, Number.MAX_VALUE);

    tokens = tokens.map(item => {
      return item.substr(minSpacesCount);
    });

    if(this.options.oneLine) {
      return tokens.join(' ').trim();
    }

    return tokens.join('\n').trim();
  }
}

module.exports = Template;
