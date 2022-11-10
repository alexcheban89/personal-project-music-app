function firstLetterUppercase(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  function wikiTitle(name) {
    return name.split(/\s+/)
      .map(w => firstLetterUppercase(w))
      .join('_');
  }
  
  function readExtract(json) {
    const { pages } = json.query;
    const firstKey = Object.keys(pages)[0];
    return pages[firstKey].extract;
  }
  
  module.exports.wikiTitle = wikiTitle;
  module.exports.parse = readExtract;
  