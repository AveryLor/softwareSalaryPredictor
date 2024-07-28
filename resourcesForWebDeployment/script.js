document.addEventListener("DOMContentLoaded", function() {
    const pageSelector = document.getElementById("pageSelector");
    const predictPage = document.getElementById("predictPage");
    const explorePage = document.getElementById("explorePage");
    const pages = { "predict": predictPage, "explore": explorePage };

    pageSelector.addEventListener("change", (e) => {
        Object.values(pages).forEach(page => page.classList.remove("active"));
        pages[e.target.value].classList.add("active");
    });

    pageSelector.value = "predict";
    pages["predict"].classList.add("active");

    // Load and process data
    async function loadData() {
        const response = await fetch("path/to/your/survey_results_public.csv");
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;

        // Process data similar to your Python functions
        // ...

        return processedData;
    }

    function renderCountryChart(data) {
        const ctx = document.getElementById('countryChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function renderMeanSalaryCountryChart(data) {
        const ctx = document.getElementById('meanSalaryCountryChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: '#36A2EB'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function renderMeanSalaryExperienceChart(data) {
        const ctx = document.getElementById('meanSalaryExperienceChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: '#FF6384',
                    borderColor: '#FF6384',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Prediction logic
    document.getElementById("calculateSalary").addEventListener("click", function() {
        const country = document.getElementById("country").value;
        const education = document.getElementById("education").value;
        const experience = document.getElementById("experience").value;

        const transformedCountry = le_country[country];
        const transformedEducation = le_education[education];

        const X = [transformedCountry, transformedEducation, parseFloat(experience)];

        const salary = regressor.predict(X);

        document.getElementById("salaryResult").textContent = `The estimated salary is $${salary.toFixed(2)}`;
    });

    // Load the data and initialize charts
    loadData().then(data => {
        renderCountryChart(data.countryData);
        renderMeanSalaryCountryChart(data.meanSalaryCountryData);
        renderMeanSalaryExperienceChart(data.meanSalaryExperienceData);
    });
});
