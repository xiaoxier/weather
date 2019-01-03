///ajax.js
const axios = require('axios')
module.exports = async (location) => {
  const results = await axios({
    method: 'get',
    url: 'https://api.seniverse.com/v3/weather/daily.json',
    params:{
      key:'wq4aze9osbaiuneq',
      language:'zh-Hans',
      unit:'c',
      location
    }
  })
  return results.data
}
