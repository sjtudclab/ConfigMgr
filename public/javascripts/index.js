/**
 * Created by Yongfeng on 15/8/23.
 */
(function() {
    var currentStep = 1;

    $("#btn-next").on("click",function() {
        switch(currentStep) {
            case 1: {
                var inputName = $("input[name='community-name']");
                var communityName = inputName.val();
                if(communityName.trim() === '') {
                    alert("请输入小区名");
                    inputName.parent().addClass("has-error");
                    return;
                }else {
                    var province = $("#province-selector").val();
                    var city = $("#city-selector").val();
                    var area = $("#area-selector").val();

                    $("#community-address").text(province + " " + city + " " + area + " " + communityName);
                }
                break;
            }
            case 2: break;
            default: break;
        }
        $("div[id=step-" + currentStep+ "]").addClass("hidden");
        currentStep++;
    })


})(jQuery);

