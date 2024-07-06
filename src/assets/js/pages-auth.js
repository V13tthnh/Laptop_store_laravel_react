/**
 *  Pages Authentication
 */

'use strict';
const formAuthentication = document.querySelector('#formAuthentication');

document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    // Form validation for Add new record
    if (formAuthentication) {
      const fv = FormValidation.formValidation(formAuthentication, {
        fields: {
        //   username: {
        //     validators: {
        //       notEmpty: {
        //         message: 'Vui lòng nhập tên người dùng'
        //       },
        //       stringLength: {
        //         min: 6,
        //         message: 'Username must be more than 6 characters'
        //       }
        //     }
        //   },
          email: {
            validators: {
              notEmpty: {
                message: 'Vui lòng nhập email'
              },
              emailAddress: {
                message: 'Vui lòng nhập địa chỉ email hợp lệ'
              }
            }
          },
          'email': {
            validators: {
              notEmpty: {
                message: 'Vui lòng nhập email'
              },
              stringLength: {
                min: 6,
                message: 'Tên người dùng ít nhất 6 ký tự'
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'Vui lòng nhập mật khẩu'
              },
              stringLength: {
                min: 6,
                message: 'Mật khẩu chứa ít nhất 6 ký tự'
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'Vui lòng nhập xác nhận mật khẩu'
              },
              identical: {
                compare: function () {
                  return formAuthentication.querySelector('[name="password"]').value;
                },
                message: 'Mật khẩu xác nhận không trùng khớp'
              },
              stringLength: {
                min: 6,
                message: 'Mật khẩu phải chứa ít nhất 6 ký tự'
              }
            }
          },
          terms: {
            validators: {
              notEmpty: {
                message: 'Please agree terms & conditions'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-3'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),

          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', function (e) {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });
    }

    //  Two Steps Verification
    const numeralMask = document.querySelectorAll('.numeral-mask');

    // Verification masking
    if (numeralMask.length) {
      numeralMask.forEach(e => {
        new Cleave(e, {
          numeral: true
        });
      });
    }
  })();
});
