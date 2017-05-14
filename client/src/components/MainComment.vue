<template lang="html">
  <div id="main">
    <div class="container">
      <div class="content">
        <div class="post">
          <md-dialog-actions v-if="login" id="action-up" >
            <md-button class="md-icon-button md-dense" v-bind:href='url_back'>
              <md-icon style="margin-top: 4px;">undo</md-icon>
              <md-tooltip md-direction="top" >Back Home</md-tooltip>
            </md-button>
          </md-dialog-actions>
          <md-dialog-title >
            <div id="title-main">
              <h3 id="title-h3">Title :</h3> {{data.title}}
            </div>
          </md-dialog-title>
          <md-dialog-title id="title-quest">
            <label ><h3 id="question">Question :</h3></label>
          </md-dialog-title>
          <md-dialog-title>
            {{data.message}}
          </md-dialog-title>
          <md-dialog-actions>
            <!-- <router-link :to="{path: '/comment/'+content._id}"> -->
              <md-button v-if="login" class="md-raised md-primary" @click.native="openDialog('dialogComment')">Comment</md-button>
            <!-- </router-link> -->
          </md-dialog-actions>
        </div>
      </div>
      <!-- /end of content -->
      <div class="content">
        <div id="answers">
          <md-table >
            <md-table-header>
              <md-table-row>
                <md-table-head>Answer</md-table-head>
                <md-table-head></md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body>
              <md-table-row v-for="data in data.commentid" >
                <md-table-cell>
                  {{ data.comment }}
                </md-table-cell>
                <md-table-cell style="float:right;">
                  <!-- <router-link :to="{path: '/comment/'+content._id}"> -->
                  <md-button class="md-icon-button md-dense" @click.native="">
                    <md-icon id="icon">edit</md-icon>
                  </md-button>
                  <!-- </router-link> -->
                  <!-- <router-link :to="{path: '/comment/'+content._id}"> -->
                  <md-button class="md-icon-button md-dense" @click.native="deleteComment(data._id)">
                    <md-icon id="icon">delete</md-icon>
                  </md-button>
                  <!-- </router-link> -->
                </md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>
        </div>
      </div>
    </div>
    <!-- dialog update post -->
    <md-dialog id="dialogCreate" md-open-from="#custom" md-close-to="#custom" ref="dialogComment">
      <md-dialog-actions>
        <md-button class="md-icon-button md-dense" @click.native="closeDialog('dialogComment')">
          <md-icon style="margin-top: 4px;">clear</md-icon>
        </md-button>
      </md-dialog-actions>
      <md-dialog-title>Create Your Comment</md-dialog-title>
      <md-dialog-content>
        <md-input-container novalidate>
          <md-icon>forum</md-icon>
          <label>Comment</label>
          <md-textarea maxlength="200" v-model="comment"></md-textarea>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="commentPost">Comment</md-button>
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
  props: ['value'],
  data(){
    return{
      url_back : '/',
      login : false,
      comment : '',
      data: {},
    }
  },
  methods : {
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    commentPost(){
      let id_posting = this.data._id
      console.log(id_posting);
      console.log(this.comment);
      this.closeDialog('dialogComment')
      Vue.axios.post('http://localhost:3000/comment/'+id_posting,{
        comment : this.comment
      },{
        headers : { token : localStorage.getItem('token')}
      }).then((response)=>{
        // console.log(response);
        location.reload()
      })
    },
    deleteComment(id){
      // console.log(this.data);
      // console.log(id);
      Vue.axios.delete('http://localhost:3000/comment/'+id,{
        headers : { token : localStorage.getItem('token')}
      }).then((response)=>{
        console.log(response.data.hasOwnProperty('status'));
        if(response.data.hasOwnProperty('status')){
          location.reload()
        }
      })
    }
  },
  created(){
    let findById = this.$route.params.id
    let token = localStorage.getItem('token')
    Vue.axios.get('http://localhost:3000/posting/'+findById).then((response)=>{
      console.log(response.data)
      this.data = response.data
      this.login = true
      // console.log(this.data.commentid);
    })
  }
}
</script>

<style lang="css" scoped>
#icon{
  margin-top: 5px;
  margin-left: 8px
}
#answers{
  border-radius: 14px 14px 14px 14px;
  border: 1px solid;
}
</style>
