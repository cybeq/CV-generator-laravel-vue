const casualHTMl =`
<table border="0" cellspacing="3" cellpadding="4" width="100%">
    <tr>

        <th align="left" width="66.67%" ></th>
        <th align="left" width="33.33%" colspan="2"></th>

    </tr>
    <tr>
        <td id="left" width="66.67%">
        </td>
        <td id="right" colspan="2" width="33.33%">
          </td>
    </tr>

</table>`

export class HTMLCreator{
    constructor(data){
        var parser = new DOMParser();

        this.doc = parser.parseFromString(casualHTMl, "text/html");
        this.data = data;
        // if(this.data[0].theme==="Vertical") this.doc = parser.parseFromString(verticalHTMl, "text/html");
        console.log(data)

    }
    prepareDocument(){
        this.stylize()
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/pdf/blob", true);
        xhr.setRequestHeader("Content-type", "text/html");
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var blob = new Blob([this.response], { type: 'application/pdf' }); // create a Blob from the response
                var link = document.createElement('a'); // create a link element
                link.href = window.URL.createObjectURL(blob); // set the href attribute to the URL of the Blob
                link.download = 'pdf.pdf'; // set the download attribute to the filename of the PDF
                link.click();
            }
        };
        xhr.send(this.doc.documentElement.outerHTML);
    }

    addPersonalData(){
        const restricted = ['Casual', 'Vertical'];
        const bigger = ['name_surname'];
        const description = ['about']
        const div = document.createElement('div');
        for(let [key, value] of Object.entries(this.data[0])){
            if(value && !restricted.includes(value)){
                if(bigger.includes(key)){
                    div.innerHTML+=`
                    <h3>${value}</h3>
                `;
                    continue;
                }
                if(description.includes(key)){
                    div.innerHTML+=`
                    <small>${value}</small>
                `;
                    continue;
                }
                div.innerHTML+=`
                    <p>${value}</p>
                `;
            }
        }
        this.doc.getElementById('right').appendChild(div)

    }
    addWork(){
        this.doc.getElementById('left').innerHTML=`
        <h3>Doświadczenie zawodowe</h3>
        `;
        const fields = ['job_name', 'job_genre', 'job_address', 'job_date_from', 'job_date_to']
        const bigger = ['job_name']
        for(let all of this.data[2]){
            for(let field of fields){
                if(bigger.includes(field)){
                    this.doc.getElementById('left').innerHTML+=`<p>${all[field]}</p>`;
                    continue;
                }
                if(field ==='job_date_from'){
                    this.doc.getElementById('left').innerHTML+=`<small>${all['job_date_from']} - ${all['job_date_to']}</small><br/>`;
                    break;
                }
                if(all[field]){
                    this.doc.getElementById('left').innerHTML+=`<small>${all[field]}</small><br/>`;
                }
            }
        }
    }
    addSchool(){
        this.doc.getElementById('left').innerHTML+=`
        <h3>Wykształcenie</h3>
        `;
        const fields = ['school_name', 'school_address', 'school_genre', 'school_date_from', 'school_date_to']
        const bigger = ['school_name']
        for(let all of this.data[1]){
            for(let field of fields){
                if(bigger.includes(field)){
                    this.doc.getElementById('left').innerHTML+=`<p>${all[field]}</p>`;
                    continue;
                }
                if(field ==='school_date_from'){
                    this.doc.getElementById('left').innerHTML+=`<small>${all['school_date_from']} - ${all['school_date_to']}</small><br/>`;
                    break;
                }
                if(all[field]){
                    this.doc.getElementById('left').innerHTML+=`<small>${all[field]}</small><br/>`;
                }
            }
        }
    }
    addSkills(){
        this.doc.getElementById('right').innerHTML+=`
        <h3>Umiejętności</h3>
        `;
        const fields = ['skill_name', 'skill_privileges', 'skill_level', 'skill_description']
        const bigger = ['skill_name']
        for(let all of this.data[3]){
            for(let field of fields){
                if(bigger.includes(field)){
                    this.doc.getElementById('right').innerHTML+=`<p>${all[field]}</p>`;
                    continue;
                }
                if(all[field] && field ==='skill_level'){
                    this.doc.getElementById('right').innerHTML+=`<small>Poziom: ${all['skill_level']}</small><br/>`;
                    break;
                }
                if(all[field] && field ==='skill_privileges'){
                    this.doc.getElementById('right').innerHTML+=`<small>Uprawnienia: ${all['skill_privileges']}</small><br/>`;
                    break;
                }
                if(all[field]){
                    this.doc.getElementById('right').innerHTML+=`<small>${all[field]}</small><br/>`;
                }
            }
        }
    }

    addImage(image){

        this.doc.getElementById('right').innerHTML = `
        <img src="${image}">` + this.doc.getElementById('right').innerHTML
    }
    stylize(){
        this.doc.getElementById('right').style.backgroundColor="#edf5f5"
        this.doc.getElementById('right').style.borderRadius="20px"
    }




}
