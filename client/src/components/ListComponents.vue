<template>
<div class="container-fluid bg-light">
    <div class="card-columns">
      <div class="card"
    v-for="(post, index) in posts"
      v-bind:item = "post"
      v-bind:index = "index"
      v-bind:key = "post._id"
      >
         <img class="card-img-top" src="../../static/user-avatar.png" alt="Card image cap">
         <div class="card-body">
         <h6 class="card-title">Name: {{post.name}}</h6>
         <h6 class="card-title">Last Name: {{post.surname}}</h6>
         <h6 class="card-title">E-mail: {{post.email}}</h6>
         <h6 class="card-title">Country: {{post.country.charAt(0).toUpperCase() + post.country.slice(1)}}</h6>
       </div>
     </div>
    </div>
</div>
</template>

<script>
import PostService from '../PostService';
	export default {

 data () {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },

  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  }

}


</script>

<style>

.card-img-top {
  width: 3rem;
  margin: 0 auto;
  padding-top: 0.2rem;
}

.card {
  background-color: #f5f5f5;
}


</style>