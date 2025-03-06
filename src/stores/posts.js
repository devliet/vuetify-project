import { defineStore } from "pinia";
export const usePostsStore = defineStore('posts',
    {
        state: () => ({ posts: [], page: 0 }) ,
        actions: {
         async   fetchFields(page=true, skip, limit) {
                const [fields1Response, fields2Response, fields3Response] = await Promise.all([
                    fetch(`https://dummyjson.com/posts?select=userId,body,reactions,views&skip=${skip.value}&limit=${limit.value}`),
                    fetch(`https://dummyjson.com/users?select=username,image&skip=${skip.value}&limit=${limit.value}`),
                    //   fetch(`https://dummyjson.com/comments?skip=${skip.value}&limit=${limit.value}`),
                    fetch(`https://dummyjson.com/comments?limit=${limit.value}`),
                ])

                const fields1 =[], fields2=[], fields3=[]

                const fields11 = await fields1Response.json();
                //  fields1.value = fields11
                const fields22 = await fields2Response.json();
                //  fields2.value = fields22

                const fields33 = await fields3Response.json();
                //  fields3.value = fields33

                fields1.value = fields11.posts;
                fields2.value = fields22.users;
                fields3.value = fields33.comments;

                for (let index = 0; index <= limit.value - 1; index++) {
                    this.posts.push({
                        postId: fields3.value[index].postId.toString(),
                        username: fields2.value[index].username,
                        userId: fields1.value[index].userId,
                        avatarSrc: fields2.value[index].image,
                        post: fields1.value[index].body,
                        //   comments="fields3[index].body,
                        likes: fields1.value.likes,
                        retweets: fields1.value[index].reactions.dislikes,
                        tags: fields1.value[index].tags

                    })

                }

                console.log( this.posts);
            }

            ,
            removePosts(postIndex) {
                this.posts.splice(postIndex, 1);
            },
            addPost(postText){
                const post = generatePostStructure(postText);
                this.posts.unshift(post);
            }

        },

    
    }
) 
   const generatePostStructure = (postText)=> {
            return {
            postId: "60d0fe4f5311236168a100cs",
            username: "Anon",
            userId: -1,
            avatarSrc:  "https://dummyjson.com/icon/michaelw/128",
            post: postText,
            likes: 0,
            retweets: "0",
            tags: []

            }
        }