// Partie animation au scroll

const ratio = .1
const options = {
    root: null,
    rootMargin: '0px',
    threshold: ratio
}
const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
        if(entry.intersectionRatio > ratio){
            console.log('visible');
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
        }
    });
}

const observer = new IntersectionObserver(handleIntersect, options)
document.querySelectorAll('.reveal').forEach(function (r){
    observer.observe(r)
});


// Partie animation du texte qui s'écrit et s'efface tout seul dans le header.

let TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};
  
TxtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    let that = this;
    let delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
};
  
window.onload = function() {
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i=0; i<elements.length; i++) {
      let toRotate = elements[i].getAttribute('data-rotate');
      let period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};


// Partie formulaire avec AJAX.


const form = document.querySelector('form');
const success = document.createTextNode('Votre mail a bien été envoyé');
let span = document.querySelector('.success');
console.log(form);

form.addEventListener('submit', e =>{
    e.preventDefault();
    const formData = new FormData(form);
    console.log(formData);
    fetch('../PHP/index.php', {
        method: 'POST',
        body: formData
    }).then((response) =>{
        return response.json()
    }).then((data) =>{
        console.log(data);
        span.appendChild(success)
        return form.reset();

    })
})



// Bouton qui permet de revenir en haut du site.


let mybutton = document.getElementById("go-top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

