// STARTING PARAMS
const searchParams = [...new URLSearchParams(location.search).entries()].reduce((prev, [key,val]) => {prev[key] = val; return prev}, {});
// ENDING PARAMS

// STARTING PHONE COUNTRY SELECT
document.querySelectorAll('[type*="tel"]').forEach(input => {
    const inputHidden = document.createElement("input");
    inputHidden.setAttribute("name", input.getAttribute("name"));
    const iti = window.intlTelInput(input, {initialCountry: "us",  nationalMode: true,});
    input.addEventListener("change", e=> input.value = `+${iti.getSelectedCountryData().dialCode} ${input.value.replace(/(\+.*?\ )/gi, "")}`);
});
// ENDING PHONE COUNTRY SELECT

// STARTING TOOLTIPS

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

// ENDING TOOLTIPS

// STARTING POPOVER

const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
});

// ENDING POPOVER

// STARTING HEADER STICKLY AND BUTTON UP TO TOP

const upToTop = document.createElement("button");
upToTop.setAttribute("class", "btn btn-primary up-to-top");
upToTop.id = "up-to-top";

upToTop.innerHTML = `<i class="bi bi-arrow-up"></i>`;

document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
          document.querySelector('.fixed-header').classList.add('fixed-top');
          if(document.querySelector('.fixed-header').parentElement) {
            const fixedClass = "fixed-top"
            if(fixedClass) {
                document.querySelector('.fixed-header').classList.add(fixedClass);
            };
          };
          // add padding top to show content behind navbar
          navbar_height = document.querySelector('.fixed-header').offsetHeight;
          document.body.style.paddingTop = navbar_height + 'px';
          setTimeout(() => {
              document.querySelector(".fixed-header").style.top = 0;
          }, 1000);
          document.body.prepend(upToTop);
        } else {
          document.querySelector('.fixed-header').classList.remove('fixed-top');
          document.querySelector('.fixed-header').removeAttribute('style');
          if(document.querySelector('.fixed-header').parentElement) {
            const fixedClass = document.querySelector('.fixed-header').parentElement.dataset.fixedClass;
            if(fixedClass) {
                if(document.querySelector('.fixed-header').classList.contains(fixedClass)) {
                    document.querySelector('.fixed-header').classList.remove(fixedClass);
                };
            }
          };
           // remove padding top from body
          document.body.style.paddingTop = '0';
          if(upToTop) {

            upToTop.remove();

          };
        } 
    });
});

if(upToTop) {

    upToTop.addEventListener("click", e=> {

        document.body.scrollTop = document.documentElement.scrollTop = 0;

    });

};

// ENDING HEADER STICKLY AND BUTTON UP TO TOP

// STARTING OVERLAY

const overlay = document.createElement("div");
const scrollWidth = window.innerWidth-$(document).width();
overlay.id = "overlay";
overlay.classList.add("overlay");

function overflow(bool) {

    if(bool) {
        document.body.prepend(overlay);
        document.body.classList.add("overflow-hidden");
        document.body.style.paddingRight = `${scrollWidth}px`;
        if(document.querySelector(".fixed-top") ) document.querySelector(".fixed-top").style.paddingRight = `${scrollWidth}px`;
    } else {
        if(overlay) overlay.remove();
        document.body.classList.remove("overflow-hidden");
        document.body.removeAttribute("style");
        if(document.querySelector(".fixed-top") ) document.querySelector(".fixed-top").style.paddingRight = "unset";
    };
};

// ENDING OVERLAY

// STARTING NAVBAR COLLAPSE

document.querySelectorAll("header .navbar-toggler").forEach(toggler => {
    toggler.addEventListener("click", e=> {
        overflow(!document.body.classList.contains("overflow-hidden"));
    });
});

// ENDING NAVBAR COLLAPSE

window.addEventListener("resize", e=> {
    
    const getCollapse = document.querySelectorAll("header .navbar-collapse");
    
    if(!window.matchMedia("(max-width: 1199px)").matches) {
        getCollapse.forEach(collapse => $(collapse).collapse("hide"));
        overflow(false);
    };

});

// STARTING PARALLAX

function parallax(els) {
    ((Array.isArray(els)) ? els : [els]).filter(el => {
        const element = document.querySelector(el);
        if(element) new Parallax(element);
    });

}

parallax(["#preview-features"])

