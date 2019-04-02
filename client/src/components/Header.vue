<template>
<div>
     <nav class="navbar navbar-expand-lg navbar-light bg-light text-center justify-content-center">
        <div class="container">
        <div class="font-weight-bold row d-flex text-center justify-content-center">
              <div class="col-sm-12 col-md-3 col-lg-3">
                  <router-link to="/listcomponents">
                  <div class="router-div">
                    USERS LIST
                  </div>
                  </router-link>
            </div>
            <div class="col-sm-12 col-md-5 col-lg-5">
                <router-link to="/postcomponent">
                <div class="router-div">
                    REGISTER/EDIT/DELETE USER
                  </div>
              </router-link>
            </div>
        </div>
        </div>
      </nav>
	</div>
</template>

<style scoped>

.row {
	width: 100%;
	margin: 0;
	align-items: center;
}

    .router-div {
     border: 5px solid #246eb9;
     border-radius: 20px;
     margin: 2rem 0;
     padding: 0.5rem 0;
    }

	.router-div:hover {
		background-color: #246eb9;
		color: white;
	}


    a {
    text-decoration: none;
    color: #246eb9;
    }


</style>