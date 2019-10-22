
$("#a").hide().fadeIn(4000);

$("#ex").on("click",function(){
    $("#ex").prepend("<p>あいうえお</p>");
    $("#ex").css("color","white");
    $("#ex").css("backgroundColor","black");
    $("#ex").prepend("<p>かきくけこ</P>");
    $("#ex").append("<p>さしすせそ</P>");
    $("p:even").css("backgroundColor","white");
    $("p:even").css("color","black");
    // #ex p:nth-child(even)でうまくいく
})