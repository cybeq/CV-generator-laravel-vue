<template>
    <div id="step4">
        <h1>Doświadczenie zawodowe</h1>
        <div class="gridded">
            <div v-for="all of jobsCollection" :key="all" class="artcile" @click="deleteJob(all.job_name)">
                <button class="close_button">X</button>
                <h3>{{all.job_name}}</h3>
                <p>{{all.job_address}}</p>
                <p>{{all.job_genre}}</p>
                <p>{{all.job_date_from}} - {{all.job_date_to}}</p>
            </div>
        </div>


        <p v-if="String(this.error).length>0" style="background-color: #ed496a90; color:white; border-radius: 5px; padding:5px;">{{ this.error }}</p>
        <textarea  v-model="dataModel[all]" :key="all" v-for="all of data"
                   :placeholder="dataProps[all].name" :style="dataProps[all].props" style="resize: none"></textarea>

        <div>
            <button @click="addJob" class="add_collection_button">
                Dodaj pracę
            </button>
        </div>
        <div style="width:100%; text-align:right;">
            <button :class="buttonMode" @click="proceed">następny krok</button>
        </div>

    </div>

</template>

<script>
import {createApp, h} from "vue";
import Step5Component from "@/components/Step5Component.vue";

const required = ['job_name', 'job_date_from', 'job_date_to'];
export default {
    name: "Step4Component",
    props:{
        step1Data:{
            type:Object,
            required:true
        },
        step2Data:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
            data:['job_name', 'job_address', 'job_genre', 'job_date_from', 'job_date_to'],
            dataModel:[],
            dataProps:{
                job_name:     {name:'* Nazwa firmy/instytucji', props:'height:20px; width:45%;'},
                job_address:  {name:'Adres pracy', props:'height:20px; width:45%;'},
                job_genre:    {name:'Stanowisko',     props:'height:20px; width:45%;'},
                job_date_from:{name:'* Data rozpoczęcia', props:'height:20px; width:45%;'},
                job_date_to:  {name:'* Data zakończenia', props:'height:20px; width:45%;'},
            },
            jobsCollection:[],
            buttonMode:'next_button_disabled',
            error:''

        }
    },
    mounted() {

    },
    methods:{
        addJob: function(){
            for(let once of required){
                if(typeof this.dataModel[once] === 'undefined' || String(this.dataModel[once]).length < 5 ){
                    this.printError('Wypełnij dane poprawnie')
                    return;}}

            const data = {};
            for(let all of this.data){
                data[all] = this.dataModel[all] || null
            }
            this.jobsCollection.push(data)
            this.procedable()
        },
        deleteJob: function(name){
            this.jobsCollection.forEach((job,index) => {
                if(job.job_name === name){
                    this.jobsCollection.splice(index, 1)
                    this.procedable()
                }
            })
        },
        proceed: function(){
            if(this.jobsCollection.length<1){
                this.printError('Dodaj minimum jedną pracę')
                return;
            }

            const s1Data = this.step1Data;
            const s2Data = this.step2Data;
            const s3Data = this.jobsCollection
            const app = createApp({
                render() {  return h(Step5Component, {step1Data:s1Data,step2Data:s2Data, step3Data:s3Data});
                }
            });
            app.mount(document.getElementById("step4"));
        },
        procedable: function(){
            if(this.jobsCollection.length > 0) this.buttonMode = 'next_button_active'
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
