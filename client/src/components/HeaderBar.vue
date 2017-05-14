<template lang="html">
  <div class="">
    <form novalidate @submit.stop.prevent="open">
      <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
        <span>Username has been used</span>
        <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Retry</md-button>
      </md-snackbar>
    </form>

    <md-toolbar class="md-blue">
      <md-button class="md-icon-button">

      </md-button>

      <h1 class="md-title" style="flex: 1">Vue Overflow</h1>

      <md-button v-if="!login" class="md-raised" @click.native="openDialog('dialogSignIn')" >Sign In <img id="iconimg" src="../assets/signin.png" alt=""></md-button>
      <md-button v-if="!login" class="md-raised md-warn" @click.native="openDialog('dialogSignUp')">Register <img id="iconimg" src="../assets/register.png" alt=""></md-button>

      <h3 id="tagname" v-if="login">Welcome {{ username }}  </h3>
      <md-avatar v-if="login">
        <img src="../assets/avatar.png" alt="Avatar">
      </md-avatar>
      <md-button v-if="login" class="md-raised md-accent" @click.native="logOut">Log Out <img id="iconimg" src="../assets/lock_open.png" alt=""></md-button>
    </md-toolbar>

    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogSignIn">
      <md-dialog-actions>
          <md-button class="md-icon-button md-dense" @click.native="closeDialog('dialogSignIn')">
          <md-icon style="margin-top: 4px;">clear</md-icon>
          </md-button>
      </md-dialog-actions>
      <md-dialog-title>Sign In</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <md-icon>perm_identity</md-icon>
          <label>Username</label>
          <md-input placeholder="Your Username" v-model="username"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input type="password" v-model="password" @keyup.enter.native="signIn"></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="signIn()">Sign In</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- /sign in -->
    <!-- sign up -->
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogSignUp">
      <md-dialog-actions>
        <md-button class="md-icon-button md-dense" @click.native="closeDialog('dialogSignUp')">
          <md-icon style="margin-top: 4px;">clear</md-icon>
        </md-button>
      </md-dialog-actions>
      <md-dialog-title>Form Register</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <md-icon>perm_identity</md-icon>
          <label>Username</label>
          <md-input placeholder="Your Username" v-model="username"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input type="password" v-model="password"></md-input>
        </md-input-container>
        <md-input-container>
          <md-icon>email</md-icon>
          <label>Email</label>
          <md-input type="mail" v-model="email"></md-input>
        </md-input-container>
        <md-input-container>
          <md-icon>phone</md-icon>
          <label>Phone</label>
          <md-input type="tel" v-model="phone" ></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="signUp">Submit</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import AlertUser from './AlertUser'


Vue.use(VueAxios, axios)
export default {
  data(){
    return {
      login : false,
      username: '',
      password: '',
      email: '',
      phone: '',
      validate_username : false,
      user_in : '',
      vertical : 'top',
      horizontal : 'center',
      duration : 4000
    }
  },
  methods: {
    open(){
      this.$refs.snackbar.open();
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.username = ''
      this.password = ''
      this.email = ''
      this.phone = ''
      this.$refs[ref].close();
    },
    signIn() {
      Vue.axios.post('http://localhost:3000/users/signin', {
        username : this.username,
        password : this.password
      }).then((response)=>{
        console.log(response);
        this.closeDialog('dialogSignIn')
        this.user_in = response.data.user
        console.log(this.user_in);
        localStorage.setItem('token', response.data.token);
        location.reload()
      })
    },
    signUp() {
      Vue.axios.post('http://localhost:3000/users/signup', {
        username : this.username,
        password : this.password,
        email : this.email,
        phone : this.phone
      }).then((response)=>{
        let obj = response.data
        if(obj.hasOwnProperty("message")){
          // alert(response.data.message)
          this.closeDialog('dialogSignUp')
          this.open()
        } else{
          this.signIn()
          this.closeDialog('dialogSignIn')
          // location.reload()
        }
      })
    },
    logOut() {
      localStorage.removeItem('token');
      location.reload()
    }
  },
  created() {
    let token = localStorage.getItem('token')
    if(token){
      Vue.axios.get('http://localhost:3000/users/'+token).then((response)=>{
        this.username = response.data.username
        this.login = true
      })
    } else {
      this.login = false
    }
  }

}
</script>

<style scoped>
#iconimg{
  height: 18px;
  margin-top: -2px
}
.md-icon{
  font-size: 22px;
  margin-top: -1px;
  min-height: 10px;
}
#tagname{
  margin-right: 10px
}
</style>
