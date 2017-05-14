<template lang="html">
  <div id="main">
    <div class="container">
      <div class="content" v-for="content in contents">
        <div class="post">
          <md-dialog-actions v-if="login" id="action-up" >
              <md-button class="md-icon-button md-dense" @click.native="closeDialog('dialogSignIn')">
              <md-icon style="margin-top: 4px;">delete</md-icon>
              </md-button>
          </md-dialog-actions>
            <md-dialog-title >
              <div id="title-main">
              {{ content.title }}
            </div></md-dialog-title>
            <md-dialog-content> {{ content.message }}</md-dialog-content>
            <md-dialog-actions>
            <md-button v-if="login" class="md-raised md-primary">Show</md-button>
          </md-dialog-actions>
        </div>
      </div>
      <!-- /end of content -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  data() {
    return {
      login : false,
      contents : []
    }
  },
  methods : {

  },
  created(){
    let token = localStorage.getItem('token')
      Vue.axios.get('http://localhost:3000/posting').then((response)=>{
        console.log(response);
          this.contents = response.data,
        console.log(this.contents);
          if(token){
            this.login = true
          }
      })
  }
}
</script>

<style lang="css">
#title-main{
  border-bottom: 1px solid
}
.post{
  padding-top: 1px;
  border: 1px solid;
  border-radius: 14px 14px 14px 14px;
}
#action-up{
padding: 0px 15px;
min-height: 10px;
}
#main{
  min-height: 20rem
}
.container{
  padding: 0px 12rem;
}
.content{
  margin-top: 20px;
  padding: 1px 26px
}
</style>
