import * as igcXcScore from 'igc-xc-score';

// TODO: this should be `keyof typeof igcXcScore.scoringRules` if the types were correct
export const scoringRulesNames = [
  'CzechLocal',
  'CzechEuropean',
  'CzechOutsideEurope',
  'FederationFrancaiseVolLibre',
  'Leonardo',
  'Norway',
  'UnitedKingdomClub',
  'UnitedKingdomInternational',
  'UnitedKingdomNational',
  'XContest',
  'XContestPPG',
  'WorldXC',
] as const;

export type ScoringRuleNames = (typeof scoringRulesNames)[number];

// TODO: Export the rules from igc-xc-score
const scoringBaseModel = igcXcScore.scoringRules['XContest'];
const openDistanceBase = scoringBaseModel[0];
const freeTriangleBase = scoringBaseModel[1];
const faiTriangleBase = scoringBaseModel[2];
const outAndReturnBase = igcXcScore.scoringRules['FAI-OAR'][0];

const czechLocalRule = [
  { ...openDistanceBase, multiplier: 1 },
  { ...freeTriangleBase, multiplier: 1.8 },
  { ...faiTriangleBase, multiplier: 2.2 },
];

const czechEuropeRule = [
  { ...openDistanceBase, multiplier: 1 },
  { ...freeTriangleBase, multiplier: 1.2 },
  { ...faiTriangleBase, multiplier: 1.4 },
];

const czechOutEuropeRule = [
  { ...openDistanceBase, multiplier: 0.8 },
  { ...freeTriangleBase, multiplier: 1.2 },
  { ...faiTriangleBase, multiplier: 1.4 },
];

const leonardoRule = [
  { ...openDistanceBase, multiplier: 1.5 },
  { ...freeTriangleBase, multiplier: 1.75, closingDistanceRelative: 0.2 },
  { ...faiTriangleBase, multiplier: 2, closingDistanceRelative: 0.2 },
];

const norwayRule = [
  { ...openDistanceBase, multiplier: 1 },
  { ...freeTriangleBase, multiplier: 1.7, closingDistanceRelative: 0.05 },
  { ...freeTriangleBase, multiplier: 1.5, closingDistanceRelative: 0.2 },
  { ...faiTriangleBase, multiplier: 2.4, closingDistanceRelative: 0.05 },
  { ...faiTriangleBase, multiplier: 2.2, closingDistanceRelative: 0.2 },
];

const ukXclClubRule = [
  { ...openDistanceBase, multiplier: 1, minDistance: 5 },
  { ...outAndReturnBase, multiplier: 1.2, minDistance: 5 },
  { ...outAndReturnBase, multiplier: 1.3, minDistance: 15 },
  { ...outAndReturnBase, multiplier: 1.7, minDistance: 35 },
  { ...freeTriangleBase, multiplier: 1.2, minDistance: 5 },
  { ...freeTriangleBase, multiplier: 1.3, minDistance: 15 },
  { ...freeTriangleBase, multiplier: 1.7, minDistance: 35 },
  { ...faiTriangleBase, multiplier: 1.5, minDistance: 5 },
  { ...faiTriangleBase, multiplier: 1.7, minDistance: 15 },
  { ...faiTriangleBase, multiplier: 2, minDistance: 35 },
];

const ukXclInternationalRule = [
  { ...openDistanceBase, multiplier: 1, minDistance: 10 },
  { ...outAndReturnBase, multiplier: 1.2, minDistance: 35 },
  { ...freeTriangleBase, multiplier: 1.2, minDistance: 35 },
  { ...faiTriangleBase, multiplier: 1.5, minDistance: 25 },
];

const ukXclNationalRule = [
  { ...openDistanceBase, multiplier: 1, minDistance: 10 },
  { ...outAndReturnBase, multiplier: 1.3, minDistance: 15 },
  { ...outAndReturnBase, multiplier: 1.7, minDistance: 35 },
  { ...freeTriangleBase, multiplier: 1.3, minDistance: 15 },
  { ...freeTriangleBase, multiplier: 1.7, minDistance: 35 },
  { ...faiTriangleBase, multiplier: 1.7, minDistance: 15 },
  { ...faiTriangleBase, multiplier: 2, minDistance: 25 },
];

const xContestPpgRule = [
  { ...openDistanceBase, multiplier: 1 },
  { ...freeTriangleBase, multiplier: 2, closingDistanceFixed: 0.8 },
  { ...faiTriangleBase, multiplier: 4, closingDistanceFixed: 0.8 },
];

const wxcRule = [
  { ...openDistanceBase, multiplier: 1 },
  { ...freeTriangleBase, multiplier: 1.75, closingDistanceRelative: 0.2 },
  { ...faiTriangleBase, multiplier: 2, closingDistanceFixed: 0.2 },
];

export const scoringRules: Map<ScoringRuleNames, object> = new Map([
  ['CzechEuropean', czechEuropeRule],
  ['CzechLocal', czechLocalRule],
  ['CzechOutsideEurope', czechOutEuropeRule],
  ['FederationFrancaiseVolLibre', igcXcScore.scoringRules['FFVL']],
  ['Leonardo', leonardoRule],
  ['Norway', norwayRule],
  ['UnitedKingdomClub', ukXclClubRule],
  ['UnitedKingdomInternational', ukXclInternationalRule],
  ['UnitedKingdomNational', ukXclNationalRule],
  ['XContest', igcXcScore.scoringRules['XContest']],
  ['XContestPPG', xContestPpgRule],
  ['WorldXC', wxcRule],
]);
