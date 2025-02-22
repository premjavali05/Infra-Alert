document.addEventListener('DOMContentLoaded', () => {
    const stateSelect = document.getElementById('state');
    const departmentSelect = document.getElementById('department');

    // Fetch the category from the data attribute in the 'state' select element
    const selectedCategory = stateSelect.getAttribute('data-category');

    const departments = {
        home_electricity: {
            'AP': ['Andhra Pradesh Eastern Power Distribution Company Limited (APEPDCL)',
                'Andhra Pradesh Southern Power Distribution Company Limited (APSPDCL)'],
            'AR': ['Department of Power'],
            'AS': ['Assam Power Distribution Company Limited (APDCL)'],
            'BR': ['North Bihar Power Distribution Company Limited (NBPDCL)',
                'South Bihar Power Distribution Company Limited (SBPDCL)'],
            'CT': ['Chhattisgarh State Power Distribution Company Limited (CSPDCL)'],
            'GA': ['Dakshin Gujarat Vij Company Limited (DGVCL)',
                'Madhya Gujarat Vij Company Limited (MGVCL)',
                'Paschim Gujarat Vij Company Limited (PGVCL)',
                'Uttar Gujarat Vij Company Limited (UGVCL)'
            ],
            'HR': ['Uttar Haryana Bijli Vitran Nigam Limited (UHBVN)',
                'Dakshin Haryana Bijli Vitran Nigam Limited (DHBVN)'
            ],
            'HP': ['Himachal Pradesh State Electricity Board Limited (HPSEB)'],
            'JK': ['Jammu Power Distribution Corporation Limited (JPDCL)',
                'Kashmir Power Distribution Corporation Limited (KPDCL)'
            ],
            'GA': ['Goa Electricity Department (GED)'],
            'KA': ['Bangalore Electricity Supply Company Limited (BESCOM)',
                'Mangalore Electricity Supply Company Limited (MESCOM)',
                'Hubli Electricity Supply Company Limited (HESCOM)',
                'Gulbarga Electricity Supply Company Limited (GESCOM)',
                'Chamundeshwari Electricity Supply Corporation Limited (CESC)'
            ],
            'KL': ['Kerala State Electricity Board (KSEB)'],
            'MP': ['Madhya Pradesh Paschim Kshetra Vidyut Vitran Company Limited (MPPKVVCL)',
                'Madhya Pradesh Madhya Kshetra Vidyut Vitran Company Limited (MPMKVVCL)',
                'Madhya Pradesh Poorv Kshetra Vidyut Vitran Company Limited (MPPoKVVCL)'
            ],
            'MH': ['Maharashtra State Electricity Distribution Company Limited (MSEDCL or Mahavitaran)',
                'Tata Power',
                'Adani Electricity Mumbai Limited (AEML)',
                'BEST Undertaking (in Mumbai)'
            ],
            'MN': ['Manipur State Power Distribution Company Limited (MSPDCL)'],
            'ML': ['Meghalaya Power Distribution Corporation Limited (MePDCL)'],
            'MZ': ['Power and Electricity Department, Government of Mizoram'],
            'NL': ['Department of Power, Nagaland'],
            'OD': ['Tata Power Central Odisha Distribution Limited (TPCODL)',
                'Tata Power Western Odisha Distribution Limited (TPWODL)',
                'Tata Power Southern Odisha Distribution Limited (TPSODL)',
                'Tata Power Northern Odisha Distribution Limited (TPNODL)'
            ],
            'PB': ['Punjab State Power Corporation Limited (PSPCL)'],
            'PY': ['Electricity Department, Government of Puducherry'],
            'RJ': ['Jaipur Vidyut Vitran Nigam Limited (JVVNL)',
                'Ajmer Vidyut Vitran Nigam Limited (AVVNL)',
                'Jodhpur Vidyut Vitran Nigam Limited (JdVVNL)'
            ],
            'SK': ['Power Department, Government of Sikkim'],
            'TN': ['Tamil Nadu Generation and Distribution Corporation Limited (TANGEDCO)'],
            'TG': ['Telangana State Southern Power Distribution Company Limited (TSSPDCL)',
                'Telangana State Northern Power Distribution Company Limited (TSNPDCL)'
            ],
            'TR': ['Tripura State Electricity Corporation Limited (TSECL)'],
            'UT': ['Uttarakhand Power Corporation Limited (UPCL)'],
            'UP': ['Purvanchal Vidyut Vitran Nigam Limited (PVVNL)',
                'Dakshinanchal Vidyut Vitran Nigam Limited (DVVNL)',
                'Madhyanchal Vidyut Vitran Nigam Limited (MVVNL)',
                'Paschimanchal Vidyut Vitran Nigam Limited (PuVVNL)'
            ],
            'WB': ['West Bengal State Electricity Distribution Company Limited (WBSEDCL)',
                'Calcutta Electric Supply Corporation (CESC, Kolkata)'
            ],
            'AN': ['Electricity Department, Andaman and Nicobar Islands'],
            'CH': ['Chandigarh Electricity Department'],
            'DN': ['DNHPDCL (Dadra and Nagar Haveli Power Distribution Corporation Limited)'],
            'DD': ['DNHPDCL (Dadra and Nagar Haveli Power Distribution Corporation Limited)'],
            'DL': ['BSES Rajdhani Power Limited (BRPL)',
                'BSES Yamuna Power Limited (BYPL)',
                'Tata Power Delhi Distribution Limited (TPDDL)'
            ],
            'LD': ['Lakshadweep Electricity Department'],
            'PY': ['Electricity Department, Government of Puducherry']
            // Add other states and their respective departments if needed
        },
        street_lights: {
            'AP': ['Street Lights Department AP'],
            'KA': ['Street Lights Department KA'],
            // Add other states for street lights
        },
        potholes: {
            'AP': ['Potholes Department AP'],
            'KA': ['Potholes Department KA'],
            // Add other states for potholes
        },
        garbage: {
            'AP': ['Garbage Department AP'],
            'KA': ['Garbage Department KA'],
            // Add other states for garbage
        }
    };

    stateSelect.addEventListener('change', () => {
        const selectedState = stateSelect.value;
        departmentSelect.innerHTML = '<option value="">Select Department</option>'; // Reset the department dropdown

        if (departments[selectedCategory] && departments[selectedCategory][selectedState]) {
            departments[selectedCategory][selectedState].forEach(department => {
                const option = document.createElement('option');
                option.value = department;
                option.textContent = department;
                departmentSelect.appendChild(option);
            });
        }
    });

    // stateSelect.addEventListener('change', () => {
    //     const selectedState = stateSelect.value;
    //     departmentSelect.innerHTML = '<option value="">Select Department</option>'; // Reset the department dropdown
    //     if (departments[selected] && departments[selectedCategory][selectedState]) {
    //         departments[selectedState].forEach(department => {
    //             const option = document.createElement('option');
    //             option.value = department;
    //             option.textContent = department;
    //             departmentSelect.appendChild(option);
    //         });
    //     }
    // });
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Here you can send the latitude and longitude to your PHP script
            console.log("Latitude: " + latitude + ", Longitude: " + longitude);

            // You can send this data via AJAX or store it in a hidden input field
            document.getElementById('latitude').value = latitude;
            document.getElementById('longitude').value = longitude;

            // Optionally, send data to PHP (example using fetch)
            fetch('save_location.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude: latitude, longitude: longitude }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }, function () {
            alert("Geolocation service failed.");
        });
    } else {
        alert("Your browser doesn't support geolocation.");
    }
}