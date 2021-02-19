
document.onreadystatechange = function() { 
    if (document.readyState !== "complete") { 
        TweenMax.to('.loader', {
            duration: 2,
            opacity: 0,
            ease: "circ.out",
            onStart: ()=> {
                introTransition(); 
            },
            onComplete: ()=> {
                document.querySelector('.loader').style.display = 'none';
            }
        });
    }
}; 

//---------- NAV ---------- //
const nav = document.querySelector('.nav');
const fixedNav = document.querySelector('.fixed-nav');

function fixNav() {
    if(window.scrollY >= 100) {
        nav.classList.add('fixed-nav');
    }
    else {
        nav.classList.remove('fixed-nav');
    }    
};
window.addEventListener('scroll', fixNav);


// ----------- MENU ----------- //
class Menu {
    constructor(el){
        this.el = el;
        this.el.openMenu = this.el.querySelector('.action--open');
        this.el.closeMenu = this.el.querySelector('.action--close');
        this.el.openMenu.addEventListener('click', ()=> this.open());
        this.el.closeMenu.addEventListener('click', ()=> this.close());

        this.el.mainMenu = this.el.querySelector('.menu__item-main')
        this.el.innerMenu = this.el.querySelector('.menu__item-inner');
        this.el.innerLinks = this.el.querySelectorAll('.menu-links > a.nav__section-anchor');
        this.el.innerFooter = this.el.querySelectorAll('.menu-social, .menu-email')
        this.el.innerLinks.forEach(elem => {
            elem.addEventListener('click', ()=> this.animate());
        });
    }
    open() {
        this.toggle('open');
    }
    close() {
        this.toggle('close');
    }
    toggle(action) {
        this.el.classList[action === 'open' ? 'add' : 'remove']('menu--open');
        const mainM = this.el.mainMenu;
        const innerM = this.el.innerMenu;
        if (action === 'open'){
            TweenMax.to([mainM, innerM], 1, {
                ease: Quint.easeOut,
                y: '0%',
            });
        }
        else {
            TweenMax.to(mainM, .8, {
                delay: .8,
                ease: Quart.easeOut,
                y: '-101%' || 0,
            });
            TweenMax.to(innerM, .5, {
                delay: .8,
                ease: Quart.easeOut,
                y: '-10%' || 0,
            });
        }

        TweenMax.to(this.el.openMenu, action === 'open' ? 0.5 : 0.5, {
            delay: action === 'open' ? 0 : 0.9,
            ease: action === 'open' ? Quint.easeOut : Quad.easeOut,
            opacity: action === 'open' ? 0 : 1
        });
        TweenMax.to(this.el.closeMenu, .5, {
            ease: action === 'open' ? Quint.easeOut : Quart.easeInOut,
            startAt: action === 'open' ? {rotation: 0} : null,
            opacity: action === 'open' ? 1 : 0,
            rotation: action === 'open' ? 180 : 360
        });
        TweenMax.staggerTo(this.el.innerLinks, action === 'open' ? .2 : .2, {
            ease: action === 'open' ? Quint.easeOut : Quart.easeInOut,
            startAt: action === 'open' ? {y:'0%', opacity: 0} : null,
            opacity: action === 'open' ? .6 : 0
        }, 
            action === 'open' ? 0.2 : -0.2);
        TweenMax.to(this.el.innerFooter, action === 'open' ? 1 : 0.5, {
            delay: action === 'open' ? 1 : 0,
            ease: action === 'open' ? Quint.easeOut : Quad.easeOut,
            opacity: action === 'open' ? 1 : 0
        });
    }   
    animate() {
        this.close();
        pageTransition(1.5);
    }   
}   
const menu = new Menu(document.querySelector('div.menu'));

function introTransition() {
    let tl = gsap.timeline({onStart: ()=> {
        heroTransition();
        }
    });
    tl.from('.transition', {
        opacity: 0,
        duration: 2,
        height: '100%',
        ease: "Quart.easeOut",
    });
    tl.set('.transition', {
        height: '0',
    });
    TweenMax.from('.ai-footer--copy, .ai-footer--social', 1.5, {
        delay: 1,
        opacity: 0,
        ease: ease,
        stagger: .2,
    });
}

const main = document.querySelector('.loading');

function pageTransition(delay) {
    let tl = gsap.timeline();
    tl.to('.transition', {
        duration: 1,
        height: '100%',
        y: '0%',
        delay: delay,
        onStart: ()=> {
            main.style.opacity = 0;
        }
    });
    tl.to('.transition', {
        duration: 1,
        height: '100%',
        y: '100%',
        delay: 0.5,
        onStart: ()=> {
            main.style.opacity = 1;
        }
    });
    tl.set('.transition', {
        height: '0',
        y: '0',
    });
}

// ----------- Check and change section ----------- //
let isMobile = window.matchMedia('(max-width: 800px)');

const hero = document.querySelector('.hero');
const work = document.querySelector('.work');
const about = document.querySelector('.about');
const contact = document.querySelector('.contact');

const menuLinks = document.querySelectorAll('.nav__section-anchor');
const footerLinks = document.querySelectorAll('.pgt-footer');
const letsTalk = document.querySelectorAll('.lets-talk');

