
export const parse = (wikitext: string, startIndex: number): string[] => {
  return parseDefinitions(wikitext, startIndex);
}

const parseDefinitions = (wikitext: string, startIndex: number, definitions: string[] = []): string[] => {
  const newLineIndex = wikitext.indexOf('\n', startIndex);
  const definition = wikitext.substring(startIndex, newLineIndex)
    //Remove the leading # and space
    .replace(/^#\s/, '')
    //Replace [[definition]] with `definition` and [[text | definition]] with `definition`
    .replace(/\[\[(?:[\w\s]+\|)?([^,\]\[]+)\]\]/g, '$1')
    //Replace {{gloss|word}} with (word)
    .replace(/{{gloss\|([^{}]+)}}/g, '($1)')
    //Replace {{label|lang|word}} with `word`
    .replace(/{{(?:lb|lbl|label)\|[\w-]+\|(.[^{}]+)}}/g, (_, label) => `(${label})`.replace(/\|/g, ', ').replace(/_,/g, ''))
    //Replace {{link|lang|word}} with `word`
    .replace(/{{(?:l|link)\|[\w-]+\|(.[^{}]+)}}/g, '$1')
    //Replace {{non-gloss definition|word}} {{non-gloss|word}} and derivatives with word
    .replace(/{{(?:non[-\s]gloss(?:\sdefinition)?|(?:n-g)|(?:ngd))\|(.[^{}]+)}}/g, '$1')
    //Replace {{clipping of|lang|word}} with `Short for word`
    .replace(/{{clipping of\|[\w-]+\|(.[^{}]+)}}/g, 'short for $1')
    //Replace {{short for|lang|word}} with `Short for word`
    .replace(/{{short for\|[\w-]+\|(.[^{}]+)}}/g, 'short for $1')
    //Replace {{agent noun of|lang|verb}} with `Agent noun of verb`
    .replace(/{{agent noun of\|[\w-]+\|(.[^{}]+)}}/g, 'agent noun of $1')
    //Replace {{alternative spelling of|lang|word}} with `Alternative spelling of word`
    .replace(/{{alternative spelling of\|[\w-]+\|(.[^{}]+)}}/g, 'alternative spelling of $1')
    //Replace {{gerund of|lang|verb}} with `gerund of verb`
    .replace(/{{gerund of\|[\w-]+\|(.[^{}]+)}}/g, 'gerund of $1')
    //Replace {{verbal noun of|lang|verb}} with `verbal noun of verb`
    .replace(/{{verbal noun of\|[\w-]+\|(.[^{}]+)}}/g, 'verbal noun of $1')
    //Replace {{qualifier|text}} and its derivatives with (text)
    .replace(/{{(?:qualifier|qual|q|i)\|([\w\s]+)}}/g, '($1)')
    .trim();

  if (newLineIndex === -1 || wikitext.charAt(newLineIndex + 1) !== '#') {
    return [...definitions, definition].filter(def => def.match(/^(#[^\s]+)\s/) == null);
  }

  return parseDefinitions(wikitext, newLineIndex + 1, [...definitions, definition]);

}

export default parse;