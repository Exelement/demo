
  var MktoFormID = 1270,
    MktoFormBaidu = null,
    BaiduHooked = false,
    MktoFormValuesSet = false,
    MktoFormSumitted = false,
    FormValues = {
        "Email": "",
        "FirstName": "",
        "LastName": "",
        "Phone": "",
        "formMessage": "",
        "Company": "",
        "Country": "China",
        "formType": "Baidu Form",
        "formID": "",
        "recaptcha": ""
    },
    debugBaidu = true;


    var BaiduButtonTimeOut = setInterval(function() {

        if (document.getElementsByClassName('embed-messageboard-send-btn')[0]) {
            if (BaiduHooked === false) {
                document.getElementsByClassName('embed-messageboard-send-btn')[0].onclick = function(){
                    observeBaiduMutations();
                    clearInterval(BaiduButtonTimeOut);
                }
            } else {
                clearInterval(BaiduButtonTimeOut);
            }

        }

    }, 1000);


function setMktoFormValuesBaidu() {
    MktoFormValuesSet = true;

    if (document.getElementsByClassName('embed-messageboard-form-input')[0]) {
        var FullName = document.getElementsByClassName('embed-messageboard-form-input')[0].value;
        FullName = FullName.split(/ (.*)/);

        FormValues.FirstName = FullName[0] !== undefined ? FullName[0] : "FirstName";
        FormValues.LastName = FullName[1] !== undefined ? FullName[1] : "LastName";
    }

    if (document.getElementsByClassName('embed-messageboard-form-input')[3]) {
        FormValues.Email = document.getElementsByClassName('embed-messageboard-form-input')[3].value;
    }

    if (document.getElementsByClassName('embed-messageboard-form-input')[1]) {
        FormValues.Phone = document.getElementsByClassName('embed-messageboard-form-input')[1].value;
    }

    if (document.getElementsByClassName('embed-messageboard-form-content')[0].querySelector('textarea')) {
        FormValues.formMessage = document.getElementsByClassName('embed-messageboard-form-content')[0].querySelector('textarea').value;
    }

    if (document.getElementsByClassName('embed-messageboard-form-content')[0].querySelector('textarea')) {
        FormValues.Company = document.getElementsByClassName('embed-messageboard-form-input')[2].value;
    }

    //FormValues.formID = MktoFormBaidu.getId();

    //MktoFormBaidu.addHiddenFields(FormValues);
}

function observeBaiduMutations() {

    BaiduHooked = true;
    setMktoFormValuesBaidu();

    var observer = new MutationObserver(function(mutationsList) {

        if (MktoFormSumitted !== true) {

            MktoFormSumitted = true;

            fetch("https://synccloud.exelement.io/api/webhook/4YPthm86", {
              method: "POST",
              body: JSON.stringify(FormValues),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            });

            if (debugBaidu) {
                console.log("Submitted to SyncCloud:");
                console.log(FormValues);
            }
        }

    });

    // Observe mutations on when the Baidu form success message shows up
    observer.observe(document.getElementsByClassName('embed-messageboard-result')[0], { attributes: true });
}