<template>

<div class="logo_container">
    <img src="./assets/logo.png" class="logo" />
</div>

    <main>
        <router-view />
    </main>



</template>

<script>

export default {
  name: 'App',
  components: {

  },
    data(){
      return{

      }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap');
#app {

}
.logo{
    width:100px;
}
.logo_container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:100px;

}
main{
    display: block;
    margin-top:100px;
    padding-inline:10%;
}
body{
    background: url('./assets/output-onlinepngtools.png');
    background-size: cover
}
.next_button_disabled{
    padding: 15px;
    background-color: #f8f6f3;
    border: solid 3px #ed496a90;
    border-radius: 18px;

    font-size:1.2em;
    color:  #ed496a;
    transition: background-color 1s ease, color 1s ease;
}
.next_button_disabled:hover{
    background-color: #ed496a90;
    color:white;
    cursor: pointer;
}
.next_button_active{
    padding: 15px;
    background-color: #f8f6f3;
    border: solid 3px rgba(73, 237, 163, 0.56);
    border-radius: 18px;

    font-size:1.2em;
    color: #49ed6f;
    transition: background-color 1s ease, color 1s ease;
}
.next_button_active:hover{
    background-color: rgba(73, 237, 163, 0.56);
    color:white;
    cursor: pointer;
}
textarea{
    padding:4px;
    border:none;
    margin:3px;
    transition: box-shadow 0.6s ease;
    vertical-align: top;
    font-family: 'Quicksand', sans-serif;
    border-radius:4px;
}
textarea:focus{
    outline:none;
    box-shadow: 3px 3px 3px #00000040;
}
.add_collection_button{
    background: #406247;
    border:none;
    padding:8px;
    color:white;
    cursor:pointer;
    border-radius: 8px;
    margin-top:10px;
    transition: box-shadow 1s ease;
}
.add_collection_button:hover{
    box-shadow: 6px 6px 6px #00000050;
}
.artcile{
    background: white;
    padding: 15px;
    width:90%;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    margin-bottom: 30px;
    transition: box-shadow 1s ease;
}
.artcile:hover{
    box-shadow: 6px 6px 6px #00000050;
    cursor:pointer;
}
.artcile p {
    margin-block: 0;
    padding-block: 0;
}
.gridded{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.close_button{
    border-radius:100%;
    padding:1px;
    padding-inline: 4px;
    color:white;
    background: #ed496a;
    border:none;
    font-weight: bold;
    opacity: 90%;
}
</style>
