
exports.IncidentDetails = function IncidentDetails() {
  this.task_severity = '';
  this.duration = '';
  this.pause_duration = '';
  this.task_assignment_group = '';
  this.task = '';
  this.percentage = '';
  this.sla = '';
};

exports.incidentParser = function incidentParser(body) {
  const user = body;
  const length = user.result.length;
  const incidents = [];
  for (let i = 0; i < length; i++) {
    const entry = user.result[i];
    const incidentdetails = new module.exports.IncidentDetails();


    incidentdetails.task_severity = entry['task.severity'];
    incidentdetails.duration = entry.duration;
    incidentdetails.pause_duration = entry.pause_duration;
    incidentdetails.task_assignment_group = entry['task.assignment_group'];
    incidentdetails.task = entry.task;
    incidentdetails.percentage = entry.percentage;
    incidentdetails.sla = entry.sla;
    incidents.push(incidentdetails);
  }
  return incidents;
};
