import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService {
	// Get Posts
	static getPosts() {
		return new Promise(async (resolve, reject) => {
			try{
				const res = await axios.get(url);
				const data = res.data;
				resolve(
					data.map(post => ({
					...post,
					createdAt: new Date(post.createdAt)
					}))
				 );
			} catch(err) {
				reject(err);
			}
		});
	}

	// Create Post 
	static insertPost(text, surname, email, country) {
		return axios.post(url, {
			text, //text:text
			surname,
			email,
			country
		});
	}

	// Delete Post
	static deletePost(id) {
		return axios.delete(`${url}${id}`);
	}


	// Edit Post
	static editPost(id, name, surname, email, country) {
		return axios.put(`${url}${id}`,{
			name,
			surname,
			email,
			country
		});
	}
}

export default PostService;