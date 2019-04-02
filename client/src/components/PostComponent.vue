<template>
  <div class="container-fluid bg-light">
    <div class="row">
      <div class="col-lg-4 col-md-12 col-sm-12 mt-0">
          <form>
              <input type="text" class="input-name" v-bind:class="{ markInput: errorName }" id="create-post" v-model="name" placeholder="Insert Name" required>
              <input type="text" v-bind:class="{ markInput: errorSurname }"   v-model="surname" placeholder="Insert Last Name" required>
              <input type="text" v-bind:class="{ markInput: errorEmail }" v-model="email" placeholder="Insert Email" required>
              <p class="text-left errorEmailHidden" v-bind:class="{ errorEmail: errorEmail }">Email format must be: String<span class="font-weight-bold">@</span>String<span class="font-weight-bold" >.</span>String</p>
                <div class="container-select">
                <p class="select-country">Select Country</p>
                <div class="content-select">
               <select v-bind:class="{ markInput: errorCountry }" class="custom-select"  v-model="country" required>
                  <option v-for="(value, key) in countries" :value="key">{{ key.toUpperCase()}}</option>
                </select>
              </div>
              </div>
              <br>
               <button class="btn btn-success" @click="createPost">ADD USER TO DATABASE</button>
          </form>
      </div>
    <div class="col-lg-8 col-md-12 col-sm-12">

    <!-- HERE START THE LIST USERS -->
    <p class="error" v-if="error">{{ error }}</p>
      
      <div class="font-weight-bold row title-users users-edit">
        <div class="col-lg-2 p-0 col-sm-12">Name</div> 
        <div class="col-lg-2 p-0 col-sm-12">Last Name</div>
        <div class="col-lg-4 p-0 col-sm-12">Email</div>
        <div class="col-lg-2 p-0 col-sm-12">Country</div>
        <div class="col-lg-2 p-0 col-sm-12">Actions</div>
      </div>
      <div class="post"
      v-for="(post, index) in posts"
      v-bind:item = "post"
      v-bind:index = "index"
      v-bind:key = "post._id"
      >
      <!--
        {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}} -->
        <div class="row users-edit">
        <div class="col-lg-2 my-auto col-md-12 col-sm-12"> {{ post.name }}</div>
        <div class="col-lg-2 my-auto col-md-12 col-sm-12"> {{ post.surname }}</div>
        <div class="col-lg-4 my-auto col-md-12 col-sm-12">{{ post.email }}</div>
        <div class="col-lg-2 my-auto col-md-12 col-sm-12"> {{ post.country.charAt(0).toUpperCase() + post.country.slice(1) }}</div>
        <div class="col-lg-2 my-auto col-md-12 col-sm-12">
        <router-link :to="{ name: 'editpost', params: { id: post._id, name:post.name, surname: post.surname, email:post.email, country: post.country  }}">
         <i class="fas fa-pencil-alt"></i>
       </router-link>
       <i @click="deletePost(post._id)" class="far fa-trash-alt"></i>
       </div>
       </div>

      </div>
    </div>
  </div>
  </div>

</template>

<script>
import PostService from '../PostService'

import ListComponents from './ListComponents'

const countryList = require('country-list')

export default {
  name: 'PostComponent',
  components: {
    ListComponents
  },

  data () {
    return {
      posts: [],
      error: '',
      name: '',
      errorName: false,
      surname: '',
      errorSurname: false,
      country: '',
      errorCountry: false,
      email: '',
      errorEmail: false,
      countries: countryList.getNameList()
    }
  },

  async created () {
    try {
      this.posts = await PostService.getPosts()
    } catch (err) {
      this.error = err.message
    }
  },

  methods: {
    async createPost () {
          if (this.name ==""){
        this.errorName = true;
      } else if (this.surname ==""){
        this.errorSurname = true;
      } else if (this.email =="" || !this.validEmail(this.email)){
        this.errorEmail = true;
      } else if (this.country ==""){
        this.errorCountry = true;
      } else {
        await PostService.insertPost(this.name, this.surname, this.email, this.country)
        this.posts = await PostService.getPosts()
        this.errorName= false
        this.errorSurname= false
        this.errorCountry= false
        this.errorEmail= false
          this.name= ""
          this.surname= ""
          this.country= ""
          this.email= ""

      }
    },

    async deletePost (id) {
      await PostService.deletePost(id)
      this.posts = await PostService.getPosts()
    },

    async editPost (id) {
      await PostService.editPost(id)
      this.posts = await PostService.getPosts()
    },

    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.post {
  width: 100%;
}

.users-edit {
 margin: 0;
 border: 1px solid #246eb9;
}

.fa-trash-alt {
  cursor: pointer;
}

.col-sm-12 {
  text-overflow: ellipsis;
  overflow: hidden;
}

.col-sm-3 {
  align-content: center;
}

.errorEmailHidden {
  display: none;
}

.errorEmail {
  font-size: 0.8rem;
  color: #ED4544;
  display: block;
}

input[type="text"], input[type="email"] {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  padding: 15px 10px;
  border:none;
  border-bottom: 2px solid #ccc;
  font-size: 18px;
}

input[type="text"]:focus, input[type="email"]:focus {
  border-bottom: 2px solid #246eb9;
  outline: none;
}

.markInput {
  border-bottom: 3px solid red !important;
  outline: none;
}

.title-users {
  
}


.container-select {

  text-align: left;
}

select {
  width: 100%;
  font-size: 0.8rem;
  margin-left: 0;
}

option {
  width: 260px;
  font-size: 0.8rem;
}

form {
  font-family: Helvetica;
  padding: 0.8rem 2rem 0 2rem;
  border: 2px solid #246eb9;
  border-radius: 5px;
  max-width: 550px;
  margin: 0 auto;
  margin-bottom: 1rem;
}

.fas {
  margin: 0.2rem 0;
  border: 1px solid #6B737D;
  background-color: #6B737D;
  color: white;
  padding: 0.6rem;
  border-radius: 3px;
}

.select-country {
  font-size: 18px;
}

.far {
  margin: 0.2rem 0;
  border: 1px solid #ED4544;
  background-color: #ED4544;
  color: white;
  padding: 0.6rem;
  border-radius: 3px;
}

.btn-success {
  margin-bottom: 1rem;
}

.content-select {
    display: inline-flex;
  width: 100%;
}


</style>
