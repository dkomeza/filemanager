export default function getCurrentIcon(name: string) {
  document.getElementById("logo")?.addEventListener("load", () => {
    setTimeout(() => {
      let nav = document
        .getElementsByClassName("navbar")[0]
        .getElementsByTagName("nav")[0] as HTMLElement;
      let allIcons = nav.getElementsByTagName("li");
      for (let i = 0; i < allIcons.length; i++) {
        allIcons[i].classList.remove("active");
      }
      let currentIcon = document
        .getElementsByClassName("navbar")[0]
        .getElementsByClassName(name)[0] as HTMLElement;
      let hoverEffect = document.getElementsByClassName(
        "hover-effect"
      )[0] as HTMLElement;

      currentIcon.classList.add("active");
      currentIcon.classList.add("hover");
      hoverEffect.style.top = `${
        currentIcon.getBoundingClientRect().top -
        nav.getBoundingClientRect().top
      }px`;
    }, 10);
  });
}
