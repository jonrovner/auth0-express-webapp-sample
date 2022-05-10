var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios')

const getToken = async () => {
  const body = {
    "client_id":process.env.API_EXPLORER_CLIENT_ID,
    "client_secret":process.env.API_EXPLORER_SECRET,
    "audience":process.env.ISSUER_BASE_URL+'/api/v2/',
    "grant_type":"client_credentials"}  
  try{
    const url = process.env.ISSUER_BASE_URL+'/oauth/token'
    const response = await axios.post(url, body)    
    return response.data.access_token   
  } catch (err){
    console.log('ERROR GETTING TOKEN', err)
  }
}

const getAppName = rule => {
  const testString = "clientName"  
  let {script} = rule 
  let startIndex = script.indexOf(testString) + testString.length + 6
  let start = script.slice(startIndex)
  let endIndex = start.indexOf("'")
  const name = start.slice(0, endIndex)
  return {...rule, appName: name}
}

async function getClients(req, res, next){

  const token = await getToken()
  
  try {
  
    const get_clients = { 
      method: "GET",
      url: process.env.ISSUER_BASE_URL+'/api/v2/clients',
      headers: { "authorization": "Bearer "+ token },
    };
    
    const get_rules = {
      method: "GET",
      url: process.env.ISSUER_BASE_URL+'/api/v2/rules',
      headers: { "authorization": "Bearer "+ token },      
    };  

    const clientsResponse = await axios(get_clients)
    const rulesResponse = await axios(get_rules)
    const clients = clientsResponse.data
    const rules = rulesResponse.data
        
    const testString = "clientName"
    
    const rulesWithAppNames = rules
      .filter(rule => rule.script.includes(testString))
      .map( rule => getAppName(rule) )    
    
    const globalRules = rules.filter(rule => !rule.script.includes(testString))  
    
    const clientsWithRules = clients.map( client => {
      let rules = [
        ...rulesWithAppNames.filter(r => r.appName === client.name).map(r => r.name),
        ...globalRules.map(r => r.name)
      ]
      return {...client, rules}
    })

    res.locals.clients = clientsWithRules.filter(client => client.name !== "All Applications")
    res.locals.rulesWithAppNames = rulesWithAppNames 
    res.locals.globalRules = globalRules

    next()
  } catch (error) {
    console.log('ERROR GETTING CLIENTS', error)
  }  
}


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

router.get('/clients', requiresAuth(), function (req, res, next) {
  if(!req.oidc.user){return res.render('index')}
  next()
},  
  getClients, function(req, res, next){
    
    res.render('clients', {
      title: 'clients page'
    });
  }
);

module.exports = router;
