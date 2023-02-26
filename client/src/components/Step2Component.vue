<template>
    <div id="step2">
        <h1 style="margin-bottom:0;">Krok pierwszy</h1>
        <p style="margin-top:0">Wypełnij podstawowe dane</p>
        <p v-if="String(this.error).length>0" style="background-color: #ed496a90; color:white; border-radius: 5px; padding:5px;">{{ this.error }}</p>
        <textarea @keyup="liveCheck" v-for="all of data" :key="all"  v-model="dataModel[all]" :placeholder="dataProps[all].name"
                  :style="'resize: none;'+dataProps[all].props" :maxlength="dataProps[all].maxLength"></textarea>
        <div style="width:100%; text-align:right;">
                  <button :class="buttonMode" @click="proceed">następny krok</button>
        </div>
    </div>


</template>

<script>
import {createApp, h} from "vue";
import Step3Component from "@/components/Step3Component.vue";

const required = ['name_surname', 'email', 'tel'];
export default {
    name: "Step2Component",
    data(){
        return{
           data:      ['name_surname', 'about', 'tel',  'email', 'webpage'],
           dataProps: { name_surname:{name:'* Imie i nazwisko', props:'height:20px; width:45%;', maxLength:30},
                        email:       {name:'* Email', props:'height:20px; width:45%;', maxLength:35},
                        tel:         {name:'* Numer telefonu', props:'height:20px; width:45%;', maxLength:16},
                        webpage:     {name:'Adres strony', props:'height:20px; width:91%;', maxLength:35},
                        about:       {name:'O tobie', props:'height:150px; width:45%;', maxLength:150}},
            dataModel:[],
            buttonMode:'next_button_disabled',
            error:''
        }
    },
    props:{
        theme: {
            type: String,
            required: true
        }
    },
    methods:{
        proceed: function (){
            const data ={};
            data.theme = this.theme;

            for(let once of required){
                if(typeof this.dataModel[once] === 'undefined' || String(this.dataModel[once]).length < 5 ){
                    this.printError()
                    return;}}

            for(let all of this.data){
                data[all] = this.dataModel[all] || null
            }
            console.log('pawian',data)

            const app = createApp({
                                                render() {  return h(Step3Component, {step1Data:data});
                                                        }
                                                });
            app.mount(document.getElementById("step2"));



        },
        liveCheck: function(){
            for(let once of required) {
                if(typeof this.dataModel[once] === 'undefined' || String(this.dataModel[once]).length <5 ) {
                    this.buttonMode = 'next_button_disabled';
                    return ;
                }
            }
            this.buttonMode = 'next_button_active'
        },
        printError: function(){
            this.error = 'Wypełnij wszystkie dane poprawnie'
            setTimeout(()=>{
            this.error=''
            },2000)
        }
    }
}
</script>

<style scoped>

</style>
