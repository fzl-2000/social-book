/******see more button****************** */
let seeMore = document.querySelectorAll('.see-more')
let close = document.querySelectorAll(".close-all")
seeMore.forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault()
    const fullContent = button.parentElement.parentElement.nextElementSibling;
    const currentClipPath = window.getComputedStyle(fullContent).clipPath;
    const isHidden = currentClipPath === "polygon(0px 0px, 100% 0px, 100% 0px, 0px 0px)" ||
      currentClipPath === "polygon(0 0, 100% 0, 100% 0, 0 0)";

    if (isHidden) {
      fullContent.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      fullContent.style.maxHeight = "fit-content";
      button.textContent = 'See Less';
    } else {

      fullContent.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
      fullContent.style.maxHeight = "0px"
      button.textContent = 'See More';
    }
  });
});
/*****close and open**** */
close.forEach(button => {
  button.addEventListener("click", closef)
})
function closef(e) {
  let fullContent = e.target.parentElement.nextElementSibling;
  fullContent.classList.toggle('remove')
  if (fullContent.classList.contains("remove")) {
    e.target.textContent = "open"
  }
  else {
    e.target.textContent = "close"
  }
}
/***************arrow-down */
let arrowDown = document.querySelector('.arrow-down')
console.log(arrowDown)
let private = document.querySelector(".private")
arrowDown.addEventListener("click", arrowDownF)
function arrowDownF() {
  arrowDown.classList.toggle("bx-caret-up");

  if (arrowDown.classList.contains("bx-caret-up")) {
    private.style.visibility = "hidden";
  } else {
    private.style.visibility = "visible";
  }
}

//creating post
let newposts = document.querySelector(".new-posts")
let inputfile = document.querySelector(".input-photo");
let inputFileVideo=document.querySelector(".input-video")
//upload image
let newPostVideo;
let newPostImg
inputfile.addEventListener('change', upload)
inputFileVideo.addEventListener('change',upload)
function upload(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (ev) => {
    let selectedImgUrl = ev.target.result;
    let selectdVideoUrl=ev.target.result;
    newPostImg = selectedImgUrl;
    newPostVideo=selectdVideoUrl

  }
  reader.readAsDataURL(file);

  
}
// create new post 
let posts = [];
function createPost() {
  let inputcontent = (document.querySelector(".input-textarea")).value.trim();
  if (inputcontent) {
    let newPost = {
      content: inputcontent,
      image: newPostImg || null,
      createdAt: getCustomDateTime(),
      video:newPostVideo || null

    }
    posts.push(newPost)

    updateUi()

    newPostImg = null
    newPostVideo=null
  
  }
}
function updateUi() {
  console.log(posts);

  posts.forEach(post => {
  let  newPost = `
    <div class ="new-post old-post">
            <div class="post-title">
                <div class="user-post-info">
                    <div class="user-post">
                        <img src="./asset/images/profile-pic.png"/>
                    </div>
                    <div class="new-post-info">
                        <p>john nicholson</p>
                        <span>${post.createdAt}</span>
                    </div>
                </div>
                <i class='bx bx-dots-horizontal-rounded bx-rotate-90 delete' style='color:#c0baba'></i>
                 <div class="delete-link">
                      <a href="#" class="confirm-delete">
                           delete
                      </a> 
                  </div>            
            </div>
            <p class="post-info-text">
                ${post.content}
                <a href="#">#social book</a>
                <a href="#">social media</a>
            </p>
            <div class="post-img">
                <img src="${post.image ? post.image : null || post.video ?post.video :null} " alt="">
            </div>
            <div class="post-activity">
                <div class="left-activity-icons">
                    <div class="activity">
                        <i class="bx bxs-like bx-tada" style='color:#c0baba'></i>
                        120
                    </div>
                    <div class="activity">
                        <i class='bx bxs-bookmark bx-tada' style='color:#c0baba'></i>40                                 
                    </div>
                    <div class="activity">
                        <i class='bx bxs-share bx-tada bx-rotate-180' style='color:#c0baba'></i>50                         
                    </div>
                </div>
                <div class="post-profile-icon">
                    <img src="./asset/images/profile-pic.png"/>
                    <i class='bx bx-caret-down arrow-down' style='color:#c0baba'></i>
                </div>
            </div>
            </div>
        </div>
        `;
    newposts.insertAdjacentHTML("afterbegin", newPost);
  })
}







//enter event
(document.querySelector(".input-textarea")).addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    createPost();
  }
});
//to get time
function getCustomDateTime() {
  const now = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  const hours = String(now.getHours())
  const minutes = String(now.getMinutes())
  return ` ${monthName} ${day}, ${year} ${hours}:${minutes}`;
}

let settingMenu=document.querySelector(".setting-menu")
let userIcon=document.querySelector('.user-icon ');
userIcon.addEventListener('click',showmenuF)
function showmenuF() {
    settingMenu.classList.toggle("setting-menu-height")
}

//remove post button
let postContainer=document.querySelector('.posts-container')
postContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const deleteLink = e.target.nextElementSibling;
        deleteLink.classList.toggle('remove-post');
    }
    if(e.target.classList.contains('confirm-delete')){
      e.preventDefault();
      let post=e.target.closest('.old-post')
      post.remove()
    }
 

});








