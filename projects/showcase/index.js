// FILL THESE IN
var username = 'BillDybas';
var projectName = 'SimpleShowcase';
var projectImage = 'example.png';
var projectDescription = 'A simple static site generator centered around a GitHub project.';

var projectUrl = 'https://github.com/' + username + '/' + projectName;

// Set the Project Name
var projectNames = document.getElementsByClassName('project-name');
var p;
for(p = 0; p < projectNames.length; p++){
    projectNames[p].innerHTML = projectName;
}

// Set the Project Description
var projectDes = document.getElementById('project-description');
projectDes.innerHTML = projectDescription;

// Set the Project URL
var projectUrls = document.getElementsByClassName('project-url');
var u;
for(u = 0; u < projectUrls.length; u++){
    projectUrls[u].href = projectUrl;
}

// Set the Project Image
var projectImg = document.getElementById('project-image');
projectImg.src = 'https://raw.githubusercontent.com/' + username + '/' + projectName + '/master/' + projectImage;
projectImg.alt = projectName;
projectImg.title = projectName;
