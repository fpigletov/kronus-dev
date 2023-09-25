'use strict';

window.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  const solutions = document.querySelector('.solutions');
  const header = document.querySelector('.header');
  const headerItemsSubmenu = document.querySelectorAll('.header__item_submenu');
  const headerMenu = document.querySelector('.header__menu');
  const burger = document.querySelector('.actions-header__burger');
  const wrapper = document.querySelector('.wrapper');
  const scrollWidth = window.innerWidth - wrapper.offsetWidth + 'px';
  const menuActions = document.querySelector('.header__menu-actions');
  const headerActions = document.querySelector('.header__actions');
  const headerPhone = document.querySelector('.actions-header__phone');
  const headerCallback = document.querySelector('.actions-header__callback');
  const modal = document.querySelector('.modal');
  const modalCloseBtn = modal.querySelector('.modal__close');


  //Preloader and Header on scroll
  function headerOnScroll() {
    if (window.scrollY > 0) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  }

  window.addEventListener('scroll', () => {
    headerOnScroll();
  });

  //Header Dinamic Adaptiv
  function dinamicAdaptiv() {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
    if (viewportWidth <= 756) {
      menuActions.prepend(headerPhone, headerCallback);
    } else {
      headerActions.prepend(headerPhone, headerCallback);
    }
  }

  window.addEventListener('resize', () => {
    dinamicAdaptiv();
  });


  window.addEventListener('load', () => {
    headerOnScroll();
    dinamicAdaptiv();
  });

  //Modal 
  const openModal = () => {
    modal.classList.add('active');
    document.body.style.paddingRight = scrollWidth;
    header.style.paddingRight = scrollWidth;
    document.body.classList.add('hidden');
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    header.style.paddingRight = '';

  };

  modalCloseBtn.addEventListener('click', () => {
    if (modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Header Hover Link   
  function actionsOnClick() {
    headerItemsSubmenu.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        headerItemsSubmenu.forEach(item => {
          if (item !== e.currentTarget) {
            item.classList.remove('active');
          }
        });
        e.currentTarget.classList.toggle('active');
      });
    });
  }

  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {

    // actionsOnClick();

  } else {

    headerItemsSubmenu.forEach(item => {
      item.addEventListener('mouseover', (e) => {
        e.preventDefault();
        item.classList.add('active');
      });

      item.addEventListener('mouseout', (e) => {
        e.preventDefault();
        item.classList.remove('active');
      });
    });

    actionsOnClick();
  }

  //Header Menu Actions
  function headerMenuActions() {
    if (headerMenu.classList.contains('active')) {
      document.body.style.paddingRight = scrollWidth;
      header.style.paddingRight = scrollWidth;
      document.body.classList.add('hidden');

    } else {
      document.body.classList.remove('hidden');
      document.body.style.paddingRight = '';
      header.style.paddingRight = '';
    }
  }

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    headerMenu.classList.toggle('active');

    // headerMenuActions();

    let ariaLabel = burger.getAttribute('aria-label');
    if (ariaLabel === 'Open menu') {
      burger.setAttribute('aria-label', 'Close menu');
    } else {
      burger.setAttribute('aria-label', 'Open menu');
    }

  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {

      if (headerMenu.classList.contains('active')) {
        headerMenu.classList.remove('active');
        headerMenuActions();
      }

      if (burger.classList.contains('active')) {
        burger.classList.remove('active');
      }

      if (e.code === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    }
  });

  function removeClasses() {
    if (headerMenu.classList.contains('active')) {
      headerMenu.classList.remove('active');
    }

    if (burger.classList.contains('active')) {
      burger.classList.remove('active');
    }
  }

  document.addEventListener('click', (e) => {
    const target = e.target;

    if (!target.closest('.header__menu') && !target.closest('.actions-header__burger') &&
      burger.classList.contains('active')) {
      removeClasses();
      headerMenuActions();
    }

    if (target.classList.contains('header__link') || target.classList.contains('submenu-header__sublink')) {
      e.preventDefault();
      removeClasses();
      headerMenuActions();
    }

    if (target.classList.contains('btn-callback')) {
      openModal();
    }

  });


  //Home section
  document.addEventListener('mousemove', e => {
    Object.assign(document.documentElement, {
      style: `
                --move-x: ${(e.clientX - window.innerWidth / 2) * -0.0075}deg;
                --move-y: ${(e.clientY - window.innerHeight / 2) * -0.015}deg;
            `
    });
  });

  //Home Animation

  let homeAnimation = gsap.timeline();

  homeAnimation.from('.wrapper', { opacity: 0, duration: 1 })
    .from('.header', { opacity: 0, y: '-100%', duration: 0.7 })
    .from('.home__title .letter', { stagger: 0.1, opacity: 0, duration: 0.5 })
    .from('.home__layer_element', { opacity: 0, duration: 0.7 })
    .from('.home__layer_text', { opacity: 0, y: '50%', duration: 0.7 })

  //Benefits
  function startCount(n, speed, element) {
    const counterElement = document.querySelector(element);
    let currentValue = 0;

    function updateCounter() {
      if (currentValue === n) {
        return;
      }
      currentValue += Math.floor(Math.random() * 10) + 1;

      if (currentValue > n) {
        currentValue = n;
      }

      counterElement.textContent = currentValue;


      let delay = Math.floor(Math.random() * speed) + 50;
      setTimeout(updateCounter, delay);
    }

    updateCounter();

  }

  let benefitsAnimation1 = gsap.timeline({
    scrollTrigger: {
      trigger: '.main__benefits',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  })

  benefitsAnimation1.from('.benefits__title .letter', {
    stagger: 0.1,
    duration: 0.5,
    opacity: 0,
  });

  function benefitsAnimation2() {
    startCount(30, 2500, '.item-benefits__counter_1 span');
    startCount(95, 900, '.item-benefits__counter_2 span');
    startCount(100, 950, '.item-benefits__counter_3 span');
    startCount(1000, 0.05, '.item-benefits__counter_4 span');
    startCount(100, 800, '.item-benefits__counter_5 span');
    startCount(700, 20, '.item-benefits__counter_6 span');
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: '.main__benefits',
      start: 'top 50%',
      end: 'bottom bottom',
      onEnter: benefitsAnimation2,
      once: true
    }

  });


  //Solutions
  let solutionsAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: '.main__solutions',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  })

  solutionsAnimation.from('.actions-solutions__title .letter', {
    stagger: 0.1,
    duration: 0.5,
    opacity: 0,
  })
    .from('.actions-solutions__pagination', { opacity: 0, y: '50%', duration: 0.7 })
    .from('.solutions__slider', { opacity: 0, duration: 0.7 })

  //Contact-Us

  let contactAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: '.main__contact-us',
      start: 'top 50%',
      end: 'bottom bottom'
    }
  })

  contactAnimation.from('.contact-us__title .letter', {
    stagger: 0.1,
    duration: 0.5,
    opacity: 0,
  })
    .from('.contact-us__descr', { opacity: 0, y: '50%', duration: 0.7 })
    .from('.contact-us__form', { opacity: 0, duration: 0.7 })

  //Expertise
  let expertiseAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: '.main__expertise',
      start: 'top 50%',
      end: 'bottom bottom'
    }
  })

  expertiseAnimation.from('.expertise__title .letter', {
    stagger: 0.1,
    duration: 0.5,
    opacity: 0,
  })
    .from('.expertise__item', { stagger: 0.2, opacity: 0, y: '50%', duration: 0.7 })
    .from('.expertise__btn', { opacity: 0, y: '50%', duration: 0.7 })

  //Callback Animation
  const callBackBtn = document.querySelector('.callback__btn');

  let callbackAnimationLeft = gsap.to('.callback__marquee_left .callback__text', {
    xPercent: -100,
    repeat: -1,
    duration: 5,
    ease: 'linear'
  }).totalProgress(0.5)

  let callbackAnimationRight = gsap.from('.callback__marquee_right .callback__text', {
    xPercent: -100,
    repeat: -1,
    duration: 5,
    ease: 'linear'
  }).totalProgress(0.7)

  //Mouse Animation

  const mouse = document.querySelector('.mouse');
  const mouseBefore = document.querySelector('.mouse::before');
  const mouseView = mouse.querySelector('.mouse__view');

  function moveMouse(e) {
    if (e.clientX < 5 || e.clientY < 5 || e.clientY > (window.innerHeight - 5) || e.clientX > (window.innerWidth - 5)) {
      mouse.style.opacity = 0;
    } else {
      mouse.style.opacity = 1;
      mouse.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
    }
  };

  if (window.innerWidth >= 768) {
    document.addEventListener('mousemove', moveMouse);
    const links = document.querySelectorAll('a, button');

    callBackBtn.addEventListener('mouseover', () => {
      gsap.to(callbackAnimationLeft, { timeScale: 3, duration: 1 });
      gsap.to(callbackAnimationRight, { timeScale: 3, duration: 1 });
      mouseView.classList.add('view-visible');
    });

    callBackBtn.addEventListener('mouseleave', () => {
      gsap.to(callbackAnimationLeft, { timeScale: 1, duration: 1 });
      gsap.to(callbackAnimationRight, { timeScale: 1, duration: 1 });
      mouseView.classList.remove('view-visible');
    });

    links.forEach(link => link.addEventListener('mouseover', () => { mouse.classList.add('links-visible') }));
    links.forEach(link => link.addEventListener('mouseleave', () => { mouse.classList.remove('links-visible') }));


  }

  //Solutions Slider
  if (solutions) {

    let splide = new Splide('.splide', {
      rewind: true,
      type: 'fade',
      perPage: 1,
      speed: 2000,
      width: '100%',
      autoplay: true,
      arrows: false,
      drag: false,
      interval: 15000,
      pauseOnHover: true,
      pagination: 'mounted',
      paginationDirection: 'ttb',
      breakpoints: {
        480: {
          pagination: false,
          arrows: true,
          classes: {
            arrows: 'slider-solutions__arrows',
            arrow: 'slider-solutions__arrow',
            prev: 'slider-solutions__arrow_prev',
            next: 'slider-solutions__arrow_next',
          },
        }
      },


    });

    //Progress Bar
    const progressBar = document.querySelector('.progress-actions__bar');
    splide.on('mounted move', function () {
      let end = splide.Components.Controller.getEnd() + 1;
      let rate = Math.min((splide.index + 1) / end, 1);
      progressBar.style.height = String(100 * rate) + '%';

    });


    //Pagination

    splide.on('pagination:mounted', function (data) {
      // You can add your class to the UL element
      data.list.classList.add('splide__pagination--custom');
      // `items` contains all dot items
      data.items.forEach(function (item) {

        item.button.classList.add('actions-solutions__btn');

        if (item.page === 0) {
          item.button.innerHTML = '<span class="btn-solutions__name">Retail</span><span class="btn-solutions__descr">warehouse that helps to sell</span>';
        } else if (item.page === 1) {
          item.button.innerHTML = '<span class="btn-solutions__name">E-commerce</span><span class="btn-solutions__descr">speed and quality of order processing</span>';
        } else if (item.page === 2) {
          item.button.innerHTML = '<span class="btn-solutions__name">Production</span><span class="btn-solutions__descr">from planning to product shipment</span>';
        } else if (item.page === 3) {
          item.button.innerHTML = '<span class="btn-solutions__name">3PL Logistic</span><span class="btn-solutions__descr">versatility and customization</span>';
        } else if (item.page === 4) {
          item.button.innerHTML = '<span class="btn-solutions__name">Distribution</span><span class="btn-solutions__descr">optimization as a competitive advantage</span>';
        }

      });
    });
    splide.mount();
  }

  const customPagination = document.querySelector('.actions-solutions__pagination');
  const splidePagination = document.querySelector('.splide__pagination');

  customPagination.append(splidePagination);

  //Automation Animation
  let automationAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: '.main__automation',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  })

  automationAnimation.from('.automation__title .letter', { stagger: 0.1, duration: 0.5, opacity: 0 })
    .from('.automation__item', { stagger: 0.2, duration: 1, opacity: 0, y: '50%' })
    .from('.automation__animation', { duration: 1, opacity: 0 })


  let tl1 = gsap.timeline({
    delay: 5,
    scrollTrigger: {
      trigger: '.main__automation',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  });

  let tl2 = gsap.timeline({
    repeat: -1,
    delay: 13,
    repeatDelay: 1,
    scrollTrigger: {
      trigger: '.main__automation',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  });

  let tl3 = gsap.timeline({
    repeat: -1,
    delay: 19,
    repeatDelay: 1,
    scrollTrigger: {
      trigger: '.main__automation',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  });

  let tl4 = gsap.timeline({
    delay: 8,
    scrollTrigger: {
      trigger: '.main__automation',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  });

  let tl5 = gsap.timeline({
    repeat: -1,
    scrollTrigger: {
      trigger: '.main__automation',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  });

  let tl6 = gsap.timeline({
    repeat: -1,
    scrollTrigger: {
      trigger: '.main__automation',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  });

  let tl7 = gsap.timeline({
    repeat: -1,
    delay: 2,
    repeatDelay: 1,
    scrollTrigger: {
      trigger: '.main__automation',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  });

  let tl8 = gsap.timeline({
    repeat: -1,
    delay: 2,
    repeatDelay: 1,
    scrollTrigger: {
      trigger: '.main__automation',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  });

  let tl9 = gsap.timeline({
    repeat: -1,
    delay: 2,
    repeatDelay: 1,
    scrollTrigger: {
      trigger: '.main__automation',
      start: 'top 50%',
      end: 'bottom bottom',
    }
  });

  tl1.to('#open-gate-5', { y: '-18px', ease: "sine.out", duration: 3 })
    .to('#open-gate-5', { opacity: 0 }, '-=1')
    .to('#open-gate-4', { y: '-18px', ease: "sine.out", duration: 3 }, '-=1.25')
    .to('#open-gate-4', { opacity: 0 }, '-=1')
    .to('#open-gate-3', { y: '-18px', ease: "sine.out", duration: 3 }, '-=1.25')
    .to('#open-gate-3', { opacity: 0 }, '-=1')
    .to('#open-gate-2', { y: '-15px', ease: "sine.out", duration: 3 }, '-=1.25')
    .to('#open-gate-2', { opacity: 0 }, '-=1')
    .to('#lane-lamp', { fill: '#24d824' }, '-=1');

  tl2.to('#box-3', { opacity: 1 })
    .from('#box-3', { x: '57px', y: '-32px', ease: "none", duration: 6 }, '-=0.5')
    .to('#box-1', { opacity: 1 }, '-=2.3')
    .fromTo('#box-1', { x: '35px', y: '-19px', ease: "none", duration: 6 }, { x: '-26px', y: '14px', ease: "none", duration: 5 }, '-=2.3')
    .to('#box-3', { opacity: 0 }, '-=2.7')
    .to('#box-2', { opacity: 1 }, '-=2.7')
    .fromTo('#box-2', { x: '10px', y: '-6px', ease: "none", duration: 6 }, { x: '-46px', y: '24px', ease: "none", duration: 5 }, '-=2.7')
    .to('#box-1', { opacity: 0 }, '-=2.3')
    .to('#box-2', { opacity: 0 });

  tl3.to('#box-4', { opacity: 1 })
    .to('#box-5', { opacity: 1 }, '+=2.3')
    .to('#box-6', { opacity: 1 }, '+=1.8')
    .to('#box-7', { opacity: 1 }, '+=7')
    .to('#box-8', { opacity: 1 }, '+=2.3')
    .to('#box-9', { opacity: 1 }, '+=1.8')
    .to('#box-10', { opacity: 1 }, '+=7')
    .to('#box-11', { opacity: 1 }, '+=2.3')
    .to('#box-12', { opacity: 1 }, '+=1.8')
    .to('#box-13', { opacity: 1 }, '+=7')
    .to('#box-14', { opacity: 1 }, '+=2.3')
    .to('#box-15', { opacity: 1 }, '+=1.8')
    .to('#box-16', { opacity: 1 }, '+=7')
    .to('#box-17', { opacity: 1 }, '+=2.3')
    .to('#box-18', { opacity: 1 }, '+=1.8')
    .to('#box-19', { opacity: 1 }, '+=7')
    .to('#box-20', { opacity: 1 }, '+=2.3')
    .to('#box-21', { opacity: 1 }, '+=1.8')
    .to('#box-22', { opacity: 1 }, '+=7')
    .to('#box-23', { opacity: 1 }, '+=2.3')
    .to('#box-24', { opacity: 1 }, '+=1.8')
    .to('#box-25', { opacity: 1 }, '+=7')
    .to('#box-26', { opacity: 1 }, '+=2.3')
    .to('#box-27', { opacity: 1 }, '+=1.8')
    .to('#box-28', { opacity: 1 }, '+=7')
    .to('#box-29', { opacity: 1 }, '+=2.3')
    .to('#box-30', { opacity: 1 }, '+=1.8')
    .to('#box-31', { opacity: 1 }, '+=7')
    .to('#box-32', { opacity: 1 }, '+=2.3')
    .to('#box-33', { opacity: 1 }, '+=1.8')
    .to('#box-34', { opacity: 1 }, '+=7')
    .to('#box-35', { opacity: 1 }, '+=2.3')
    .to('#box-36', { opacity: 1 }, '+=1.8')
    .to('#box-37', { opacity: 1 }, '+=7')
    .to('#box-38', { opacity: 1 }, '+=2.3')
    .to('#box-39', { opacity: 1 }, '+=1.8')
    .to('#box-40', { opacity: 1 }, '+=7')
    .to('#box-41', { opacity: 1 }, '+=2.3')
    .to('#box-42', { opacity: 1 }, '+=1.8')
    .to('#box-43', { opacity: 1 }, '+=7')
    .to('#box-44', { opacity: 1 }, '+=2.3');

  tl4.to('#worker-1', { opacity: 1 })
    .to('#worker-shadow-1', { opacity: 1 }, '-=0.5');

  tl5.fromTo('#worker-1', { x: '10px', y: '15px', ease: "sine.out", duration: 4 }, { x: '-7px', y: '8px', ease: "sine.out", duration: 4 })
    .to('#worker-1', { x: '10px', y: '15px', ease: "sine.out", duration: 4 });

  tl6.fromTo('#worker-shadow-1', { x: '10px', y: '15px', ease: "sine.out", duration: 4 }, { x: '-7px', y: '8px', ease: "sine.out", duration: 4 })
    .to('#worker-shadow-1', { x: '10px', y: '15px', ease: "sine.out", duration: 4 })

  tl7.fromTo('#loader', { x: '-60px', y: '-70px', ease: "sine.out", duration: 6 }, { x: '45px', y: '0', ease: "sine.out", duration: 6 })
    .fromTo('#loader-box-1', { x: '-60px', y: '-70px', ease: "sine.out", duration: 6 }, { x: '45px', y: '0', ease: "sine.out", duration: 6 }, '-=6')
    .fromTo('#loader-box-2', { x: '-60px', y: '-70px', ease: "sine.out", duration: 6 }, { x: '45px', y: '0', ease: "sine.out", duration: 6 }, '-=6')
    .fromTo('#hand-loader', { x: '30px', y: '-15px', ease: "sine.out", duration: 6 }, { x: '-137px', y: '52px', ease: "sine.out", duration: 6 })
    .fromTo('#hand-loader-box', { x: '30px', y: '-15px', ease: "sine.out", duration: 6 }, { x: '-137px', y: '52px', ease: "sine.out", duration: 6 }, '-=6')
    .to('#loader-box-1', { opacity: 0 })
    .to('#loader-box-2', { opacity: 0 }, '+=1')
    .to('#hand-loader-box', { opacity: 0 })
    .to('#hand-loader', { x: '30px', y: '-15px', ease: "sine.out", duration: 5 })
    .to('#loader', { x: '-60px', y: '-70px', ease: "sine.out", duration: 5 }, '-=2')

  tl8.fromTo('#pallet-1', { x: '110px', y: '65px' }, { x: '110px', y: '65px' })
    .fromTo('#pallet-box-1', { x: '110px', y: '65px' }, { x: '110px', y: '65px' })
    .fromTo('#pallet-box-2', { x: '110px', y: '65px' }, { x: '110px', y: '65px' })

  tl9.to('#worker-hand-1', { x: '0.3px', y: '-0.5px', ease: "sine.out", duration: 0.5 })
    .to('#worker-head-1', { rotation: '5deg', ease: "sine.out", duration: 0.5 })
    .to('#worker-hand-2', { rotation: '5deg', ease: "sine.out", duration: 0.5 })
    .to('#worker-hand-3', { rotation: '15deg', ease: "sine.out", duration: 0.5 })
    .to('#worker-head-3', { rotation: '5deg', ease: "sine.out", duration: 0.5 })
    .to('#worker-head-2', { rotation: '-5deg', ease: "sine.out", duration: 0.5 })


  //Footer Animation
  let footerAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: '.main__callback',
      start: 'bottom 50%'
    }
  })

  footerAnimation.from('.top-footer__logo', { duration: 0.7, opacity: 0 })
    .from('.footer__center', { duration: 0.7, opacity: 0 })
    .from('.center-footer__column', { stagger: 0.2, duration: 0.7, opacity: 0, y: '50%' })
    .from('.footer__bottom', { duration: 0.7, opacity: 0 })












});