function toggleNav() {

  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if (width > 510) {
    if (!document.getElementById("body").classList.contains("body-wrap")) {
      document.getElementById("body").classList.add("body-wrap");
      const textos = document.getElementsByClassName("sidebartext");
      for (element of textos) {
        element.classList.add("sidebartext-hidden");
      };

    } else {
      document.getElementById("body").classList.remove("body-wrap");
      const textos = document.getElementsByClassName("sidebartext");
      for (element of textos) {
        element.classList.remove("sidebartext-hidden");
      };

    }
  } else {
    const sidebar = document.getElementById("expand-sidebar");
    if (sidebar.style.height != "4vh"){
      sidebar.style.height = "4vh"
    } else {
      sidebar.style.height = "36vh"
    }
  }

}