// ENDING PARALLAX

// STARTING SIDE-BY-SIDE CHOOSE

const avatars = document.createElement("div");
avatars.setAttribute("class", "owl-carousel avatars mt-2");
avatars.setAttribute("data-slider-margin", 30);
avatars.setAttribute("data-slider-dots", "off");
avatars.setAttribute("data-slider-items-0", 1);
avatars.setAttribute("data-slider-items-480", 2);
avatars.setAttribute("data-slider-items-1020", 4);
avatars.setAttribute("data-slider-items-1500", 5);

document.querySelectorAll(".side-by-side-choose .side-by-side-item:first-child").forEach((el, index) => {
    
    const parentEl = el.closest(".side-by-side-choose");
    const img = el.dataset.ssImg;
    const title = el.dataset.ssTitle;
    const subtitle = el.dataset.ssSubtitle;
    const rate = (el.dataset.ssRates && !isNaN(el.dataset.ssRates)) ? (parseFloat(el.dataset.ssRates) < 5) ? parseFloat(el.dataset.ssRates) : 5 : 0;

    if(!img || !title || !subtitle) return false;

    const firstBox = document.createElement("div");
    const rateBox = document.createElement("div");
    firstBox.setAttribute("class", "d-flex flex-column");
    rateBox.setAttribute("class", "rates mt-2");

    firstBox.innerHTML = `
        <span class="h6 mb-1 title">${title}</span>
        <span>${subtitle}</span>
    `;

    el.appendChild(firstBox);

    for(let i = 0; i < 5; i++) {
        const star = document.createElement("i");
        star.setAttribute("class", `bi ${(i < rate) ? "bi-star-fill" : "bi-star"} me-1`);
        rateBox.appendChild(star);
    };

    if(Math.floor(parseInt(rate)) !== rate) {
        rateBox.querySelectorAll("i")[parseInt(rate)].setAttribute("class", "bi bi-star-half me-1");
    }

    if(rateBox.children.length >= 1) el.querySelector(".h3").parentNode.insertBefore(rateBox, el.querySelector(".h3").nextElementSibling);

    const avatar = document.createElement("div");
    avatar.setAttribute("class", "avatar mw-100 h-100 d-flex align-items-center text-start cursor-pointer border rounded");
    if(index === 0) avatar.classList.add("avatar-active");
    avatar.setAttribute("style", "width: unset !important");
    avatar.dataset.ccTarget = index;
    avatar.innerHTML = `
    <div class="content-img me-3"><img class="img-fluid img-thumbnail" src="${img}" width="100" height="100" alt="${title} Profile Image"></div>
    <div class="avatar-info d-flex flex-column">
      <span class="h6 small mb-1">${title}</span>
      <time class="small text-muted">${subtitle}</time>
    </div>
    `;

    avatars.appendChild(avatar);

    avatar.addEventListener("click", e=> {
        avatars.querySelectorAll(".avatar").forEach(el => (el.classList.contains("avatar-active") && el.classList.remove("avatar-active")));
        [...parentEl.children].forEach(el => {
            el.classList.add("d-none");
            el.ariaHidden = true;
        });
        avatar.classList.add("avatar-active");
        if(el.closest(".side-by-side-parent").classList.contains("d-none")) {
            el.closest(".side-by-side-parent").classList.remove("d-none");
            el.closest(".side-by-side-parent").ariaHidden = false;
        };
    });

    if(index >= 1) parentEl.parentElement.insertBefore(avatars, parentEl.nextElementSibling);

});

// ENDING SIDE-BY-SIDE CHOOSE

// STARTING VIDEO EMBED

document.querySelectorAll(".watch-video-play").forEach(el => {
    if(!el.dataset.videoEmbed) return false;
    el.addEventListener("click", e=> videoEmbed(el.dataset.videoEmbed));
});

function videoEmbed(src) {

    if(document.querySelector(".video-embed")) {
        document.querySelectorAll(".video-embed").forEach(videoEmbed => videoEmbed.remove());
    };

    const videoEmbed = document.createElement("div");
    videoEmbed.classList.add("video-embed");

    videoEmbed.innerHTML = `
        <div class="embed-responsive embed-responsive-21by9 d-flex flex-column align-items-end">
            <button><i class="bi bi-x-circle hover-white"></i></button>
            <iframe class="embed-responsive-item mt-2" src="${src}" allowfullscreen></iframe>
        </div>
    `;

    videoEmbed.querySelector("button").addEventListener("click", e=> videoEmbed.remove());

    document.body.append(videoEmbed);

};

