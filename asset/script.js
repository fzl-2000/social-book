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