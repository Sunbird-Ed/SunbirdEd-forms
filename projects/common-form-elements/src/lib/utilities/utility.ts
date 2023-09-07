import * as _ from 'lodash-es';

export const getAllDependencyFieldValues = (depends) => {
  return _.map(depends, (depend, key) => {
    return {
      field : key,
      value: depend.value,
      ...(depend.sourceCategory && {sourceCategory: depend.sourceCategory}),
      ...(depend.output && {output: depend.output})
    };
  });
};


export const getSelectedCategoryTerms = (dependencyTerms, depends) => {
  const terms = [];
  const dependencyValues =  getAllDependencyFieldValues(depends);
  _.forEach(dependencyTerms, term => {
    _.forEach(dependencyValues, (depend) => {
          if (term.category === (depend.sourceCategory || depend.field) &&
          _.includes(depend.value, depend.output ? term[depend.output] : term.name)) {
            terms.push(term);
          } else if (_.toLower(term.objectType) === _.toLower((depend.sourceCategory || depend.field)) &&
          _.includes(depend.value, depend.output ? term[depend.output] : term.name)) {
            terms.push(term);
          } else if (_.toLower(term.code) === _.toLower((depend.sourceCategory || depend.field)) &&
          _.includes(depend.value, depend.output ? term[depend.output] : term.name)) {
            terms.push(term);
          } else if (_.toLower(term.code) === _.toLower((depend.sourceCategory || depend.field)) &&
          _.includes(depend.value, depend.output ? term[depend.output] : term.name)) {
            terms.push(term);
          }
      });
  });
  return terms;
};


export const getAssociation = (terms) => {
  return _.compact(_.flatten(_.map(terms, term =>  {
    return term.associations || term.categories;
  })));
};
