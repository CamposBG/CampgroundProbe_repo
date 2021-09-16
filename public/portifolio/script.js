// I created a custon attribute called data-mode in the htm to use it to change the theme
let theme = localStorage.getItem("theme");
if(!theme){
    setTheme("light")
} else{
    setTheme(theme)
}

let themeDots = document.getElementsByClassName("theme-dot")

for (let index = 0; index < themeDots.length; index++) {
    themeDots[index].addEventListener("click", function(){
        let mode = this.dataset.mode 
        setTheme(mode)
        console.log(mode)
    })
  
}

function setTheme (mode){
    if (mode === "light") {
        document.getElementById("theme-style").href = "";
    }
    if (mode === "blue") {
        document.getElementById("theme-style").href = `/portifolio/${mode}.css`;
    }
    if (mode === "green") {
        document.getElementById("theme-style").href = `/portifolio/${mode}.css`;
    } else {
        document.getElementById("theme-style").href = `/portifolio/${mode}.css`;
    }

    localStorage.setItem("theme", mode)
}