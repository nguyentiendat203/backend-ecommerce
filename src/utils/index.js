import _ from 'lodash'
const pickData = (objData, fields = []) => {
  return _.pick(objData, fields)
}

const apiErrorHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

export const utils = { pickData, apiErrorHandler }