// ENDING VIDEO EMBED

// STARTING SLIDER

document.querySelectorAll(".owl-carousel").forEach(slider => {

    const sliderSettings = {};
    const responsive = {};

    Object.keys(slider.dataset).forEach(key => {
        const getKey = key.replace("slider", "").replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          }).replace(/\s+/g, '');

        const getValue = ((value) => {
            if(value === "on") return true;
            if(value === "off") return false;
            if(!isNaN(value)) return parseInt(value);
            return value;
        })(slider.dataset[key]);
        const noCamelCase = key => key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        const breakpoint = noCamelCase(key).substr(noCamelCase(key).lastIndexOf("-")+1);
        if(isNaN(breakpoint)) {
            sliderSettings[getKey] = getValue;
            if(getKey === "slidesToShow" && getValue >= slider.children.length) sliderSettings[getKey] = slider.children.length;
            if(getKey === "slidesToShow" && !getKey.includes("slidesToScroll")) sliderSettings["slidesToScroll"] = getValue;
        } else {
            const settings = {};
            const already = responsive[parseFloat(breakpoint)];
            const getNormalKey = getKey.replace(`-${breakpoint}`, "");
            settings[getNormalKey] = getValue;
            if(!already) {
                responsive[parseFloat(breakpoint)] = settings;
            } else {
                already["settings"][getNormalKey] = getValue;
            };
        };
    });

    if(Object.keys(responsive).length >= 1) sliderSettings["responsive"] = responsive;

    window.addEventListener("load", e=> {
        $(slider).owlCarousel(sliderSettings);
        slider.querySelectorAll(".owl-dot").forEach((owlDot, index) => {
            owlDot.ariaLabel = `Slider ${index}`;
        });
    });

});

// ENDING SLIDER

// STARTING DOMAIN EXTENSION

const domainTLDParent = document.querySelector(".domain-tld");
const domainInput = document.querySelector("#domain-input")

if(domainTLDParent) domainTLDParent.querySelectorAll(".btn-tld").forEach(btn => btn.addEventListener("click", e=> {
    const tld = btn.dataset.tld;
    if(domainInput) {
        domainInput.value = "";
        domainInput.value = tld;
        domainInput.setSelectionRange(0, 0);
        domainInput.focus();
    };
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}));

// ENDING DOMAIN EXTENSION

// STARTING BLOG NAVBAR CHOOSE

const navigationLinks = document.querySelectorAll(".navigation .navigation-links li a");

if(navigationLinks) navigationLinks.forEach(link => {

    const targetIn = link.getAttribute("href");

    if(!targetIn) return false;

    link.addEventListener("click", e=> {
        e.preventDefault();
        navigationLinks.forEach(link => (link.getAttribute("href") === targetIn) ? link.closest("li").classList.add("border") : link.closest("li").classList.remove("border"))
        document.querySelectorAll(".navigation .navigation-documents > *").forEach(doc => (targetIn.includes(doc.id) ? doc.classList.remove("d-none") : doc.classList.add("d-none")));
    });

});

// ENDING BLOG NAVBAR CHOOSE

// STARTING FORM VALIDATION

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// ENDING FORM VALIDATION

// STARTING CONTACT PAGE

const form = document.querySelector("#contact-form");

if(location.pathname.includes("/contact-us.") && form) {

    Object.keys(searchParams).forEach(param => {
        const element = form.querySelector(`[name="${param}"]`);
        if(element && element.tagName.toLowerCase() === "select") [...element.children].forEach(children => {
            if(children.value === searchParams[param]) children.selected = true;
        });
    });
    
    if(searchParams.flag && searchParams.message) {

        const alert = document.createElement("div");
        alert.setAttribute("class", "alert alert-dismissible fade show");
        alert.setAttribute("role", "alert");

        alert.innerHTML = `
            ${searchParams.message}
            <button type="button" class="btn position-absolute top-0 bottom-0 end-0" data-bs-dismiss="alert" aria-label="Close"><i class="bi bi-x-lg"></i></button>
        `;

        switch(searchParams.flag) {
            case "primary":
                alert.classList.add("alert-primary");
                break;
            case "secondary":
                alert.classList.add("alert-secondary");
                break;
            case "success":
                alert.classList.add("alert-success");
                break;
            case "danger":
                alert.classList.add("alert-danger");
                break;
            case "warning":
                alert.classList.add("alert-warning");
                break;
            case "info":
                alert.classList.add("alert-info");
                break;
            case "light":
                alert.classList.add("alert-light");
                break;
            case "dark":
                alert.classList.add("alert-dark");
                break;
            default:
                alert.classList.add("alert-light");
                break;
        }

        alert.querySelector('[data-bs-dismiss="alert"]').addEventListener("click", e=> history.replaceState(null, null, window.location.pathname));

        form.parentNode.insertBefore(alert, form);

    };
    
}

