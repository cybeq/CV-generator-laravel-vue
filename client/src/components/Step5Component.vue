<template>
<div id="step5">
    <h1>Umiejętności</h1>
    <div class="gridded">
        <div v-for="all of skillsCollection" :key="all" class="artcile" @click="deleteSkill(all.skill_name)">
            <button class="close_button">X</button>
            <h3>{{all.skill_name}}</h3>
            <p>{{all.skill_level}}</p>
            <p>{{all.skill_privileges}}</p>
            <p>{{all.skill_description}}</p>
        </div>
    </div>


    <p v-if="String(this.error).length>0" style="background-color: #ed496a90; color:white; border-radius: 5px; padding:5px;">{{ this.error }}</p>
    <textarea  v-model="dataModel[all]" :key="all" v-for="all of data"
               :placeholder="dataProps[all].name" :style="dataProps[all].props" style="resize: none"></textarea>

    <div>
        <button @click="addSkill" class="add_collection_button">
            Dodaj umiejętność
        </button>
    </div>
    <div style="width:100%; text-align:right;">
        <button :class="buttonMode" @click="proceed">zakończ</button>
    </div>

</div>
</template>

<script>
import {createApp, h} from "vue";
import FinalComponent from "@/components/FinalComponent.vue";

const required = ['skill_name']
export default {
    name: "Step5Component",
    props:{
        step1Data:{
            type:Object,
            required:true
        },
        step2Data:{
            type:Object,
            required:true
        },
        step3Data:{
            type:Object,
            required:true
        }
    },
    mounted() {

    },
    data(){
        return{
            data:['skill_name', 'skill_privileges', 'skill_level', 'skill_description'],
            dataModel:[],
            dataProps:{
                skill_name:        {name:'* Nazwa umijętności', props:'height:20px; width:45%;'},
                skill_privileges:  {name:'Uprawnienia', props:'height:20px; width:45%;'},
                skill_level:       {name:'Poziom umiejętnośći',props:'height:20px; width:45%;'},
                skill_description:{name:'Dodatkowy opis', props:'height:120px; width:45%;'},
            },
            skillsCollection:[],
            buttonMode:'next_button_disabled',
            error:''

        }
    },
    methods:{
        addSkill: function(){
            for(let once of required){
                if(typeof this.dataModel[once] === 'undefined' || String(this.dataModel[once]).length < 5 ){
                    this.printError('Wypełnij dane poprawnie')
                    return;}}

            const data = {};
            for(let all of this.data){
                data[all] = this.dataModel[all] || null
            }
            this.skillsCollection.push(data)
            this.procedable()
        },
        deleteSkill: function(name){
            this.skillsCollection.forEach((skill,index) => {
                if(skill.skill_name === name){
                    this.skillsCollection.splice(index, 1)
                    this.procedable()
                }
            })
        },
        proceed: function(){
            if(this.skillsCollection.length<1){
                this.printError('Dodaj minimum jedną umiejętność')
                return;
            }

            const s1Data = this.step1Data;
            const s2Data = this.step2Data;
            const s3Data = this.step3Data;
            const s4Data = this.skillsCollection;
            const app = createApp({
                render() {  return h(FinalComponent, {step1Data:s1Data,step2Data:s2Data, step3Data:s3Data, step4Data:s4Data});
                }
            });
            app.mount(document.getElementById("step5"));
        },
        procedable: function(){
            if(this.skillsCollection.length > 0) this.buttonMode = 'next_button_active'
            else this.buttonMode ='next_button_disabled'
        },
        printError: function(err){
            this.error = err
            setTimeout(()=>{
                this.error=''
            },2000)
        },
    }
}
</script>

<style scoped>

</style>
