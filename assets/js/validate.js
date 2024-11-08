(function () {
    "use strict";

    document.querySelectorAll('.xb-item--form').forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let phone = document.getElementById("phone").value.trim();
            let message = document.getElementById("message").value.trim();

            if (!name || !email || !phone || !message) {
                displayError(form, 'Please fill in all required fields.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                displayError(form, 'Please enter a valid email address.');
                return;
            }

            if (!/^\+?\d{7,15}$/.test(phone)) {
                displayError(form, 'Please enter a valid phone number.');
                return;
            }

            // Show loading message and hide error and success messages
            form.querySelector('.loading').classList.add('d-block');
            form.querySelector('.error-message').classList.remove('d-block');
            form.querySelector('.sent-message').classList.remove('d-block');

            // Send the email
            sendMail(form);
        });
    });

    function sendMail(form) {
        let params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value,
        };

        emailjs.send("service_975uom88", "template_wisufk1", params).then(
            function (response) {
                console.log("Email sent Successfully:", response);
                form.reset();
                
                // Hide loading and show sent message
                form.querySelector('.loading').classList.remove('d-block');
                const sentMessageElement = form.querySelector('.sent-message');
                sentMessageElement.classList.add('d-block');

                setTimeout(() => {
                    sentMessageElement.classList.remove('d-block');
                }, 5000);
            },
            function (error) {
                console.error("Email Sending failed:", error);
                displayError(form, "There was an error while sending your message. Please try again later.");
            }
        );
    }

    function displayError(form, error) {
        const errorMessageElement = form.querySelector('.error-message');
        form.querySelector('.loading').classList.remove('d-block');
        errorMessageElement.innerHTML = error;
        errorMessageElement.classList.add('d-block');

        setTimeout(() => {
            errorMessageElement.classList.remove('d-block');
        }, 5000);
    }

})();
