const loginBtn = document.querySelector('.login');
const signupBtn = document.querySelector('.signup');
const loginPop = document.querySelector('#login');
const signupPop = document.querySelector('#signup');
const usernameLogin = document.querySelector('.username-login');
const passwordLogin = document.querySelector('.password-login');
const loginButton = document.querySelector('.login-btn');
const signupButton = document.querySelector('.signup-btn');
const emailSignup = document.querySelector('.email-signup');
const usernameSignup = document.querySelector('.username-signup');
const passwordSignup = document.querySelector('.password-signup');
const close = document.querySelectorAll('.fa-xmark');
const signupLogin = document.querySelector('.signup-login');
const trending = document.querySelector('.trending');
const postsSection = document.querySelector('.posts-section');
const error = document.querySelector('.error');
const whenUserLogin = (data) => {
  trending.textContent = '';
  signupLogin.textContent = '';
  signupLogin.style.display = 'flex';
  signupLogin.style.alignItems = 'center';
  const profile = document.createElement('i');
  const profileLink = document.createElement('a');
  profileLink.href = '../pages/profile.html';
  profileLink.classList.add('fa-solid');
  profileLink.classList.add('fa-user');
  profile.appendChild(profileLink);
  signupLogin.appendChild(profile);
  const logout = document.createElement('h3');
  logout.textContent = 'logout';
  signupLogin.appendChild(logout);
  logout.classList.add('auth');
  logout.classList.add('signup');
  logout.style.textAlign = 'center';
  logout.style.padding = '.5rem';
  const section = document.createElement('section');
  const img = document.createElement('img');
  img.className = 'postImg';
  const postInput = document.createElement('input');
  postInput.className = 'post-input';
  const uploadFile = document.createElement('input');
  const postBtn = document.createElement('button');
  postBtn.className = 'post-button';
  postBtn.textContent = 'post';
  section.appendChild(postBtn);
  uploadFile.type = 'file';
  trending.appendChild(section);
  section.appendChild(img);
  section.appendChild(postInput);
  section.appendChild(uploadFile);
  trending.style.height = '3rem';
  trending.style.display = 'flex';
  trending.style.justifyContent = 'center';
  logout.addEventListener('click', () => {
    fetch('/api/v1/logout').then(() => { window.location.href = '/'; });
  });
  postBtn.addEventListener('click', () => {
    fetch('/api/v1/addPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: postInput.value, img: uploadFile.value || '', vedio: uploadFile.value || '', varg: 0, user_id: data.id,
      }),
    }).then((dataa) => dataa.json()).then(() => {
      window.location.reload();
    });
  });
};

loginBtn.addEventListener('click', () => {
  loginPop.classList.toggle('active');
});
signupBtn.addEventListener('click', () => {
  signupPop.classList.toggle('active');
});
close.forEach((element) => {
  element.addEventListener('click', () => {
    signupPop.classList.remove('active');
    loginPop.classList.remove('active');
  });
});
loginButton.addEventListener('click', () => {
  fetch('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: usernameLogin.value, password: passwordLogin.value }),
  }).then((data) => data.json()).then((data) => {
    if (data.msg === 'login successfully') {
      loginPop.classList.toggle('active');
    }
  }).catch((err) => console.log(err, 'login err'));
});
fetch('/api/v1/checklogged').then((data) => data.json()).then((data) => {
  if (!data.msg) {
    whenUserLogin(data);
  }
});
signupButton.addEventListener('click', () => {
  fetch('/api/v1/adduser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        email: emailSignup.value,
        username: usernameSignup.value,
        password: passwordSignup.value,
      },
    ),
  }).then((data) => data.json()).then((result) => {
    if (result.msg.detail) {
      throw result.msg;
    }
  })
    .catch((errsignup) => {
      error.textContent = errsignup.detail;
    });
});
fetch('/api/v1/allPost').then((data) => data.json()).then((result) => {
  const revers = result.reverse();
  revers.forEach((ele) => {
    const post = document.createElement('div');
    postsSection.appendChild(post);
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
    span.textContent = ele.varg;
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
    headerImg.src = 'https://pps.whatsapp.net/v/t61.24694-24/197091151_354939723197695_1626617075516079400_n.jpg?ccb=11-4&oh=01_AVx9pfvePCzlpYw1aKDtoQb_7Es-5Am-44PL127m1af0DQ&oe=632265A0';
    userInfo.appendChild(headerImg);
    const h3Header = document.createElement('h3');
    h3Header.textContent = 'husam';
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
  });
}).catch((err) => console.log(err, 'err'));