// ENDING CONTACT PAGE

// STARTING COOKIE INFO

if(!document.cookie.includes("cookies=accepted") && !document.cookie.includes("cookies=rejected")) cookies({
    active: true,
    message: 'Мы используем Cookies. Продолжая использовать наш сайт, вы соглашаетесь с использованием Cookies. Это файлы в браузере, которые помогают нам сделать ваш опыт взаимодействия с сайтом удобнее.</p>',
});

function cookies(cookies) {

    if(!cookies.active) return false;

    const cookiesInfo = document.createElement("div");
    cookiesInfo.setAttribute("class", "cookies-info container-fluid");

    cookiesInfo.innerHTML = `
    <div class="cookies-info-container row w-100 border">

        <div class="col-md-10 d-flex align-items-center justify-content-center p-2">
            <i class="bi bi-exclamation-triangle-fill md d-flex align-items-center justify-content-center me-4"></i>
            <p class="m-0">${cookies.message}</p>
        </div>

        <div class="col-md-2 d-flex align-items-center justify-content-center">
            <div class="btn-group d-flex flex-wrap">
                <button id="cookie-accept" class="btn btn-primary m-1 rounded">Принять</button>
                <button id="cookie-reject" class="btn btn-outline-primary m-1 rounded">Отменить</button>
            </div>
        </div>

    </div>
    `;

    cookiesInfo.querySelector("#cookie-accept").addEventListener("click", e=> {document.cookie = "cookies=accepted"; cookiesInfo.remove();});
    cookiesInfo.querySelector("#cookie-reject").addEventListener("click", e=> {document.cookie = "cookies=rejected"; cookiesInfo.remove();});

    document.body.prepend(cookiesInfo);
    
    setTimeout(() => {
        cookiesInfo.classList.add("active");
    }, 1000);

};

// ENDING COOKIE INFO

// STARTING DARK MODE

const darkModeStatus = true;
const darkModeBtn = document.querySelector("#dark-mode");

if(darkModeBtn && darkModeStatus) darkModeBtn.addEventListener("click", e=> darkMode(document.cookie.includes("darkMode=enabled")));

function darkMode(isEnabled) {

    const logosDark = document.querySelectorAll(".logo-dark");
    const logosLight = document.querySelectorAll(".logo-light");
    const darkModeTxt = (darkModeBtn) ? darkModeBtn.querySelector("span") : false;

    if(isEnabled) {
        document.body.removeAttribute("data-cc-theme");
        document.cookie = "darkMode=disabled";
        if(darkModeTxt) darkModeTxt.innerHTML = 'Тёмная тема';
        if(logosDark.length >= 1 && logosLight.length >= 1) {
            logosLight.forEach(logo => logo.classList.add("d-none"));
            logosDark.forEach(logo => logo.classList.remove("d-none"));
        };
    } else {
        document.body.setAttribute("data-cc-theme", "dark");
        document.cookie = "darkMode=enabled";
        if(darkModeTxt) darkModeTxt.innerHTML = 'Светлая тема';
        if(logosDark.length >= 1 && logosLight.length >= 1) {
            logosLight.forEach(logo => logo.classList.remove("d-none"));
            logosDark.forEach(logo => logo.classList.add("d-none"));
        };
    };

};

if(darkModeStatus) darkMode(!document.cookie.includes("darkMode=enabled"));

// ENDING DARK MODE

// STARTING LOADING PAGE

const loadingPage = document.querySelector("#loading-page");

if(loadingPage) document.onreadystatechange = function () {
    loadingPage.remove();
};

// ENDING LOADING PAGE