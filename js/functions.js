let slideIndex = 0;
let isAudioOn = true;

let isStoryTyping = false;
let storyTypingIndex = 0;
let storyLiIndex = 0;
let storyLiLength = $(".introduction-typing-content > ul > li").length;
let storyTypingContent;
let storyTypingInterval;

const sakura = new Sakura("body");

$(document).ready(function(){
	
    $("#wedding-main-img").fadeOut(3000, function () {
        $(this).attr("src", "assets/img/main2.jpg");
        $(this).fadeIn(3000);
    });

    $("audio").prop("volume", "0.3");
    playAudio();

    $(".btn_kakao").on("click", function() {
        shareKakaoMessage();
    });

    $(".btn_link").on("click", function() {
        copyText("link", document.location.href);
    });

    $(".copy_account").on("click", function() {
        copyText("account", $(this).attr("data-account"));
    });

    $(".current").on("click", function() {
        alert("대훈 ❤️ 윤정 예식일입니다.");
    });
    
    let splide = new Splide("#gallery_slider", {
        perPage: 1,
        rewind: true
    }).mount();
	
    $(window).scroll(function() {
      scrollEvent();
    });

    let storyTypingSectionInterval = setInterval(function(){
        if ($("#invitation > .container").is(':visible')) {
            clearInterval(storyTypingSectionInterval);
            typing.process();
        }
    }, 100);
});

let scrollEvent = function() {
    let scroll = window.innerHeight + window.scrollY;
    let sections = $("section");
    $.each(sections, function(index, item) {
        if (item.offsetTop < scroll) {
            $(this).removeClass("animatable");
            $(this).addClass("animated");
        }
    });
}

let toggleAudioOnOff = function() {
    if (isAudioOn === true) {
        isAudioOn = false;
    } else {
        isAudioOn = true;
    }
    playAudio();
}

let playAudio = function() {
    if (isAudioOn === false) {
        $("#audio").get(0).play();
    } else {
        $("#audio").get(0).pause();
    }
}

let typing = {
    init: function() {
        isStoryTyping = false;
        storyTypingIndex = 0;
        storyLiIndex = 0;
        storyLiLength = $(".introduction-typing-content > ul > li").length;
        storyTypingContent = "";
    }, process: function() {
        storyTypingContent = $(".introduction-typing-content > ul > li").eq(storyLiIndex).text();
        storyTypingContent = storyTypingContent.split("");
        if (!isStoryTyping) {
            isStoryTyping = true;
            storyTypingInterval = setInterval(typing.execute, 100);
        }
    }, execute: function() {
        $("#introduction-typing ul li").removeClass("on");
        $("#introduction-typing ul li").eq(storyLiIndex).addClass("on");

        if (storyTypingIndex < storyTypingContent.length) {
            $("#introduction-typing ul li").eq(storyLiIndex).append(storyTypingContent[storyTypingIndex]);
            storyTypingIndex++;
        } else {
            if (storyLiIndex < storyLiLength - 1) {
                storyLiIndex++;
                storyTypingIndex = 0;
                isStoryTyping = false;
                storyTypingContent = $(".introduction-typing-content > ul > li").eq(storyLiIndex).text();

                clearInterval(storyTypingInterval);

                setTimeout(function() {
                    storyTypingInterval = setInterval(typing.execute, 100);
                }, 1000);

            } else if (storyLiIndex === storyLiLength - 1) {
                clearInterval(storyTypingInterval);
                $("#introduction-typing ul li.on").css("animation-iteration-count", 1);
                typing.init();
            }
        }
    }
}

let copyText = function(copyType, text) {
    $("#page-top").append("<textarea></textarea>");
    $("textarea").val(text);
    $("textarea").select();
    let copy = document.execCommand("copy");
    $("textarea").remove();
    if (copy) {
        let message;
        if (copyType === "link") {
            message = "링크";
        } else {
            message = "계좌번호";
        }
        alert(message + "가 복사되었습니다.");
    }
}

Kakao.init("30610da2fefb37cff8cefcc18cdf014e");

let shareKakaoMessage = function() {
    Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
            title: "대훈 ❤️ 윤정 결혼합니다",
            imageUrl: "https://bbabbol.github.io/wedding-invitation/assets/img/main.jpg",
            link: {
                mobileWebUrl: "https://bbabbol.github.io/wedding-invitation/index.html",
                webUrl: "https://bbabbol.github.io/wedding-invitation/index.html"
            }
        }
    });
}

let calculatorWeddingDay = function() {
    const today = new Date();
    const weddingDay = new Date("2025-06-21").setHours(0, 0, 0, 0);
    const remainDay = weddingDay - today;
    const day = Math.ceil(remainDay / (1000 * 60 * 60 * 24));

    let ddayText = "<span class=\"name\">대훈</span> <span>❤️</span> <span class=\"name\">윤정</span>의 결혼식";
    if (day > 0) {
        ddayText = ddayText + "이 <span style=\"color:red\"><strong>" + day + "</strong></span>일 남았습니다.";
    } else if (day == 0) {
        ddayText = "<span style=\"color:red\">오늘</span>은 <strong>" + ddayText + "</strong>입니다.";
    } else {
        ddayText = "<span>축하해주셔서 감사합니다.<br/>행복하게 살겠습니다.</span>";
    }

    $(".ddayText").html(ddayText);
}

calculatorWeddingDay();
setInterval(calculatorWeddingDay, 1000);

let slideSetting = function(index) {
    let length = $(".gallery-item").length - 1;
    if (index > length) {
        slideIndex = 0;
    }
    if (index < 0) {
        slideIndex = length;
    }
    $("#currentNo").text(slideIndex);
}

let slideImage = function(index) {
    slideIndex += index;
    slideSetting(slideIndex);
    showImage(slideIndex);
}

let showImage = function(index) {
    let image = $(".gallery-item").children("img").eq(index).attr("src");
    $("#wedding-image").attr("src", image);
}

let callNavi = function(app, name, lat, lng) {
    if (app === "naver") {
        //location.href="http://app.map.naver.com/launchApp/?version=11&menu=navigation&elat="+lat+"&elng="+lng+"&etitle="+name;
        location.href="nmap://route/car?dlat=36.349255&dlng=127.438104&dname=%EC%94%A8%EC%97%98%EB%93%9C%ED%8F%AC%EB%A0%88&appname=bbabbol.github.io";
    } else if (app === "kakao") {
        location.href="https://map.kakao.com/link/to/"+name+","+lat+","+lng;
    } else {
        location.href="https://apis.openapi.sk.com/tmap/app/routes?appKey=nLOyXb9H9m4g8yT8eaJYc2LggygCyqQp6TI2nr89&name="+name+"&lon="+lng+"&lat="+lat;
    }
}

let contact = function(target, method) {
    if (target === "groomFather") {
        location.href=method + ":01000000000";
    } else if (target === "groomMother") {
        location.href=method + ":01000000000";
    } else if (target === "brideFather") {
        location.href=method + ":01000000000";
    } else if (target === "brideMother") {
        location.href=method + ":01000000000";
    } else if (target === "groom") {
        location.href=method + ":01000000000";
    } else if (target === "wedding") {
        location.href=method + ":0426206524";
    }
    else {
       location.href=method + ":01000000000";
    }

}