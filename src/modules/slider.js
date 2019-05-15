/*
<div class="items">
div.item,item1~10
</div>

<style>
.item.active{
cursor:grabbing}
</style>

*/

export function sliderFunc() {
  const slider = document.querySelector(".items");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", e => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", e => {
    if (!isDown) return; //stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  });
}


const offSet = slider.offsetLeft
      let isDown = false;
      let startX;
      let scrollLeft;
      slider.addEventListener("mousedown", e => {
        isDown = true;
        this.isActive = true;
        startX = e.pageX - slider.offsetLeft;
      console.log("offsetLeft",slider.offsetLeft)
      console.log("pageX",e.pageX)
        // console.log("시작", startX);
        // scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener("mouseleave", () => {
        isDown = false;
        this.isActive = false;
        // console.log("leave");
      });
      slider.addEventListener("mouseup", () =>  {
        isDown = false;
        this.isActive = false;
        // console.log("up");
      });
      slider.addEventListener("mousemove", e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        if (walk <= 0) {
          slider.style.left = "-100%";
        } else {
          slider.style.left = "0";
        }
      });
    }
