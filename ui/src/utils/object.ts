/**
 * Parse all number values in an object
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
export const parseNumValues = (obj: { [key: string]: any }): { [key: string]: any } => {
  const parsedObj: { [key: string]: any } = {}

  for (const key in obj) {
    const value = obj[key]

    if (typeof value === 'object' && value !== null) {
      parsedObj[key] = parseNumValues(value)
    }
    else if (!isNaN(Number(value))) {
      parsedObj[key] = Number(value)
    }
    else {
      parsedObj[key] = value
    }
  }

  return parsedObj
}

/**
 * Removes empty keys in an object
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
export const removeEmptyKeys = (obj: Record<string, any>, shallow = false): Record<string, any> => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key]
    }
    else if (typeof obj[key] === 'object' && !shallow) {
      removeEmptyKeys(obj[key])
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key]
      }
    }
  }
  return obj
}

/**
 * Cleans a query object for empty values and parse number values
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
export const sanitizeQuery = (obj: Record<string, any>): Record<string, any> => {
  return parseNumValues(removeEmptyKeys(obj))
}
