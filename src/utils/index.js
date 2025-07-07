import _ from 'lodash'
const pickData = (objData, fields = []) => {
  return _.pick(objData, fields)
}

export const utils = { pickData }
