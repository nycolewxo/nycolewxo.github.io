function createParagraphArray(name,data,fields,section){
    if(fields.every(field=>data&&data[field])){
        fields.forEach(field=>{
            const paragraph=document.createElement('p');
            paragraph.className=`${name}`;
            if(Array.isArray(data[field])){
                paragraph.innerHTML=`<strong>${field}:</strong> ${data[field].join(', ')}`;
                section.appendChild(paragraph);
            }
            else{
                paragraph.textContent='';
            }
            section.appendChild(paragraph);
        })
    }
}
function createParagraphs(name,data,fields,section){
    if(fields.every(field=>data&&data[field])){
        fields.forEach(field=>{
            const paragraph=document.createElement('p');
            paragraph.className=`${name}-${field}`;
            paragraph.textContent=data[field];
            section.appendChild(paragraph);
        });
    }
    else{
        console.log('One or more data unavailable');
    }
}
function createList(name,data,ul){
    data.forEach(description=>{
        const li=document.createElement('li');
        li.textContent=description;
        ul.appendChild(li);
    });
}
function changeInformationContent(data){
    console.log('Fetched data:',data);
    const name="information";
    const section=document.getElementById("information");
    const fields=['name','github','linkedin','email','phone'];
    createParagraphs(name,data,fields,section);
}
function changeEducationContent(data){
    console.log('Fetched data:',data);
    const name="education"
    const section=document.getElementById("education");
    const fields=['name','location','degree','date'];
    data.forEach(education=>{
        const div=document.createElement('div');
        div.className=`education-div`;
        createParagraphs(name,education,fields,div);
        section.appendChild(div);
    })
}
function changeExperienceContent(data){
    console.log('Fetched data: '+data);
    const name="experience";
    const section=document.getElementById("experience");
    const fields=['name','role','date','location'];
    data.forEach(experience=>{
        const div=document.createElement('div');
        div.className=`experience-div`;
        createParagraphs(name,experience,fields,div);
        const ul=document.createElement('ul');
        createList(name,experience.description,ul);
        div.appendChild(ul);
        section.appendChild(div);
    })
}
function changeProjectContent(data){
    console.log('Fetched data: '+data);
    const name="project";
    const section=document.getElementById("projects");
    const fields=['name','date','link'];
    data.forEach(project=>{
        const div=document.createElement('div');
        div.className='project-div';
        createParagraphs(name,project,fields,div);
        const ul=document.createElement('ul');
        createList(name,project.description,ul);
        div.appendChild(ul);
        section.appendChild(div);
    })
}
function changeTechnicalSkillsContent(data){
    console.log('Fetched data '+data);
    const name="technical-skills";
    const section=document.getElementById("technicalskills");
    const fields=['Programming Languages','Web Technologies','ML/AI','Miscellaneous'];
    createParagraphArray(name,data,fields,section);
}
function changeCourseworkContent(data){
    console.log('Fetched data'+data);
    const name="coursework";
    const section=document.getElementById("coursework");
    const fields=['Computer Science','Math'];
    createParagraphArray(name,data,fields,section);
}

function updateContent(content,data){
    switch(content){
        case 'information':
            changeInformationContent(data);
            break;
        case 'education':
            changeEducationContent(data);
            break;
        case 'experience':
            changeExperienceContent(data);
            break;
        case 'projects':
            changeProjectContent(data);
            break;
        case 'technicalskills':
            changeTechnicalSkillsContent(data);
            break;
        case 'coursework':
            changeCourseworkContent(data);
            break;
        default:
            console.log('Content not recognized');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const urls=['https://raw.githubusercontent.com/nycolewxo/nycolewxo.github.io/main/cache/information',
        'https://raw.githubusercontent.com/nycolewxo/nycolewxo.github.io/main/cache/education',
        'https://raw.githubusercontent.com/nycolewxo/nycolewxo.github.io/main/cache/experience',
        'https://raw.githubusercontent.com/nycolewxo/nycolewxo.github.io/main/cache/projects',
        'https://raw.githubusercontent.com/nycolewxo/nycolewxo.github.io/main/cache/technicalskills',
        'https://raw.githubusercontent.com/nycolewxo/nycolewxo.github.io/main/cache/coursework']
    /*
    const urls=['http://localhost:3000/information',
        'http://localhost:3000/education',
        'http://localhost:3000/experience',
        'http://localhost:3000/projects',
        'http://localhost:3000/technicalskills',
        'http://localhost:3000/coursework'];
     */
    urls.forEach(url=>{
        fetch(url)
            .then(response=>{
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data=>{
                const content=url.substring(url.lastIndexOf('/')+1);
                updateContent(content,data);
            })
            .catch(error=>{
                console.error('Fetch operation failed: '+error);
            });
    });
});

