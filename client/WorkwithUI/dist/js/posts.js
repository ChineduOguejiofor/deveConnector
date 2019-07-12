const postBody = document.getElementById('postBody');
const userId = localStorage.getItem('userId');

callFetchAPI('/posts', 'GET', null, ({ statusCode, data }) => {
  if (statusCode === 400) {
    alert('there was an error');
    console.log(data);
  } else if (statusCode === 200) {
    console.log(data);

    console.log(data[0].date);
    console.log(formatDate(data[0].date));

    // debugger;
    data.forEach(currentPost => {
      const post = document.createElement('div');

      post.classList = 'post bg-white my-1 p-1';

      let deleteButtonHTML = '';
      if (userId === currentPost.user) {
        deleteButtonHTML = `
        
        <button onClick="deletePost(event,'${
          currentPost._id
        }')" type='button' class='btn btn-danger'>
        <i class='fas fa-times'></i>
        </button>

      `;
      }

      post.innerHTML = `
      
      <div>
        <a href="profile.html">
          <img
            class="round-img"
            src="http:${currentPost.avatar}"
            alt=""
          />
          <h4>${currentPost.name}</h4>
        </a>
      </div>
  
      <div>
        <p class="my-1">
        ${currentPost.text}
        </p>
        <p>Posted on ${formatDate(currentPost.date)}</p>
        <button onClick="likeComment('${
          currentPost._id
        }')" class="btn" id="likebtn">
          <i class="fas fa-thumbs-up"></i> <span id="likeCount">${
            currentPost.likes.length > 0 ? currentPost.likes.length : ''
          }</span>
        </button>
        <button onClick="unlikeComment('${currentPost._id}')" class="btn">
          <i class="fas fa-thumbs-down"></i>
        </button>
  
        <button class="btn btn-primary" onClick="viewComment('${
          currentPost._id
        }')">Discussion 
        <span class='comment-count'>${
          currentPost.comments.length > 0 ? currentPost.comments.length : ''
        }</span></button>
  
        ${deleteButtonHTML}
  
      </div>
    
      `;

      postBody.appendChild(post);
    });

    //end here
  }
});
function createPost(event) {
  event.preventDefault();

  let text = document.getElementById('postContent').value;
  // const text = { ptext };

  callFetchAPI('/posts', 'POST', { text }, ({ statusCode, data }) => {
    if (statusCode === 400) {
      alert('there was an err');
      console.log(data);
    } else if (statusCode === 200) {
      document.getElementById('postContent').value = '';
      //add post to UI
      console.log(data);

      const post = document.createElement('div');

      post.classList = 'post bg-white my-1 p-1';
      post.innerHTML = `
      
      <div>
        <a href="profile.html">
          <img
            class="round-img"
            src="http:${data.avatar}"
            alt=""
          />
          <h4>${data.name}</h4>
        </a>
      </div>
  
      <div>
        <p class="my-1">
        ${data.text}
        </p>
        <p>Posted on ${formatDate(data.date)}</p>
        <button onClick="likeComment('${data._id}')" class="btn" id="likebtn">
          <i class="fas fa-thumbs-up"></i> <span id="likeCount">${
            data.likes.length > 0 ? data.likes.length : ''
          }</span>
        </button>
        <button onClick="unlikeComment('${data._id}')" class="btn">
          <i class="fas fa-thumbs-down"></i>
        </button>
  
        <button class="btn btn-primary" onClick="viewComment('${
          data._id
        }')">Discussion 
       </button>
  
       
        <button onClick="deletePost(event,'${
          data._id
        }')" type='button' class='btn btn-danger'>
        <i class='fas fa-times'></i>
        </button>
  
  
      </div>
    
      `;

      postBody.prepend(post);
      const alertDiv = document.getElementById('displayAlert');
      displayAlert(alertDiv, 'Post Added');
    }
  });
  // alert(text.value);
}

function deletePost(event, id) {
  callFetchAPI('/posts/' + id, 'DELETE', null, res => {
    if (res.statusCode === 400) {
      console.log(res.data);
    } else if (res.statusCode === 200) {
      event.target.parentElement.parentElement.remove();
      const alertDiv = document.getElementById('displayAlert');
      displayAlert(alertDiv, 'Post Removed');
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      console.log(res.data);
    }
    console.log(res);
  });
}

function likeComment(id) {
  callFetchAPI('/posts/like/' + id, 'PUT', null, res => {
    console.log(res);
    if (res.statusCode === 200) {
      const likecount = document.getElementById('likeCount');

      if (res.data.length === 0) {
        likecount.textContent = '';
      } else {
        likecount.textContent = res.data.length;
      }
    }
  });
}

function unlikeComment(id) {
  callFetchAPI('/posts/unlike/' + id, 'PUT', null, res => {
    if (res.statusCode === 200) {
      const likecount = document.getElementById('likeCount');

      if (res.data.length === 0) {
        likecount.textContent = '';
      } else {
        likecount.textContent = res.data.length;
      }
    }
  });

  // alert('You unliked a comment');
}

function viewComment(id) {
  // localStorage.setItem('clickedPost', id);
  // location.href = 'post.html';
  window.document.location = './post.html' + '?clickedPost=' + id;
}
