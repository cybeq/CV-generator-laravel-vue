
<template>
    <div id="step3">
        <h1>Wykształcenie</h1>
<div class="gridded">
        <div v-for="all of schoolsCollection" :key="all" class="artcile" @click="deleteSchool(all.school_name)">
           <button class="close_button">X</button>
            <h3>{{all.school_name}}</h3>
            <p>{{all.school_address}}</p>
            <p>{{all.school_genre}}</p>
            <p>{{all.school_date_from}} - {{all.school_date_to}}</p>
        </div>
</div>


        <p v-if="String(this.error).length>0" style="background-color: #ed496a90; color:white; border-radius: 5px; padding:5px;">{{ this.error }}</p>
        <textarea  v-model="dataModel[all]" :key="all" v-for="all of data"
                   :placeholder="dataProps[all].name" :style="dataProps[all].props" style="resize: none"></textarea>

        <div>
            <button @click="addSchool" class="add_collection_button">
                Dodaj szkołę
            </button>
        </div>
        <div style="width:100%; text-align:right;">
            <button :class="buttonMode" @click="proceed">następny krok</button>
        </div>
    </div>

</template>

<script>
import {createApp, h} from "vue";
import Step4Component from "@/components/Step4Component.vue";
const required = ['school_name', 'school_date_from', 'school_date_to'];
export default {
    name: "Step3Component",
    props: {
        step1Data:{
            type: Object,
            required:true
        },

    },
    mounted() {

    },
    data(){
        return{
            data:['school_name', 'school_address', 'school_genre', 'school_date_from', 'school_date_to'],
            dataModel:[],
            dataProps:{
                                school_name:     {name:'* Nazwa szkoły', props:'height:20px; width:45%;'},
                                school_address:  {name:'Adres szkoły', props:'height:20px; width:45%;'},
                                school_genre:    {name:'Kierunek',     props:'height:20px; width:45%;'},
                                school_date_from:{name:'* Data rozpoczęcia', props:'height:20px; width:45%;'},
                                school_date_to:  {name:'* Data zakończenia', props:'height:20px; width:45%;'},
                      },
            schoolsCollection:[],
            buttonMode:'next_button_disabled',
            error:''
        }
    },
    methods:{
        proceed: function (){

            if(this.schoolsCollection.length<1){
                this.printError('Dodaj minimum jedną szkołę')
                return;
            }

            const schlData = this.schoolsCollection
            const s1Data = this.step1Data;
            const app = createApp({
                render() {  return h(Step4Component, {step1Data:s1Data,step2Data:schlData});
                }
            });
            app.mount(document.getElementById("step2"));
        },
        printError: function(err){
            this.error = err
            setTimeout(()=>{
                this.error=''
            },2000)
        },
        addSchool: function(){
            for(let once of required){
                if(typeof this.dataModel[once] === 'undefined' || String(this.dataModel[once]).length < 5 ){
                    this.printError('Wypełnij dane poprawnie')
                    return;}}

            const data = {};
            for(let all of this.data){
                data[all] = this.dataModel[all] || null
            }
            this.schoolsCollection.push(data)
            this.procedable()

        },
        deleteSchool(name){
            this.schoolsCollection.forEach((school,index) => {
                if(school.school_name === name){
                    this.schoolsCollection.splice(index, 1)
                    this.procedable()
                }
            })
        },
        procedable(){
            if(this.schoolsCollection.length > 0) this.buttonMode = 'next_button_active'
            else this.buttonMode ='next_button_disabled'
        }
    }
}
</script>

<style scoped>

</style>
