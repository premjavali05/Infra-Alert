const x = document.getElementById("demo");
        //const key = "AIzaSyDqwdA2Ph86RKCcu9DE_O_bIsDQTjwnmpk";

        //GeoLocation Scripts
        // function getLocation() {
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(success);
        //     }
        //     else {
        //         console.log("Does not support GeoLocation API");
        //     }
        // }

        // function success(position) {
        // console.log(position);

        // const lat = position.coords.latitude;
        // const lng = position.coords.longitude;

        // const key = "AlzaSyPnCsyr3g3p7rnPaepwzRwpPtyXjApp9oq";
        // let url = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => { 
        //             console.log(data)
        //             console.log(data.results[0].formatted_address)
        //     })

        // console.log(lat, lng);
        // }   

        function getLocation() {
            if (navigator.geolocation) {
                // Add options for more accurate location
                const options = {
                    enableHighAccuracy: true, // Request most accurate location
                    timeout: 10000,           // 10 seconds timeout
                    maximumAge: 0             // Always get fresh location
                };
                
                navigator.geolocation.getCurrentPosition(
                    success,   // Success callback
                    errorHandler,  // Error callback
                    options    // Options for more reliable geolocation
                );
            } else {
                console.log("Geolocation is not supported by this browser.");
                alert("Geolocation is not supported. Please enable location services.");
            }
        }
        
        function errorHandler(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("Please grant location permissions to upload the image.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("Location request timed out. Please try again.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred with location services.");
                    break;
            }
        }

        function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    console.log(lat)

    const key = "AlzaSySEYrKmSL4sugIJ2Ojgz7_4gToWlURmtJf";
    let url = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => { 
            const formattedAddress = data.results[0].formatted_address;
            console.log(formattedAddress);

            // Create a FormData object to send the address, latitude, and longitude
            const form = [];
            const formData = {};
            formData.address = formattedAddress;
            formData.latitude = lat;
            formData.longitude = lng;
            
            
            // Include the name and category from the form
            const name = document.getElementById('name').value;
            const category = document.getElementById('category').value;
            
            formData.name = name;
            formData.category = category;

            form.push(formData);

            console.log(form)

            console.log(formData);

            //Original Code
            $.ajax({
                url:`./save_location.php?name=${name}&category=${category}`,
                method: "post",
                data: { formData: JSON.stringify(form)
                },
                success: function(response) {
                    console.log(response);
                }
            })

            // Log formData for debugging

            
            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value);
            //     if (key = 'address' ) {
            //         let address = value
            //         console.log(address)
            //     }
            // }

            

            // // Send the data to the PHP script
            // fetch(`complaint_form.php?name=${name}&category=${category}`, {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => {
            //     console.log('Response status:', response.status);
            //     return response.text();
            // })
            // .then(result => {
            //     console.log('Data saved:', result);
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
        });
}

