var img = {

    imageNum: 5  ,
    imageNumWidth:196,
    num:0,
    count:document.getElementById("imagebg").getElementsByTagName("li").length,

    current:document.getElementById("current"),
    imagebg:document.getElementById("imagebg"),
    imagebg_li:document.getElementById("imagebg").getElementsByTagName("li"),
    small_pic:document.getElementById("small_pic"),

    imageShow:document.getElementById("imageShow"),
    scrollbg:document.getElementById("scrollbg"),

    left_img_btn:document.getElementById("left_img_btn"),
    right_img_btn:document.getElementById("right_img_btn"),

    small_pic_html:[],

    animate:null,
    autoplay:null,

    init:function(){
        img.imagebg.innerHTML = img.imagebg.innerHTML+img.imagebg.innerHTML+img.imagebg.innerHTML;
        for(var i=0;i<img.imagebg_li.length;i++){
            //console.log(img.imagebg_li[i]+" is OK")
            if(i!=0){
                img.small_pic_html.push("<li onclick='img.play("+i+")'><img src='"+img.imagebg_li[i].getAttribute("data-sPic")+"' /></li>");
                img.imagebg.getElementsByTagName("li")[i].style.display ="none";
            }else{
                img.small_pic_html.push("<li onclick='img.play("+i+")' class='currently'><img src='"+img.imagebg_li[i].getAttribute("data-sPic")+"' /></li>");
            }
            //console.log(img.small_pic_html);
        }
        //console.log(img.small_pic_html)

        img.small_pic.innerHTML = img.small_pic_html.join("");
        img.current.style.left = "78px";
        img.small_pic.style.left = "0px";
        img.imagebg_li[0].style.filter = "alpha(opacity=100)";
        img.imagebg_li[0].style.opacity = 1;

        img.left_img_btn.onclick = function(){img.play(img.num-1);}
        img.right_img_btn.onclick = function(){img.play(img.num+1)};

        img.autoplay= setInterval(function(){img.play(img.num+1)},5000);

        img.imageShow.onmouseover = function(){clearInterval(img.autoplay);}
        img.imageShow.onmouseout = function(){img.autoplay= setInterval(function(){img.play(img.num+1)},5000); }

    },

    play:function(i){
        var small_pic_left = parseInt(img.small_pic.style.left);
        var current_left = parseInt(img.current.style.left);
        var op = 0;

        if(i == img.num|| img.animate!=null || i>img.count*3 || i<-1){return;}



        for(var x=0;x<img.imagebg_li.length;x++){

            img.small_pic.getElementsByTagName("li")[x].className = "";
            img.imagebg_li[x].style.filter = "alpha(opacity="+op*10+")";
            img.imagebg_li[x].style.opacity = op/10;
            img.imagebg_li[x].style.display = "none";
        }


        if(i>(img.count*3-1)){
            i-=img.count;
            img.num -=img.count;

            img.small_pic.style.left = small_pic_left + img.imageNumWidth*(i-img.count) +"px" ;
            img.small_pic.getElementsByTagName("li")[i].className="currently";

            small_pic_left = parseInt(img.small_pic.style.left);
            current_left = parseInt(img.current.style.left);

        }else if(i<0){
            i+=img.count;
            img.num +=img.count;

            img.small_pic.style.left = small_pic_left - img.imageNumWidth*img.count +"px" ;
            img.small_pic.getElementsByTagName("li")[i].className="currently";

            small_pic_left = parseInt(img.small_pic.style.left);
            current_left = parseInt(img.current.style.left);
        }

        if(i>img.num){
            //濡傛灉姣斿綋鍓嶅ぇ;
            img.imagebg_li[i].style.display = "block";
            if(parseInt(img.current.style.left)>700){
                //濡傛灉娲诲姩妗嗗埌浜嗘渶鍙宠竟--瀹屾垚
                //灏忓浘鐗囧悜宸�
                img.animate = setInterval(function(){
                    if(parseInt(img.small_pic.style.left)>(small_pic_left- img.imageNumWidth*(i-img.num)+img.imageNumWidth*(i-img.num)/10)){
                        img.small_pic.style.left = parseInt(img.small_pic.style.left) - img.imageNumWidth*(i-img.num)/10 +"px" ;
                        img.imagebg_li[i].style.filter = "alpha(opacity="+(++op)*11+")";
                        img.imagebg_li[i].style.opacity = op/9;
                    }else{
                        img.small_pic.style.left = small_pic_left - img.imageNumWidth*(i-img.num) +"px" ;
                        img.small_pic.getElementsByTagName("li")[i].className="currently";
                        clearInterval(img.animate);
                        img.num = i;
                        img.animate = null;
                    }
                },30);
            }else{
                //娲诲姩妗嗗悜鍙�--瀹屾垚
                img.animate = setInterval(function(){
                    if(parseInt(img.current.style.left)<(current_left + img.imageNumWidth*(i-img.num)-img.imageNumWidth*(i-img.num)/10)){
                        img.current.style.left = parseInt(img.current.style.left) + img.imageNumWidth*(i-img.num)/10 +"px" ;
                        //涓轰簡IE鑱旂洘

                        img.imagebg_li[i].style.filter = "alpha(opacity="+(++op)*11+")"; //"alpha(opacity=100)";

                        //涓轰簡鐏嫄閮ㄨ惤
                        img.imagebg_li[i].style.opacity = op/9;
                    }else{
                        img.current.style.left = current_left + img.imageNumWidth*(i-img.num) +"px" ;
                        img.small_pic.getElementsByTagName("li")[i].className="currently";
                        clearInterval(img.animate);
                        img.num = i;
                        img.animate = null;
                    }
                },30);
            }

        }else if(i<img.num){
            img.imagebg_li[i].style.display = "block";
            //濡傛灉姣斿綋鍓嶅皬;
            if(parseInt(img.current.style.left)<100){
                //濡傛灉娲诲姩妗嗗埌浜嗘渶宸﹁竟
                //灏忓浘鐗囧悜鍙�
                img.animate = setInterval(function(){
                    //console.log(small_pic_left+"+"+ img.imageNumWidth*(img.num-i))
                    if(parseInt(img.small_pic.style.left)<(small_pic_left- img.imageNumWidth*(i-img.num)+img.imageNumWidth*(i-img.num)/10)){
                        img.small_pic.style.left = parseInt(img.small_pic.style.left) - img.imageNumWidth*(i-img.num)/10 +"px" ;
                        img.imagebg_li[i].style.filter = "alpha(opacity="+(++op)*11+")";
                        img.imagebg_li[i].style.opacity = op/9;
                    }else{
                        img.small_pic.style.left = small_pic_left - img.imageNumWidth*(i-img.num) +"px" ;
                        img.small_pic.getElementsByTagName("li")[i].className="currently";
                        clearInterval(img.animate);
                        img.num = i;
                        img.animate = null;
                    }
                },30);
            }else{
                //娲诲姩妗嗗悜宸�
                img.animate = setInterval(function(){
                    if(parseInt(img.current.style.left)>(current_left - img.imageNumWidth*(img.num-i)+img.imageNumWidth*(img.num-i)/10)){
                        img.current.style.left = parseInt(img.current.style.left) - img.imageNumWidth*(img.num-i)/10 +"px" ;
                        img.imagebg_li[i].style.filter = "alpha(opacity="+(++op)*11+")";
                        img.imagebg_li[i].style.opacity = op/9;
                    }else{
                        img.current.style.left = current_left - img.imageNumWidth*(img.num-i) +"px" ;
                        img.small_pic.getElementsByTagName("li")[i].className="currently";
                        clearInterval(img.animate);
                        img.num = i;
                        img.animate = null;
                    }
                },30);
            }
        }
    }


}

img.init();

img.play(0);

//阻止事件冒泡

function estop(e) {

    var e = arguments.callee.caller.arguments[0] || event;

    if (e && e.stopPropagation) {

        //因此它支持W3C的stopPropagation()方法

        e.stopPropagation();

    } else {

        //否则，我们需要使用IE的方式来取消事件冒泡

        window.event.cancelBubble = true;

        return false;

    }

}
$('.bcc-case-title li').mouseover(function () {

    $(this).addClass('case-active').siblings().removeClass('case-active');

    $('.bcc-case-count>div').eq($(this).index()).show().siblings().hide();

});
jQuery(".spzjtd").slide({
    mainCell: " .mymy",
    effect: "leftMarquee",
    autoPlay: true,
    delayTime: 6,
    vis: 5,
    trigger: "click",
    interTime: 50
});