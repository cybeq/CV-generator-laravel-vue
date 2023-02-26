<template>
<div id="final">
<h1>Twój dokument jest gotowy</h1>
    <h3>Czy chcesz dodać zdjęcie? Jeśli tak wybierz plik</h3>
    <img width="300" v-if="this.preview" :src="this.preview">
    <input :style="'display: '+display" type="file" id="image" @change="addImage($event)" accept="image/gif, image/jpeg, image/png" />

    <div style="width:100%; height:20px; background: black"></div>
    <div style="display: flex; justify-content: center">
        <button @click="generate" v-if="!generated" style="margin-block:50px;" class="next_button_active">⁂ Generuj</button>

    </div>

</div>

</template>

<script>
import {HTMLCreator} from "@/classes/HTMLCreator";
export default {
    name: "FinalComponent",
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
        },
        step4Data:{
            type:Object,
            required:true
        }
    },
    mounted() {
        this.htmlCreator=  new HTMLCreator([this.step1Data, this.step2Data, this.step3Data, this.step4Data])
        this.htmlCreator.addPersonalData();
        this.htmlCreator.addWork();
        this.htmlCreator.addSchool();
        this.htmlCreator.addSkills()
    },
    data(){
        return{
            generated:false,
            htmlCreator: {},
            display:'inherit',
            preview:null
        }
    },
    methods:{
        generate: function(){
            this.htmlCreator.prepareDocument();
            this.generated = !this.generated
        },
        addImage: function($event){
            const file = $event.target.files[0];
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                // The result property contains the data URL
                const dataUrl = reader.result;
                // Call the addImage method with the data URL
                this.htmlCreator.addImage(dataUrl);
                this.display = 'none'
                this.preview = dataUrl
            });

            reader.readAsDataURL(file);
        }
    }
}
</script>

<style scoped>

</style>
