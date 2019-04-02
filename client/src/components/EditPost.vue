<template>
<div>
  <b-modal no-close-on-backdrop data-keyboard="false" size="lg" id="modal" hide-header-close hide-footer ref="myModalRef" title="Edit User"> 
		<form>
  	  <p class="edit-field text-left">Name</p>
      <input type="text" v-bind:class="{ markInput: errorName }" v-model="nameEdit" placeholder="Insert Name" required>
      <p class="edit-field text-left">Last Name</p>
      <input type="text" v-bind:class="{ markInput: errorSurname }"   v-model="surnameEdit" placeholder="Insert Last Name" required>
      <p class="edit-field text-left">Email</p>
      <input type="text" v-bind:class="{ markInput: errorEmail }" v-model="emailEdit" placeholder="Insert Email" required>
      <p class="text-left errorEmailHidden" v-bind:class="{ errorEmail: errorEmail }">Email format must be: String<span class="font-weight-bold">@</span>String<span class="font-weight-bold" >.</span>String</p>
      <p class="edit-field text-left">Country</p>
      <select v-bind:class="{ markInput: errorCountry }" class="custom-select"  v-model="countryEdit" required>
          <option v-for="(value, key) in countries" :value="key">{{ key.toUpperCase()}}</option>
        </select>
        <br>
        <div class="row action-buttons">
            <div class="col">
               <button type="button" class="btn btn-success" @click="editPost(id)">EDIT USER</button>
            </div>
            <div class="col">
             <button type="button" class="btn btn-danger" @click="cancelChanges">CANCEL</button>
            </div>
        </div>
      </form>
      </b-modal>
    </div>
</template>

<script>
	import PostService from '../PostService';
	const countryList = require('country-list');
	export default {
		data (){
			return {
        headerTextVariant: 'margin: 0 auto',
			nameEdit: this.name,
			surnameEdit: this.surname,
			emailEdit: this.email,
			countryEdit: this.country,
			errorName: false,
			errorSurname: false,
			errorEmail: false,
			errorCountry: false,
			countries: countryList.getNameList()
			}
		},

		methods: {
      		 async editPost(id) {
      		 	 if (this.nameEdit ==""){
        this.errorName = true;
      } else if (this.surnameEdit ==""){
        this.errorSurname = true;
      } else if (this.emailEdit =="" || !this.validEmail(this.emailEdit)){
        this.errorEmail = true;
      } else if (this.countryEdit ==""){
        this.errorCountry = true;
      } else {
      		await PostService.editPost(id, this.nameEdit, this.surnameEdit, this.emailEdit, this.countryEdit);
      		this.posts = await PostService.getPosts();
      		this.$router.replace('postcomponent')
      		}

      	},

   			 validEmail: function (email) {
    			  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     				 return re.test(email);
   			 },

   			 cancelChanges() {
   			 	this.$refs.myModalRef.hide()
   			 	this.$router.replace('postcomponent')
   			 }
  		},

		props: {
			id: {
				required: true
			},
			name: {
				required: true
			},
			surname: {
				required: true
			},
			email: {
				required: true
			},
			country: {
				required: true
			}
		},
			mounted(){ 
			this.$refs.myModalRef.show()

		}
	}

</script>

<style scoped>


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
  padding: 0.3rem 2rem 0 2rem;
  border: 2px solid #246eb9;
  border-radius: 5px;
  max-width: 500px;
  margin: 0 auto;
}



.errorEmailHidden {
  display: none;
}

.errorEmail {
  font-size: 0.8rem;
  color: #ED4544;
  display: block;
}

.action-buttons {
	margin-bottom: 1rem;
  margin-top: 1rem;
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

.edit-field {
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  margin-left: 0.2rem;
}

select {
  margin-top: 0.4rem;
}

b-modal .modal-header {
  margin: 0 auto;
}



</style>