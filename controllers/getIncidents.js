// const HTTP_PROXY = 'http://proxy.gtm.lilly.com:9000';
// const HTTPS_PROXY = 'http://proxy.gtm.lilly.com:9000';
// const strict_ssl = 'false';
const querystring = require('querystring');
const request = require('request');
const utilities = require('./utilities');
const util = require('util');

// this is the function to call Watson and get the intent

const reqUrl = 'https://lillydev.service-now.com/oauth_token.do';
const getreq = 'https://lillydev.service-now.com/api/now/table/task_sla?sysparm_exclude_reference_link=true&sysparm_display_value=true&sysparm_query=number=INC4547791&sysparm_limit=5&sysparm_fields=task,sla,task.assignment_group,task.severity,duration,pause_duration,percentage';

const form = {
  grant_type: 'password',
  username: 'REST_IncidentTracking_Standard',
  password: 'IncidentTracking@2017',
  client_id: '4d51eb22138bcf00fac827efd6cb8fa7',
  client_secret: '8t+0G3Adfr',
};

const formData = querystring.stringify(form);
const contentLength = formData.length;


exports.GetAuthTokenandIncidents = function GetAuthTokenandIncidents(req, res) {
  try {
    request({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      uri: reqUrl,
      proxy: 'http://C226110:December123!@proxy.gtm.lilly.com:9000',
      body: formData,
      method: 'POST',
    }, (err, resp, body) => {
      if (resp.statusCode === 200) {
        const parsedbody = JSON.parse(resp.body);
        console.log(parsedbody.access_token);
        const auth = `Bearer ${parsedbody.access_token}`;
        request({
          headers: {
            Accept: 'application/json',
            Authorization: auth,
          },
          uri: getreq,
          proxy: 'http://C226110:December123!@proxy.gtm.lilly.com:9000',
          method: 'GET',
        }, (erro, res, body) => {
          // console.log(body);
    			// console.log(JSON.parse(body));
          if (res.statusCode === 200) {
            console.log('inside request');


            let incidents = [];
            incidents = utilities.incidentParser(JSON.parse(body));


            const incident = JSON.stringify(incidents);
            console.log(incident);
          }
        });
      }
    });
  } catch (err) {
    console.log('In Catch');
    res.send(err);
    console.log(util.inspect(err, { showHidden: false, depth: null }));
  }
};
