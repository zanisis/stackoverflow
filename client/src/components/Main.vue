<template lang="html">
  <div id="main">
    <div class="container">
      <div class="content" v-for="content in contents">
        <div class="post">
          <md-dialog-actions v-if="login" id="action-up" >
            <md-button v-if="you == content.user_id._id" class="md-icon-button md-dense" @click.native="deletePost(content._id)">
              <md-icon style="margin-top: 4px;">delete</md-icon>
            </md-button>
          </md-dialog-actions>
          <md-dialog-title >
            <div id="title-main">
              <h3 id="title-h3">Title :</h3> {{ content.title }}
            </div>
          </md-dialog-title>
          <md-dialog-title id="title-quest">
            <label ><h3 id="question">Question :</h3></label>
          </md-dialog-title>
          <md-dialog-title>
            {{ content.message }}
          </md-dialog-title>
          <md-dialog-actions>
              <md-button v-if="you == content.user_id._id" @click.native="showDialog(content._id)" style="margin-right:10px" class="md-raised md-primary">Edit</md-button>
            <router-link :to="{path: '/comment/'+content._id}">
              <md-button v-if="login" class="md-raised md-primary">Show</md-button>
            </router-link>
          </md-dialog-actions>
        </div>
      </div>
      <!-- /end of content -->
    </div>
    <!-- dialog update post -->
    <md-dialog id="dialogCreate" md-open-from="#custom" md-close-to="#custom" ref="dialogUpdate">
      <md-dialog-actions>
        <md-button class="md-icon-button md-dense" @click.native="closeDialog('dialogUpdate')">
          <md-icon style="margin-top: 4px;">clear</md-icon>
        </md-button>
      </md-dialog-actions>
      <md-dialog-title>Update Your Post</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <md-icon>forum</md-icon>
          <label>Title</label>
          <md-input placeholder="Title Post" v-model="title_post"></md-input>
        </md-input-container>
        <md-input-container novalidate>
          <md-icon>label_outline</md-icon>
          <label>Description</label>
          <md-textarea maxlength="200" v-model="description"></md-textarea>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="update(id_content)">Update</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- /update post-->
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
      contents : [],
      you : '',
      title_post : '',
      description : '',
      id_content : ''
    }
  },
  methods : {
    deletePost(id) {
      Vue.axios.delete('http://localhost:3000/posting/'+id,{
        headers : {token : localStorage.getItem('token')}
      }).then((response)=>{
      if(response.data.message !== 'not authorized'){
        location.href = '/'
        }
      })
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    showDialog(id) {
      Vue.axios.get('http://localhost:3000/posting/'+id).then((response)=>{
        this.title_post = response.data.title
        this.description = response.data.message
        this.id_content = response.data._id
        this.openDialog('dialogUpdate')
      })
    },
    update(id){
      Vue.axios.put('http://localhost:3000/posting/'+id,{
        title : this.title_post,
        message : this.description
      }).then((response)=>{
        this.closeDialog('dialogUpdate')
        location.reload()
      })
    }
  },
  created(){
    let token = localStorage.getItem('token')
      Vue.axios.get('http://localhost:3000/posting').then((response)=>{
        this.contents = response.data
        if(token){
          Vue.axios.get('http://localhost:3000/users/'+token).then((user)=>{
            this.you = user.data.id
            this.login = true
          })
        }
      })
  }
}
</script>

<style lang="css">
#question{
margin-bottom: 0px;
}
#title-quest{
  margin-bottom: -12px;
  padding-top: 0px
}
#title-h3{
  margin-top: 0px;
  margin-right:  4px;
  float: left
}
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
  min-height: 45rem
}
.container{
  padding: 0px 12rem;
}
.content{
  margin-top: 20px;
  padding: 1px 26px
}
</style>
