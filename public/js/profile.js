const myPost = document.querySelector('.my_post');
const signupLogin = document.querySelector('.signup-login');
const userInfoUpdata = document.querySelector('.user_info');
const username = document.querySelector('#username');
const imgUrl = document.querySelector('#img');
const update = document.querySelector('.update');
fetch('/api/v1/myPost').then((data) => data.json()).then((result) => {
  console.log(result);
  signupLogin.textContent = '';
  signupLogin.style.display = 'flex';
  signupLogin.style.alignItems = 'center';
  const profile = document.createElement('i');
  const profileLink = document.createElement('a');
  profileLink.href = '../pages/profile.html';
  profileLink.classList.add('fa-solid');
  profileLink.classList.add('fa-user');
  profile.textContent = result.userInfo.username;
  profile.appendChild(profileLink);
  signupLogin.appendChild(profile);
  const logout = document.createElement('h3');
  logout.textContent = 'logout';
  signupLogin.appendChild(logout);
  logout.classList.add('auth');
  logout.classList.add('signup');
  logout.style.textAlign = 'center';
  logout.style.padding = '.5rem';
  logout.addEventListener('click', () => {
    fetch('/api/v1/logout').then(() => { window.location.href = '/'; });
  });
  if (result.post.rows.length !== 0) {
    const revers = result.post.rows.reverse();
    revers.forEach((ele) => {
      const post = document.createElement('div');
      myPost.appendChild(post);
      post.className = 'post';
      const sidBar = document.createElement('div');
      sidBar.className = 'sidbar';
      post.appendChild(sidBar);
      const div = document.createElement('div');
      sidBar.appendChild(div);
      const i = document.createElement('i');
      i.classList.add('fa-solid');
      i.classList.add('fa-arrow-up');
      div.appendChild(i);
      const span = document.createElement('span');
      span.textContent = ele.vote;
      div.appendChild(span);
      const i1 = document.createElement('i');
      i1.classList.add('fa-solid');
      i1.classList.add('fa-arrow-down');
      div.appendChild(i1);
      const postContent = document.createElement('div');
      postContent.className = 'post-content';
      post.appendChild(postContent);
      const postHeader = document.createElement('div');
      postHeader.className = 'post-header';
      postContent.appendChild(postHeader);
      const userInfo = document.createElement('div');
      userInfo.className = 'user-info';
      postHeader.appendChild(userInfo);
      const headerImg = document.createElement('img');
      headerImg.src = result.userInfo.imag || 'https://keysight-h.assetsadobe.com/is/image/content/dam/keysight/en/img/about/corporate-social-responsibility/csr_environment_1200x900.png';
      userInfo.appendChild(headerImg);
      const h3Header = document.createElement('h3');
      h3Header.textContent = result.userInfo.username;
      userInfo.appendChild(h3Header);
      const joinBtn = document.createElement('button');
      joinBtn.className = 'join-button';
      joinBtn.textContent = 'join';
      postHeader.appendChild(joinBtn);
      const psotDescription = document.createElement('div');
      psotDescription.className = 'psot-description';
      postContent.appendChild(psotDescription);
      const h4 = document.createElement('h4');
      h4.textContent = ele.content;
      psotDescription.appendChild(h4);
      if (ele.img) {
        const contentImg = document.createElement('img');
        contentImg.src = ele.img;
        psotDescription.appendChild(contentImg);
      } else {
        const video = document.createElement('video');
        const controller = document.createAttribute('controls');
        video.setAttributeNode(controller);
        psotDescription.appendChild(video);
        const source = document.createElement('source');
        const src = document.createAttribute('src');
        src.textContent = ele.vedio;
        source.setAttributeNode(src);
        video.appendChild(source);
        source.type = 'video/mp4';
      }
      const postFooter = document.createElement('div');
      postContent.appendChild(postFooter);
      postFooter.className = 'post-footer';
      const comment = document.createElement('div');
      comment.textContent = 'comment';
      postFooter.appendChild(comment);
      const iComment = document.createElement('i');
      iComment.classList.add('fa-regular');
      iComment.classList.add('fa-comment');
      comment.appendChild(iComment);
      const deletePost = document.createElement('div');
      postFooter.appendChild(deletePost);
      deletePost.textContent = 'delete';
      const iDelete = document.createElement('i');
      iDelete.classList.add('fa-solid');
      iDelete.classList.add('fa-trash');
      deletePost.appendChild(iDelete);
      deletePost.addEventListener('click', () => {
        fetch('/api/v1/deletePost', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post_id: ele.id, user_id: ele.user_id }),
        }).then((res) => res.json()).then(console.log);
      });
      userInfoUpdata.addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/api/v1/updateUserInfo', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              userId: ele.user_id,
              username: username.value || result.userInfo.username,
              imag: imgUrl.value || result.userInfo.imag,
            },
          ),
        }).then((data) => data.json())
          .then((newData) => {
            profile.textContent = newData.rows[0].username;
            profile.appendChild(profileLink);
            username.value = '';
            imgUrl.vaule = '';
            update.textContent = 'update success';
          }).catch((err) => {
            update.textContent = err;
          });
      });
    });
  } else {
    return 'no result';
  }
});
