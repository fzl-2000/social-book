/******variables****************** */
let seeMore=document.querySelectorAll('.see-more')
let close=document.querySelectorAll(".close-all")
seeMore.forEach(button => {
  button.addEventListener('click', function() {
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
      fullContent.style.maxHeight="0px"
      button.textContent = 'See More';
    }
  });
});
/*****close and open**** */
close.forEach(button=>{
  button.addEventListener("click",closef)
})
 function closef(e){
  let fullContent=e.target.parentElement.nextElementSibling;
    fullContent.classList.toggle('remove')
    if(fullContent.classList.contains("remove")){
      e.target.textContent="open"
    }
    else
    {
      e.target.textContent="close"
    }
 }
 /***************arrow-down */
 let arrowDown=document.querySelector('.arrow-down')
 console.log(arrowDown)
let private=document.querySelector(".private")
arrowDown.addEventListener("click",arrowDownF)
function arrowDownF() {
  arrowDown.classList.toggle("bx-caret-up");
  
  if(arrowDown.classList.contains("bx-caret-up")){
    private.style.visibility = "hidden";
  } else {
    private.style.visibility = "visible";
  }
}
/************add new post*********** */
let inputnewpost=document.querySelector(".input-textarea")
let newposts=document.querySelector(".new-posts")
let inputfile=document.querySelector(".input-photo")
inputfilevalue=inputfile.value;
console.log(inputfilevalue)
inputfile.addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onload = function(event) {
    const img = document.createElement('img');
    img.src = event.target.result;
    img.height = 200;
    document.body.appendChild(img);
  };
  
  reader.readAsDataURL(file);
});

  function createPost() {
    let inputcontent = inputnewpost.value.trim();
    
    if (inputcontent) {
        const newPost = document.createElement('div');
        newPost.className = 'new-post';
        
        newPost.innerHTML = `
            <div class="post-title">
                <div class="user-post-info">
                    <div class="user-post">
                        <img src="./asset/images/profile-pic.png"/>
                    </div>
                    <div class="new-post-info">
                        <p>john nicholson</p>
                        <span>${getCustomDateTime()}</span>
                    </div>
                </div>
                <i class='bx bx-dots-horizontal-rounded bx-rotate-90' style='color:#c0baba'></i>           
            </div>
            <p class="post-info-text">
                ${inputcontent}
                <a href="#">#social book</a>
                <a href="#">social media</a>
            </p>
            <div class="post-img">
                <img src="" alt="">
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
        `;
        
        // اضافه کردن پست جدید به ابتدای لیست
        newposts.appendChild(newPost);
        
        // پاک کردن فیلد ورودی
        inputnewpost.value = "";
    }
}

// رویداد کیبورد
inputnewpost.addEventListener('keydown', function(event) {
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

console.log(getCustomDateTime());
// مثال خروجی: "Saturday, July 13, 2024 14:30:45"