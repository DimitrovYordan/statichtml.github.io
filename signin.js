$(document).ready(function () {
    var $kbcBtnFake = $('#fake-kbc_employee_btn'),
        $kbcBtnReal = $('#PIC_B2B_IDP'),
        $usernameFake = $('#fake-username'),
        $usernameReal = $('#email'),
        $passwordFake = $('#fake-password'),
        $passwordReal = $('#password'),
        $submitBtnFake = $('#fake-submit-btn'),
        $errors = $('.error pageLevel'),
        $forgotPasswordFake = $('#fake-forgot-password'),
        $forgotPasswordReal = $('#forgotPassword'),
        $emailError = $('#email-error-message'),
        $passwordError = $('#password-error-message'),
        $hideEyeIcon = $('#hide-input-icon'),
        $showEyeIcon = $('#show-input-icon'),
        emailReg = new RegExp('^[A-Za-z\._0-9+_-]{2,}[@][A-Za-z]{2,}[\.][a-z]{2,4}$'),
        errorMessages = [
            {
                realMsg: 'We can\'t seem to find your account',
                fakeMsg: 'Невалидни данни за вход',
            }
        ];

    if ($kbcBtnReal.length) {
        $kbcBtnFake.on('click', function () {
            $kbcBtnReal.click();
        });
    }

    $(window).on('keypress', function (ev) {
        if (ev.keyCode === 13 || ev.keyCode === 10) {
            console.log('Enter key button');
            findErrors();
            submitForm();
        }
    });

    $submitBtnFake.on('click', function () {
        console.log('Submit button');
        findErrors();
        submitForm();
    });

    $forgotPasswordFake.on('click', function () {
        $forgotPasswordReal[0].click();
    });

    $usernameFake.on('change', function () {
        var enterVal = $usernameFake.val();
        if (enterVal === '') {
            $emailError.text('Попълнете полето, за да продължите');
        } else if (!emailReg.test(enterVal)) {
            $emailError.text('Имейлът за вход не е валиден');
        } else {
            $emailError.text('');
        }
    });

    $passwordFake.on('keyup', function () {
        var enterVal = $passwordFake.val();
        if (enterVal === '') {
            $passwordError.text('Попълнете полето, за да продължите');
            $passwordFake.attr("type", "password");
            $hideEyeIcon.css('display', 'none');
            $showEyeIcon.css('display', 'none');
        } else {
            $hideEyeIcon.css('display', 'block');
            $passwordError.text('');
        }
    });

    $hideEyeIcon.on("click", function () {
        $passwordFake.attr("type", "text");
        $hideEyeIcon.css('display', 'none');
        $showEyeIcon.css('display', 'block');
    });

    $showEyeIcon.on("click", function () {
        $passwordFake.attr("type", "password");
        $hideEyeIcon.css('display', 'block');
        $showEyeIcon.css('display', 'none');
    });

    function submitForm() {
        $("input").removeAttr("pattern");

        var unFake = $usernameFake.val();
        var pwdFake = $passwordFake.val();

        $usernameReal.val(unFake);
        $passwordReal.val(pwdFake);

        $('#next').click();
    }

    function findErrors() {
        $errors.each(function (ind, el) {
            $(el).on('DOMSubtreeModified', function (pind, pel) {
                console.log(pind);
                console.log(pel);
                var text = $(pel).text();
                console.log(text);
            });
        });
    }

});