function changeSection(e) {
    e.preventDefault();
    let target = e.target.id;

    setTimeout(() => {
        TweenMax.from('.ai-logo, .ai-menu', 1.5, {
            delay: 1,
            opacity: 0,
            ease: ease,
            stagger: .2,
        });
        TweenMax.from('.ai-footer--copy, .ai-footer--social', 1.5, {
            delay: 1.5,
            opacity: 0,
            ease: ease,
            stagger: .2,
        });
        
        if (hero.classList.contains(`${target}`)) {
            heroTransition();
        }
        else if (work.classList.contains(`${target}`)) {
            workTransition();
        }
        else if (about.classList.contains(`${target}`)) {
            aboutTransition();
        }
        else if (contact.classList.contains(`${target}`)) {
            contactTransition();
        }      
    }, 2500); 
}
function changeSecTalk(e) {
    e.preventDefault();
    
    pageTransition(0);
    setTimeout(() => {
        contactTransition();
    }, 1500);
}

const rot = 10;
const ease = 'Quart.easeOut';  
function heroTransition() {
    hero.classList.remove('hide');
    contact.classList.add('hide');
    work.classList.add('hide');
    about.classList.add('hide');

    TweenMax.from('.ai_index-img', 2.5, {
        delay: .6,
        opacity: 0,
        height: 0,
        scale: 1.3,
        ease: ease,
        stagger: .5,
    });
    TweenMax.from('.ai_index-title', 1.5, {
        delay: .6,
        opacity: 0,
        y: -1000,
        scale: 3,
        ease: ease,
        stagger: .05,
    }, 0.014, 0.5);
    TweenMax.from('.ai_index-cit', 1, {
        delay: 1,
        opacity: 0,
        y: 100,
        rotate: rot,
        ease: ease,
        stagger: .1,
    });   
    TweenMax.from('.ai_index-circle', 2.5, {
        delay: 1,
        opacity: 0,
        scale: 0,
        ease: ease,
    });    
    document.querySelector('.footer').style.position = 'absolute'
}
function workTransition() {
    work.classList.remove('hide');
    hero.classList.add('hide');
    about.classList.add('hide');
    contact.classList.add('hide');
    window.scrollTo(0, 0);

    TweenMax.from('.ai_works-circle', 2, {
        delay: 1,
        opacity: 0,
        scale: 0,
        ease: ease,
    }); 
    TweenMax.from('.ai_works-title', 1.5, {
        delay: .8,
        opacity: 0,
        y: -1000,
        ease: 'Quart.easeOut',
        stagger: .05,
    });
    TweenMax.from('.ai_works-image', 1.5, {
        delay: 1,
        opacity: 0,
        y: 500,
        ease: 'Quart.easeOut',
        stagger: .05,
    });
    // scroll animation
    function animateFrom(element) {
        let y = 500;
        let duration = 2

        if (isMobile.matches) {
            return
        }
        else {
            if (element.classList.contains('as_work-info')) {
                duration = 5;
                y = 0;
            }
            else if (element.classList.contains('as_work-span')) {
                duration = 1;
                y = 0;
            }
            gsap.fromTo(element, { y: y, opacity: 0}, {
                duration: duration, 
                y: 0, 
                opacity: 1,
                ease: 'Quart.easeOut',
                overwrite: "auto",
            });
        }      
    };  
    function hide(element) {
        gsap.set(element, {
            duration: 2,
            opacity: 0
        });
    };
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray(".as_work").forEach(function(element) {      
        // hide(element);
  
        ScrollTrigger.create({
            trigger: element,
            onEnter: function() { animateFrom(element)}, 
            onLeave: function() { return },
            start: 'top bottom-=50',
            end: 'top center',
        });
    });
    document.querySelector('.footer').style.position = 'relative';
}
function aboutTransition() {
    about.classList.remove('hide');
    hero.classList.add('hide');
    work.classList.add('hide');
    contact.classList.add('hide');
    window.scrollTo(0, 0);

    TweenMax.from('.ai_about-title', 1.5, {
        delay: .8,
        opacity: 0,
        y: 200,
        rotate: rot,
        ease: ease,
    });
    TweenMax.from('.about_line', 2, {
        delay: 1.2,
        opacity: 0,
        width: 0,
        ease: ease,
        stagger: .1
    }); 
    TweenMax.from('.ai_about-desc', 2, {
        delay: 1,
        opacity: 0,
        y: 100,
        rotate: rot,
        ease: ease,
        stagger: 0.1
    }); 
    
    TweenMax.from('.ai_about-talk', 1.5, {
        delay: 1.2,
        opacity: 0,
        ease: ease,
        stagger: .1
    }); 
    document.querySelector('.footer').style.position = 'relative' 
}
function contactTransition() {
    contact.classList.remove('hide');
    work.classList.add('hide');
    hero.classList.add('hide');
    about.classList.add('hide');
    window.scrollTo(0, 0);

    if (isMobile.matches) {
        document.querySelector('.footer').style.position = 'relative';
    } else {
        document.querySelector('.footer').style.position = 'absolute';
    }

    TweenMax.from('.ai_contact-image', 1.5, {
        delay: .82,
        y: -500,
        opacity: 0,
        ease: ease,
    });
    TweenMax.from('.ai_contact-text', 1.5, {
        delay: 1,
        opacity: 0,
        y: 100,
        rotate: rot,
        ease: ease,
        stagger: .1,
    });
    TweenMax.from('.ai_contact-circle', 3, {
        delay: 1,
        opacity: 0,
        scale: 0,
        ease: ease,
    });  
}   

menuLinks.forEach(element => {
    element.addEventListener('click', changeSection);
});
letsTalk.forEach(element => {
    element.addEventListener('click', changeSecTalk);
});

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

imagesLoaded(document.querySelectorAll(['sel__image']), {background: true}, () => {
    console.log('image loaded');
});
