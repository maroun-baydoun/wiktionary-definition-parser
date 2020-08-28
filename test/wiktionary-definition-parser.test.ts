import parse from '../src/wiktionary-definition-parser';

import {
  squareBracketsDefinition,
  glossDefinition,
  labelDefinition,
  linkDefinition,
  nongGlossDefinition,
  clippingDefinition,
  shortForDefinition,
  agentNounDefinition,
  alternativeSpellingDefinition,
  gerundDefinition,
  qualifierDefinition,
  verbalNounDefinition,
} from './fixtures';

describe('wiktionary-definition-parser', () => {
  describe('parse', () => {

    it('parses definition containing square brackets', () => {
      const definitions = parse(squareBracketsDefinition, 0);
      expect(definitions).toEqual(['definition1, definition2']);
    });

    it('parses definition containing gloss', () => {
      const definitions = parse(glossDefinition, 0);
      expect(definitions).toEqual(['The definition (word)']);
    });

    it('parses definition containing labels', () => {
      const definitions = parse(labelDefinition, 0);
      expect(definitions).toEqual(['The definition (word1) (word2) (word3)']);
    });

    it('parses definition containing links', () => {
      const definitions = parse(linkDefinition, 0);
      expect(definitions).toEqual(['The definition word1 word2']);
    });

    it('parses definition containing non gloss', () => {
      const definitions = parse(nongGlossDefinition, 0);
      expect(definitions).toEqual(['The definition word1 word2 word3 word4 word5 word6']);
    });

    it('parses definition containing clipping of', () => {
      const definitions = parse(clippingDefinition, 0);
      expect(definitions).toEqual(['short for word']);
    });

    it('parses definition containing short for', () => {
      const definitions = parse(shortForDefinition, 0);
      expect(definitions).toEqual(['short for word']);
    });

    it('parses definition containing agent noun of', () => {
      const definitions = parse(agentNounDefinition, 0);
      expect(definitions).toEqual(['agent noun of word']);
    });

    it('parses definition containing alternative spelling of', () => {
      const definitions = parse(alternativeSpellingDefinition, 0);
      expect(definitions).toEqual(['alternative spelling of word']);
    });

    it('parses definition containing gerund of', () => {
      const definitions = parse(gerundDefinition, 0);
      expect(definitions).toEqual(['gerund of word']);
    });

    it('parses definition containing qualifiers', () => {
      const definitions = parse(qualifierDefinition, 0);
      expect(definitions).toEqual(['The definition (word1) (word2) (word3) (word4)']);
    });

    it('parses definition containing verbal noun', () => {
      const definitions = parse(verbalNounDefinition, 0);
      expect(definitions).toEqual(['verbal noun of word']);
    });
  });
});