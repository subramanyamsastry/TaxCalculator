document.addEventListener('DOMContentLoaded', function() {
    const taxForm = document.getElementById('taxForm');
    const resultModal = document.getElementById('resultModal');
    const taxResult = document.getElementById('taxResult');
    const closeBtn = document.querySelector('.close');

    taxForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate inputs
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.style.visibility = 'hidden');

        let hasError = false;

        const income = parseFloat(taxForm.income.value);
        if (!income) {
            taxForm.income.nextElementSibling.style.visibility = 'visible';
            hasError = true;
        }

        const extraIncome = parseFloat(taxForm.extraIncome.value) || 0;
        const age = parseInt(taxForm.age.value);
        if (isNaN(age) || age <= 0) {
            taxForm.age.nextElementSibling.style.visibility = 'visible';
            hasError = true;
        }

        const deductions = parseFloat(taxForm.deductions.value) || 0;

        // Calculate tax if no errors
        if (!hasError) {
            let tax = 0;
            const taxableIncome = income + extraIncome - deductions;
            if (taxableIncome > 800000) {
                if (age < 40) {
                    tax = 0.3 * (taxableIncome - 800000);
                } else if (age >= 40 && age < 60) {
                    tax = 0.4 * (taxableIncome - 800000);
                } else {
                    tax = 0.1 * (taxableIncome - 800000);
                }
            }

            // Display result
            taxResult.textContent = `Your calculated tax is: ₹${tax.toFixed(2)}`;
            resultModal.style.display = 'block';
        }
    });

    closeBtn.addEventListener('click', function() {
        resultModal.style.display = 'none';
    });
});