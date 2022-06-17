$(() => {
  // PCのみマウスカーソル変更
  let userAgent = navigator.userAgent;
  if (userAgent.indexOf("iPhone") >= 0 || userAgent.indexOf("iPad") >= 0 || userAgent.indexOf("Android") >= 0) {
    $('#cursor').css('display', 'none');
    $('#stalker').css('display', 'none');
  } else {
    // マウスカーソル
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', function (e) {
      cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    });
    const linkElem = document.querySelectorAll('a, .cursor');
    for (let i = 0; i < linkElem.length; i++) {
      linkElem[i].addEventListener('mouseover', function () {
        cursor.classList.add('hov_');
      });
      linkElem[i].addEventListener('mouseout', function () {
        cursor.classList.remove('hov_');
      });
    }
    // マウスストーカー
    const stalker = document.getElementById('stalker');
    let hovFlag = false;
    document.addEventListener('mousemove', function (e) {
      if (!hovFlag) {
        stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
      }
    });
    const linkFovElem = document.querySelectorAll('a, .cursor');
    for (let i = 0; i < linkFovElem.length; i++) {
      linkFovElem[i].addEventListener('mouseover', function (e) {
        hovFlag = true;
        stalker.classList.add('hov_');
        stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
      });
      linkFovElem[i].addEventListener('mouseout', function () {
        hovFlag = false;
        stalker.classList.remove('hov_');
      });
    }
  }
  // ローディング画面
  let splash_text = $.cookie('accessdate');
  let myD = new Date();
  let myYear = String(myD.getFullYear());
  let myMonth = String(myD.getMonth() + 1);
  let myDate = String(myD.getDate());
  if (splash_text != myYear + myMonth + myDate) {
    $('#loading').css('display', 'block');
    setTimeout(function () {
      $('.spinner').fadeIn(1000, function () {
        setTimeout(function () {
          $('.spinner').fadeOut(1000);
        }, 30000);
        setTimeout(function () {
          $('#loading').fadeOut(1000, function () {
            let myD = new Date();
            let myYear = String(myD.getFullYear());
            let myMonth = String(myD.getMonth() + 1);
            let myDate = String(myD.getDate());
            $.cookie('accessdate', myYear + myMonth + myDate);
          });
        }, 1000);
      });
    }, 1000);
  } else {
    $('#loading').css('display', 'none');
  }
  $(function () {
    // ハンバーガーメニュー
    $('.nav-toggle').on('click', function () {
      $('body').toggleClass('open');
    });
    $('.sm-nav').on('click', function () {
      $('body').removeClass('open');
    });
    // トップに戻るリンク
    let pagetop = $('.page-top');
    pagetop.hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        pagetop.fadeIn();
      } else {
        pagetop.fadeOut();
      }
    });
    // ページ内リンク時スクロール
    $('a[href^="#"]').click(function () {
      let time = 500;
      let href = $(this).attr("href");
      let target = $(href == "#" ? 'html' : href);
      let distance = target.offset().top;
      $("html, body").animate({ scrollTop: distance }, time, "swing");
      return false;
    });
    // フェードイン
    function fadeAnime() {
      $('.scroll-fade').each(function () {
        let elemPos = $(this).offset().top - 100;
        let scroll = $(window).scrollTop();
        let windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
          $(this).addClass('fadeIn').removeClass('fadeOut');
        } else {
          $(this).addClass('fadeOut').removeClass('fadeIn');
        }
      });
    }
    $(window).scroll(function () {
      fadeAnime();
    });
  });
});

// バリデーション
document.addEventListener("DOMContentLoaded", () => {
  const validationForm = document.querySelector("#contact__form");
  if (validationForm) {
    const errorClassName = "contact__error";
    const requiredElems = document.querySelectorAll(".required");
    const mailElems = document.querySelectorAll(".mail");
    const createError = (elem, errorMessage) => {
      const errorSpan = document.createElement("span");
      errorSpan.classList.add(errorClassName);
      errorSpan.setAttribute("aria-live", "polite");
      errorSpan.textContent = errorMessage;
      elem.parentNode.appendChild(errorSpan);
    };
    validationForm.addEventListener("submit", (e) => {
      const errorElems = validationForm.querySelectorAll("." + errorClassName);
      errorElems.forEach((elem) => {
        elem.remove();
      });
      requiredElems.forEach((elem) => {
        const elemValue = elem.value.trim();
        if (elemValue.length === 0) {
          createError(elem, "未入力です。");
          e.preventDefault();
        }
      });
      mailElems.forEach((elem) => {
        const pattern = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
        if (elem.value !== "") {
          if (!pattern.test(elem.value)) {
            createError(elem, "メールアドレスの形式ではありません。");
            e.preventDefault();
          }
        }
      });
      const errorElem = validationForm.querySelector("." + errorClassName);
      if (errorElem) {
        const errorElemOffsetTop = errorElem.offsetTop;
        window.scrollTo({
          top: errorElemOffsetTop - 220,
          behavior: "smooth",
        });
      }
    });
  }
});