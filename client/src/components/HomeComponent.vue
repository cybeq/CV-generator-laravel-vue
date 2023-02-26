<template>

<div class="table" id="table">

    <div class="templates_list" id="templates_list">
        <h1>Witaj w kreatorze CV. </h1>
        <p style="margin-top:45px;">Wybierz szablon dokumentu</p>
        <label  :key="all.name" v-for="all in templates" @click="this.proceed(all.name)" class="template_choice" >
          <div style="margin-bottom: 30px;">
                    {{all.name}}
          </div>
        <img :src="all.html" alt="">
        </label>

    </div>
</div>
</template>

<script>
//ctx
const casual = document.createElement('canvas');
const vertical =  document.createElement('canvas');
casual.width = 300;
vertical.width = 300;
casual.height = 150;
vertical.height = 150;
const casualCtx = casual.getContext('2d');
const verticalCtx = vertical.getContext('2d');
casualCtx.fillStyle = '#b6843860';
casualCtx.fillRect(10, 10, 50, 120);
casualCtx.fillRect(70, 10, 130, 120);
verticalCtx.fillStyle = 'rgba(182,56,90,0.38)';
verticalCtx.fillRect(10, 10, 190, 30);
verticalCtx.fillRect(10, 50, 190, 30);
verticalCtx.fillRect(10, 90, 190, 30);
const casualURL = casual.toDataURL();
const verticalURL = vertical.toDataURL();
//ctx

import {createApp, h} from 'vue';
import Step2Component from '@/components/Step2Component.vue';
import mitt from 'mitt'

export default {
    name: "HomeComponent",
    components:{

    },
    data(){
        return{
            emitter: mitt(),
            height:'600px',
            templates:[
                        {name:'Casual', html:casualURL},
                        {name:'Vertical',html:verticalURL}
            ],
        }
    },
    mounted(){

        setTimeout(() => {
            document.getElementById("table").style.height='auto'
        }, 0);
    },
    methods:{
        proceed: function (theme)
        {
            document.getElementById('templates_list').style.display='inherit'
            const app = createApp({
                render() {  return h(Step2Component, {theme});  },
            });
            app.mount(document.getElementById("templates_list"));
        },

    }

}
</script>

<style scoped>
.table{
    background: #f8f6f3;
    width:100%;
    height:0;
    min-height: 0;
    border-radius: 15px;
    box-shadow: 6px 6px 6px #00000030;
    transition: height 1s ease, min-height 1s ease;
    padding:15px;
    font-family: 'Quicksand', sans-serif;
    color: #332c1f;
}
.template_choice{
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    height:300px; width:100%; background: white;
    padding:20px;
    border-radius: 10px;
    box-shadow: 6px 6px 6px #00000010;
    transition: box-shadow 0.5s ease, font-weight 0.5s ease, font-size 1s ease;
    margin-bottom:30px;
}
.template_choice:hover{
    box-shadow: 12px 12px 12px #00000040;
    font-weight: bold;
    font-size:1.5em;
    cursor: pointer;
}

.templates_list{
    display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 30px; box-sizing: border-box; -webkit-box-sizing: border-box; -moz-box-sizing: border-box;

}

</style>
